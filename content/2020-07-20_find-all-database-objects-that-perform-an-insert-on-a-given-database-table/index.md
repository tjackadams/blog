---
title: Find all database objects that perform an insert on a given database table
description: I explore how we can find all dependencies of a single table in Microsoft SQL Server 2017 across databases that perform an update or insert action.
date: 2020-07-20T13:21:48.017Z
cover:
  src: microsoft-sql-server-logo.png
  alt: Microsoft SQL Server Logo
  title: Microsoft SQL Server Logo
tags:
  - msssql
---

We currently have around 15 database stored in a single SQL instance and we started to notice some invalid data being entered into a single table. With this amount of database and objects within the database, I was tasked with finding out what objects are referencing this table so we can find out where this invalid data is coming from.

The databases are stored in source control under the .sqlproj project format. My first approach was to search the solution in Visual Studio using a regular expression and seeing what that returned. The regular expression is not elegant by a long shot `INSERT([^@#]\*)SiteClientMailing(\$|[^a-z])` but it did provide a rough idea of what we are dealing with. I soon realised that I couldn't use this method because:

- There are a huge amount of database objects that are not under source control. This is from years of creating manual stored procedures and not clearing them up!
- There are many different ways you can reference a table, especially cross database queries.

My second approach was to create a trigger on the table and insert the name of the calling database object into an audit table. This initially showed some promise, but there were a few problems with this method:

- The table in question was in the **hot-path** for multiple applications, so leaving the trigger enabled for long periods of time caused quite a few performance issues in testing.
- We were relying on the database object to actually be triggered. Some stored procedures that are in the database are only called once a month or so. With the above performance problems, we just couldn't leave the trigger enabled for that period of time.

That is when I needed a better solution with the following requirements:

- Should not cause any performance issues.
- Should be able to query information across databases.
- Should be able to query a specific table.
- Easily identify the source database object.
- Ideally should be able to run the query on demand.
- A nice to have would be to include some additional stats, for instance the last run time.

With the requirements in place, I went to search the internet if anyone had solved a similar problem. There was a huge amount of similar questions on Stack Overflow, but most of the scripts I found referenced old system database objects with are depreciated with Microsoft SQL Server 2017, until I came across [this](https://zakird.com/mssql/2011/06/07/finding-cross-database-dependencies) blog post from 2011. This script loops through all database and finds all references using [sys.sql\_expression\_dependencies](https://docs.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-sql-expression-dependencies-transact-sql?view=sql-server-ver15).

The script I ended up with is embedded at the bottom of this post, but I'll run through it now so we know what is going on in the script.

```sql
        INSERT INTO #databases ( database_id , database_name
                               )
               SELECT database_id , [name]
               FROM sys.databases
               WHERE 1 = 1
                     AND
                     [state] <> 6 /* ignore offline dbs */

                     AND
                     database_id > 4 /* ignore system dbs */

               ORDER BY [name];
```

First we are querying for a list of databases excluding any that are offline or system databases. We store this in a temporary table `#databases`.

```sql
 WHILE ( SELECT COUNT(*)
                FROM #databases
              ) > 0
            BEGIN
                SELECT TOP 1 @database_id = database_id , @database_name = database_name , @quoted_database_name = QUOTENAME(DB_NAME(CONVERT(NVARCHAR , database_id)))
                FROM #databases;
                SET @sql = 'insert into #tbl1 select
					quotename(db_name(' + CONVERT(NVARCHAR , @database_id) + ')),
					quotename(object_schema_name(d.referencing_id, ' + CONVERT(NVARCHAR , @database_id) + ')),
					quotename(object_name(d.referencing_id, ' + CONVERT(NVARCHAR , @database_id) + ')),
					d.referencing_id,
					o.type,
					o.type_desc,
					max(o.modify_date),
					max(q.last_execution_time),
					d.referenced_entity_name
				from ' + @quoted_database_name + '.sys.sql_expression_dependencies d
				left join ' + @quoted_database_name + '.sys.objects o on d.referencing_id = o.object_id
				left join ' + @quoted_database_name + '.sys.query_store_query q on d.referencing_id = q.object_id
				where d.referenced_entity_name = ''' + @TargetTable + '''
				group by	d.referencing_id,
							o.type,
							o.type_desc,
							d.referenced_entity_name';
                EXEC (@sql);
                DELETE FROM #databases
                WHERE database_id = @database_id;
            END;
```

We then loop through the list of databases, querying the dependencies that reference our **Target Table**. You might also notice that we join on the [sys.query\_store\_query](https://docs.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-query-store-query-transact-sql?view=sql-server-ver15) table, this is so we can pull the **last\_execution\_time** if it exists. This information is stored in a temporary table which is great, but we need some way to tell if the dependency performs an inserts into our target table.

```sql
WHILE ( SELECT COUNT(*)
                FROM #tbl1
              ) > 0
            BEGIN
                SELECT TOP 1 @referencing_database_name = referencing_database_name , @referencing_schema_name = referencing_schema_name , @referencing_entity_name = referencing_entity_name
                FROM #tbl1;
                SET @sql = 'insert into #tbl2 select
					d.referencing_database_name,
					d.referencing_schema_name,
					d.referencing_entity_name,
					d.referencing_entity_id,
					d.referencing_entity_type,
					d.referencing_entity_type_desc,
					d.referencing_entity_modify_date,
					d.referencing_entity_last_execution_time,
					d.referenced_entity_name,
					e.is_updated
				from #tbl1 d
				inner join ' + @referencing_database_name + '.sys.dm_sql_referenced_entities(''' + @referencing_schema_name + '.' + @referencing_entity_name + ''', ''OBJECT'') e on d.referenced_entity_name = e.referenced_entity_name
				where d.referencing_database_name = ''' + @referencing_database_name + '''
				and	  d.referencing_schema_name = ''' + @referencing_schema_name + '''
				and   d.referencing_entity_name = ''' + @referencing_entity_name + '''
		        and e.referenced_minor_name is null';
                EXEC (@sql);
                DELETE FROM #tbl1
                WHERE referencing_database_name = @referencing_database_name
                      AND
                      referencing_schema_name = @referencing_schema_name
                      AND
                      referencing_entity_name = @referencing_entity_name;
            END;
```

We are now looping through the dependencies in the previous code block and querying the [sys.dm\_sql\_referenced\_entities](https://docs.microsoft.com/en-us/sql/relational-databases/system-dynamic-management-views/sys-dm-sql-referenced-entities-transact-sql?view=sql-server-ver15) dynamic management view. This view has the property that we are interested in `is_updated` which according to the docs **The object or column is modified**.

You are probably thinking "but that includes both updates **AND** inserts!", and you would be correct. I couldn't find a reliable way to filter it down to **JUST** inserts, so if you know of a way please leave a comment at the bottom or let me know on the gist.

The stored procedure can be called:

```sql
EXEC dbo.get_crossdatabase_dependencies @TargetTable = 'Account'
```

Here is the final script

`gist:tjackadams/e68bce759c199c4a69416f8cd6798fa0`

Happy Coding!
