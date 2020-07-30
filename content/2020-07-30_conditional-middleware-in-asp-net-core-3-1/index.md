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

First port of call as always was to check the session was configured correctly. You can find this is the `Startup.cs` file.

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

The `IdleTimeout` for the session is a sliding timeout, so in order for the session to not expire after 20 minutes, something must be hitting the application within those 20 minutes, right? So, we did a little experiment. Make a request to the application to initiate a session, wait longer than 20 minutes and see if the session expired. Guess what! It did not expire 😥

This is both good and bad. **Good** that we can reproduce the issue, **bad** that its not working as intended, *although some people could view it differently* 👀

We needed some way to track the requests coming into the application to see what what keeping the session alive. Luckily, Serilog has some middleware that can provide [request logging](https://github.com/serilog/serilog-aspnetcore) for us. I won't go into too much detail  on how to setup or configure this, but it basically boils down to this in your `Startup.cs` (assuming you are using Serilog...).

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    app.UseSerilogRequestLogging();

    // Other app configuration
}
```

Now let us see what is keeping the session alive!

## The problem and/or solution

As it turns out, we had recently added a web chat feature to this project. The web chat queried a controller endpoint every 30 seconds or so to see how many support agents were available to help end users. This call kept the session alive for the all of time...but how can we fix it?

Yes, the title of this post finally comes into play, **Conditional Middleware.** I'm not sure if that's the official name, but I'm sticking with it.

What we can do is load certain middleware for certain routes in our application and what we wanted to achieve was to load the Session middleware for every route, except the route that queries how many support agents there are available.

Here is what the final code looked like in our `Startup.cs`.

```csharp
app.UseWhen(
   ctx => ctx.Request.Path.Value != "/webchat/agent/available", 
   ab => ab.UseSession()
);
```

Here we are instructing the application, **if the requested route does not match "/webchat/agent/available" then load the session middleware.** There are other methods available to which can be found on the [official middleware documentation](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/?view=aspnetcore-3.1#branch-the-middleware-pipeline).

As the session was not loaded when checking for available support agents, the session was no longer being kept alive and normal behaviour was resumed.

## Conclusion

I feel like this could be a very powerful API and it probably wasn't used in the best sense in this example, but it worked for us. If you liked this post, feel free to leave a comment or share it.

Hoped you enjoyed the emojis and Happy Coding!