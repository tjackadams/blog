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
  - csharp
  - aspnetcore
---

Ah, the good old problem in production that no one saw coming. It was a warm summers day, on hump day I recall and we had reports that users sessions were not expiring as they should.\
This particular website has been built using ASP.NET Core 3.1 👌 running on IIS 🤮 and has a short idle session limit set to 20 minutes.

## Let the investigation begin! 🙌

My first port of call as always was to check the configuration of the session is correct. You can find this is the `Startup.cs` file.

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

The `IdleTimeout` is set to 20 minutes as expected. The other settings are there to please [Chrome against insecure cookies](https://www.chromestatus.com/feature/5633521622188032).

The log files didn't provide anything useful in regards to this, so why are sessions not expiring when they should?

## Taking a deeper look

The `IdleTimeout` for the session is a sliding timeout which means that each time the session is accessed, the timeout is reset. In order for the session to not expire after 20 minutes, something must be making a request to the application within those 20 minutes, right? So, we did a little experiment. I made a request to the application which initiate's a session. I then waited longer than 20 minutes to see if the session expired. Guess what! It did not expire 😥

This is both good and bad. **Good** that we can reproduce the issue, **bad** that its not working as intended, _although some people could view it different_ 👀

We needed some way to track the requests coming into the application to see what what keeping the session alive. Luckily, Serilog has some middleware that can provide [request logging](https://github.com/serilog/serilog-aspnetcore) for us. I won't go into too much detail on how to setup or configure this, but it basically boils down to this in your `Startup.cs` (assuming you are using Serilog...).

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    app.UseSerilogRequestLogging();

    // Other app configuration
}
```

Now let us see what is keeping the session alive!

## The problem and/or solution

As it turns out, we had recently added a web chat feature to this project. The web chat queried a controller endpoint every 30 seconds or so to see how many support agents were available to help end users. This call kept the session alive for all of time...but how can we fix it?

Yes, the title of this post finally comes into play, **Conditional Middleware.** I'm not sure if that's the official name, but I'm sticking with it.

What we can do is load certain middleware for certain routes in our application. Our goal was to load the Session middleware for all routes as the default behaviour. Yet the route that performs the check for available agents, this would not load the session middleware.

Here is what the final code looked like in our `Startup.cs`.

```csharp
app.UseWhen(
   ctx => ctx.Request.Path.Value != "/webchat/agent/available",
   ab => ab.UseSession()
);
```

As you can see, we are instructing the application:

> **if the requested route matches "/webchat/agent/available" then skip loading the session middleware.**

There are other methods available too and these are on the [official middleware documentation](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-3.1#branch-the-middleware-pipeline). The result was the check for available agents was no longer keeping the session alive.

## Conclusion

I'm certain this is a very powerful API and it wasn't used in the best sense here, but it worked for us. If you liked this post, feel free to leave a comment or share it.

Hoped you enjoyed the emojis and Happy Coding!
