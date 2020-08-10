# Post-Tracker

How to run the project ?

1. installed dependencies
2. Ensure you are using Node version v10.16.0
3. `npm install` to install the dependencies
4. Set up the DB in postgres knexfile.js . Run the command `knex migrate:latest`.
5. Create a .env file in the root directory of the project and update the required variables.
`API_KEY =` generate the api key for `www.fast2sms.com`.
7. `npm start` to run the server.
The server will run with auto reloading using nodemon.