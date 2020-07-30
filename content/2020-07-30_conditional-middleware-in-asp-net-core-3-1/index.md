---
title: Conditional Middleware in ASP.NET Core 3.1
description: This post looks at how to configure ASP.NET Core middleware in a
  way that allows you to have different middleware applied to different routes.
date: 2020-07-30T18:27:26.843Z
cover:
  src: request-delegate-pipeline.png
  alt: ASP.NET Core Middleware Pipeline
  title: ASP.NET Core Middleware Pipeline
tags:
  - code
  - csharp
---
Ah, the good old problem in production that no one saw coming. It was a warm summers day I think, possibly on hump day and we had reports that users sessions were not expiring as they should.\
The particular website was built on ASP.NET Core 3.1 👌 running on IIS  🤮 and had a relatively short idle session limit set to 20 minutes.

## Let the investigation begin! 🙌

First port of call as always was to check the session was configured correctly. You can find this is the \`Startup.cs\` file.

```csharp
services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(20);
    options.Cookie.IsEssential = true;
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});
```

As you can see the `IdleTimeout` is correctly set to 20 minutes and the rest of the settings are purely to satisfy [Chrome against insecure cookies](https://www.chromestatus.com/feature/5633521622188032).

The log files didn't really provide anything useful in regards to this, so why are sessions not expiring when they should?

## Taking a deeper look

The \`IdleTimeout\` for the session is a sliding timeout. So in order for the session to not expire after 20 minutes, something must be hitting the application with those 20 minutes, right? So, we did a little experiment. Make a request to the application to initiate a session, wait longer than 20 minutes and see if the session expired. It did not 😥

This is both good and bad. Good that we can reproduce the issue, bad that its not working as intended, *although some people could view it differently* 👀

We needed some way to track the requests coming into the application to see what what keeping the session alive. Luckily, Serilog has some middleware that can provide [request logging](https://github.com/serilog/serilog-aspnetcore) for us. I won't go into too much detail  on how to setup or configure this, but it basically boils down to this in you \`Startup.cs\`.

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    app.UseSerilogRequestLogging();

    // Other app configuration
}
```