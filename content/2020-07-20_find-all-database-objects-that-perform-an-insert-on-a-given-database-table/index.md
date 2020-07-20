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
As a database evolves over time, there will come a point where a bit of house keeping is in order. I recently had this requirement sent over to me as "some database object" was inserting data into a particular table and we needed to find out where the data was coming from. This allowed us to review the objects accessing this table and remove anything that is no longer in use.\
\
My requirement statement was as follows: **Find all database objects that are inserting data into table X**.



## TL;DR

As it turns out this isn't possible using Microsoft SQL Server 2017...but you can get fairly close. Skip to the end of this article to see the finished SQL script.



After quite a lot of research on this problem, I found a couple of solutions each with their own drawbacks, so just use the one that suits your needs.



## Regular Expression

I know...a good old fashioned regular expression. As we develop our database in Visual Studio as .sqlproj projects, I initially went down the regular expression road. \
\
\`INSERT([^@#]*)TableName($|[^a-z]) \`



This actually produced some good results, but it isn't perfect. I quickly realised that we can no conventions for accessing tables, and there can be a lot of variations that this regular expression did not account for.

\`TableName\`

\`Schema.TableName\`

\`\[Schema].TableName\`

\`\[Schema].\[TableName]\`

\`Database.Schema.TableName\`

...and you start to get an idea of what we are dealing with. I could have spent forever and a day altering the regular expression to account for all the various ways to access a table, but this only accounted for database objects stored in source control. This means that any database objects accessing our table that has manually been created in the database we would have no knowledge of, therefore the regular expression is out for us. Though, this could be useful in simple scenarios.