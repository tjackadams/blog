---
title: Configure NativeBlobSoftDeleteDeletionDetectionPolicy through
  Azure.Search.Documents .NET Client SDK
description: Configure NativeBlobSoftDeleteDeletionDetectionPolicy through
  Azure.Search.Documents .NET Client SDK. This applies to Azure Blob Storage
  data sources within the Azure Search Service.
date: 2022-04-07T12:11:04.671Z
cover:
  src: cognitive-services.svg
  alt: Azure Cognitive Services
  title: Azure Cognitive Services
tags:
  - csharp
---
There are certain [conditions](https://docs.microsoft.com/en-us/azure/search/search-howto-reindex#rebuild-conditions) that will require a drop and rebuild of the index. I have recently been investigating ways that this could be achieved as part of the deployment pipeline.

My initial approach was to tackle this via the azure cli as there are no bicep templates available (yet?). This worked ok for the initial approach as I just dropped and created an index with the same name. This doesn't really work too well when pushing to a production environment as there will be some downtime on the index.

Microsoft have recently introduced the concept of an [index alias](https://docs.microsoft.com/en-us/azure/search/search-how-to-alias?tabs=rest). I like to think of this like a proxy meaning that you point your client search service at the index alias and it will proxy it to the underlying index. This allows you to create a new index in the background and once its ready you can update the index alias to use the new index with no downtime.

This could have been achieved using the azure cli, however I am much more comfortable writing in C#. I decided to write a deployment tool as a C# console application.

