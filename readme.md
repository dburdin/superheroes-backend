#SuperHeroes
#Used-stack: Node.js, {cors, cross-env, dotenv, express, joi, mongoose, morgan}

This is the backend server for the Superheroes application. It provides an API to manage superheroes' data.

Features
|Fetch a list of superheroes
| Get details of a specific superhero by ID
| Add a new superhero
| Update an existing superhero
| Delete a superhero

Technologies Used
-Node.js: JavaScript runtime environment
-Express.js: Web application framework for Node.js
-MongoDB: NoSQL database for storing superheroes data

API Endpoints
GET /superheroes
-Returns a list of all superheroes.
-Optional query parameters:
--page: Page number for pagination (default: 1)
--limit: Number of superheroes per page (default: 10)

GET /superheroes/:id
-Returns details of a specific superhero by ID.
POST /superheroes
-Adds a new superhero.
-Request body should include the superhero details.

PUT /superheroes/:id
-Updates an existing superhero by ID.
-Request body should include the updated superhero details.

DELETE /superheroes/:id
-Deletes a superhero by ID.


Deployed on: https://superheroes-backend-es7x.onrender.com/api/superheroes
