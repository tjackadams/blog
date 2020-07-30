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