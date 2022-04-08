---
title: Configure NativeBlobSoftDeleteDeletionDetectionPolicy through
  Azure.Search.Documents .NET Client SDK
description: Configure NativeBlobSoftDeleteDeletionDetectionPolicy through
  Azure.Search.Documents .NET Client SDK. This applies to Azure Blob Storage
  data sources within the Azure Search Service.
date: 2022-04-07T12:11:04.671Z
cover:
  src: cognitive-services.jpg
  alt: Azure Cognitive Services
  title: Azure Cognitive Services
tags:
  - csharp
---
There are certain [conditions](https://docs.microsoft.com/en-us/azure/search/search-howto-reindex#rebuild-conditions) that will require a drop and rebuild of the index. I have recently been investigating ways that this could be achieved as part of the deployment pipeline.

My initial approach was to tackle this via the azure cli as there are no bicep templates available (yet?). This worked ok for the initial approach as I dropped and created another index with the same name. This doesn't really work too well when pushing to a production environment as there will be some downtime on the index and search service.

Microsoft have recently introduced the concept of an [index alias](https://docs.microsoft.com/en-us/azure/search/search-how-to-alias?tabs=rest). I like to think of this as a proxy. When you point the search service client towards the index alias, it will direct it to the underlying index. The index can be swapped out for another index without incurring any downtime.

This could have been achieved with PowerShell scripts calling the Azure REST API, however I am much more comfortable writing in C#. I decided to write a deployment tool as a C# console application.

During the development of this deployment tool, I noticed that an option was missing for the Azure Blob Storage data source `NativeBlobSoftDeleteDeletionDetectionPolicy`.

The option looks like this in the Azure portal under the data source options.

![Azure Search Blob Storage Data Source Track Deletion Options](azure_search_blob_storage_data_source_track_deletion_options.jpg "Azure Search Blob Storage Data Source Track Deletion Options")

I couldn't find this option available anywhere in [.NET SDK](https://github.com/Azure/azure-sdk-for-net). 

After a lot of researching and looking for answers, I came across this GitHub issue [\#11435](https://github.com/Azure/azure-sdk-for-net/issues/11435). My understanding is that they don't have the resources to put towards a product that is currently in preview. 

The option is available through the [Azure REST API](https://docs.microsoft.com/en-us/azure/search/search-howto-index-changed-deleted-blobs#how-to-configure-deletion-detection-using-native-soft-delete), so I decided that if I could alter the outgoing request made from the `SearchIndexerClient`, I can add the required property into the request body and replicate the Azure REST API.

Here is the final code.

```csharp
public class NativeBlobSoftDeleteDeletionDetectionPolicy : HttpPipelinePolicy
{
    public override void Process(HttpMessage message, ReadOnlyMemory<HttpPipelinePolicy> pipeline)
    {
        throw new NotImplementedException();
    }

    public override async ValueTask ProcessAsync(HttpMessage message, ReadOnlyMemory<HttpPipelinePolicy> pipeline)
    {
        if (message.Request.Method == RequestMethod.Put && message.Request.Uri.Path.Contains("datasources"))
        {
            if (message.Request.Content is not null)
            {
                using var ms = new MemoryStream();
                await message.Request.Content.WriteToAsync(ms, CancellationToken.None);
                var rawOriginalContent = Encoding.UTF8.GetString(ms.ToArray());
                var originalContent = JsonNode.Parse(rawOriginalContent);
                if (originalContent is not null)
                {
                    originalContent["dataDeletionDetectionPolicy"] = new JsonObject
                    {
                        ["@odata.type"] = "#Microsoft.Azure.Search.NativeBlobSoftDeleteDeletionDetectionPolicy"
                    };

                    message.Request.Content = RequestContent.Create(originalContent.ToJsonString());
                }
            }
        }

        await ProcessNextAsync(message, pipeline);
    }
}
```

First of all I write the request content to a memory stream. Then I parse the result of that into a [JsonNode](https://docs.microsoft.com/en-us/dotnet/api/system.text.json.nodes.jsonnode?view=net-6.0) object - this allows me to mutate the JSON document. I add the required Json property to the JSON document and write the content back to the request. 

I can register the `HttpPipelinePolicy` like this

```csharp
var options = new SearchClientOptions();
options.AddPolicy(new NativeBlobSoftDeleteDeletionDetectionPolicy(), HttpPipelinePosition.PerCall);
var searchIndexerClient = new SearchIndexerClient(new Uri(_settings.SearchEndpoint), new AzureKeyCredential(_settings.SearchKey), options);
```

It's not the prettiest of code samples and I'm not sure how I would feel about this in a production application, but I am only using this tool for deployments - it doesn't have to be perfect. 
If you have any improvements, feel free to leave a comment.

Happy Coding!
