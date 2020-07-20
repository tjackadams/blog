---
title: Find all database objects that perform an insert on a given database table
date: 2020-07-20T13:21:48.017Z
cover:
  src: microsoft-sql-server-logo.png
  alt: Microsoft SQL Server Logo
  title: Microsoft SQL Server Logo
tags:
  - msssql
---


We currently have around 15 database stored in a single SQL instance and we started to notice some invalid data being entered into a single table. With this amount of database and objects within the database, I was tasked with finding out what objects are referencing this table so we can find out where this invalid data is coming from.

The databases are stored in source control under the .sqlproj project format. My first approach was to search the solution in Visual Studio using a regular expression and seeing what that returned. The regular expression is not elegant by a long shot \`INSERT([^@#]*)SiteClientMailing($|[^a-z])\` but it did provide a rough idea of what we are dealing with. I soon realised that I couldn't use this method because:

* There are a huge amount of database objects that are not under source control. This is from years of creating manual stored procedures and not clearing them up!
* There are many different ways you can reference a table, especially cross database queries.

My second approach was to create a trigger on the table and insert the name of the calling database object into an audit table. This initially showed some promise, but there were a few problems with this method:

* The table in question was in the **hot-path** for multiple applications, so leaving the trigger enabled for long periods of time caused quite a few performance issues in testing.
* We were relying on the database object to actually be triggered. Some stored procedures that are in the database are only called once a month or so. With the above performance problems, we just couldn't leave the trigger enabled for that period of time.

That is when I needed a better solution with the following requirements:

* Should not cause any performance issues.
* Should be able to query information across databases.
* Should be able to query a specific table.
* Easily identify the source database object.
* Ideally should be able to run the query on demand.
* A nice to have would be to include some additional stats, for instance the last run time.

With the requirements in place, I went to search the internet if anyone had solved a similar problem. There was a huge amount of similar questions on Stack Overflow, but most of the scripts I found referenced old system database objects with are depreciated with Microsoft SQL Server 2017, until I came across [this](https://zakird.com/mssql/2011/06/07/finding-cross-database-dependencies) blog post from 2011. This script loops through all database and finds all references using \`sys.sql_expression_dependencies\`.

Here is the script I eventually ended up with.\
\

<!-- insert gist here -->

Lets go through it and see what's happening.

```sql
    INSERT INTO #databases
                (database_id,
                 database_name)
    SELECT database_id,
           [name]
    FROM   sys.databases
    WHERE  1 = 1
           AND [state] <> 6 /* ignore offline dbs */
           AND database_id > 4 /* ignore system dbs */
    ORDER  BY [name]
```

First we are querying for a list of databases excluding any that are offline or system databases. We store this in a temporary table \`#databases\`.