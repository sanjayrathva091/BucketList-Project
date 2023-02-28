# TodoBucket - Backend - Project

## Description

To-dos applications are fundamental application that perform simple CRUD operations.

The following example shows api end point for simple CRUD operations:

| METHOD | END POINT                   | DESCRIPTION                                       |
| ------ | --------------------------- | ------------------------------------------------- |
| POST   | /api/auth/explorer/register | User can register with email address and password |
| POST   | /api/auth/explorer/login    | User can login with email address and password    |
| POST   | /api/create/todo            | User can create a new task                        |
| GET    | /api/explorer/todos         | User can get a list of tasks                      |
| GET    | /api/explorer/todo/:\_id    | User can get a specific task                      |
| PATCH  | /api/explorer/todo/:\_id    | User can update a specific task                   |
| DELETE | /api/explorer/todo/:\_id    | User can delete a specific task                   |
