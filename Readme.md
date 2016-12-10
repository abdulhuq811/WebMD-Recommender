# Diagnose Yourself
## Overview
A visual recommender based on the WebMD dataset between the year 2010 and 2014 using questions, answers, topics, relatedtopics and members table to recommend latent body parts relationship and top questions posted for each category.
## Motivation
Online Symptom checkers provide a way for users to find medical conditions based on the symptoms provided. In our project, we focus at determining the latent relationships between body parts selected and allowing users to multi-select body parts accordingly suggesting the medical conditions based on top questions posted for those body parts in each category from WebMD dataset.
## Prerequisites
1. Postgres
2. Java 7 (minimum)
3. Apache Tomcat or any other hosting server

## Installation
1. Load the tmpdb into postgres by first creating a db named "DV" and using the following command in command prompt
```
psql -U <username> < <dumpFilePath>
```
2. Open the project in eclipse, start the server.

## Examples
