---
title: Deploy Azure Table Data From Bicep Deployment Script
description: description
date: 2022-03-29T17:11:59.997Z
cover:
  src: azure-logo.png
  alt: Azure Logo
  title: Azure Logo
tags:
  - code
---
In this post we'll explore how we can seed data into Azure Table Storage using bicep deployment scripts.

How you might normally approach this problem space and how I implemented the first version is to first of all output the storage account information from the bicep template.
With this information, we can copy over a PowerShell script and csv file from the build pipeline to the deployment pipeline and execute the PowerShell script.





