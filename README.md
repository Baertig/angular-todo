# Angular Todo App
A simple fullstack app to manage todos

## Getting Started

### Docker 
...for a quick try.

Start the app by running 
```bash
docker compose up --build
```
When you see logs from all service (postres, server, client) it should be up and running. (This might take some time because the server sets up the database schema on startup)

Once everything is up go to http://localhost:4200/ to access the app. The server runs on http://localhost:3000/

###  npm + docker
...for development

first start the database:
```bash
docker compose -f ./docker-compose.database.yml up
```

Start client + server by running:
```bash
npm install
npm run start
```

## Architecture

### Client
Built on top of Angular and uses NgRx to manage state.

All state changes follow this flow:
- UI component dispatches action
- action is processed by reducer (sets loading state)
- action is processed by effect 
    - triggers network request
    - If the request is successful effect dispatches "\<action\> Success" action, with result in payload
    - If the request errors effect dispatches "<action> Failure" action, with error message in payload
- subsequent action is proccessed by the reducer, which sets error/updates state. 


### Server

Uses express.js to setup the webservice and drizzle-orm for storing data in the postgres database. 

#### Schema

```
GET /api/v1/todos           --> fetch all todos
GET /api/v1/todos/:id       --> fetch a single todo by id
POST /api/v1/todos          --> add a todo
PATCH /api/v1/todos/:id     --> update fields of a todo
DELETE /api/v1/todos/:id    --> remove a todo by id
```




