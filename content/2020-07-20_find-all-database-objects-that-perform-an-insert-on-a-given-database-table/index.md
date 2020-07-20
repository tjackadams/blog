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