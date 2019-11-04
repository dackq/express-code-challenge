# Old Bibliu Express Server Tech Test

This code is my response to Bibliu's [old tech test](https://github.com/bibliotom/express-code-challenge). It is an express server with a mongodb database and [mongoose](https://mongoosejs.com/) object modeling. 

## Outline

The database contains **`User`**, **`Institution`** and **`Book`** models which can be accessed by three routes defined by express:

1. **`POST /users/signin`**: verifies user credentials with the [passport](https://www.npmjs.com/package/passport) library which then registers a session with [express-session](https://www.npmjs.com/package/express-session).
1. **`POST /users/create`**: creates user with a **name**, **email**, **role** and **password**. 
    - At the time of saving, the user model will also use the registered email domain to associate users with their respective institution.
1. **`GET /books`**: returns a list of books offered by each user's respective institution to the client.

## How to Use

### Set-Up

This program uses Docker to facilitate set up. However, you must have docker installed in order to use it.

The easiest way to do this is to install Docker Desktop. You can find installation instructions and downloads for Docker Desktop [at this link](https://hub.docker.com/).

Once you have Docker Desktop installed, running the server is easy. Simply navigate to the directory you would like to save this repository to and run the following command:

`git clone https://github.com/dackq/express-code-challenge.git`

Then navigate into the new directory:

`cd express-code-challenge/`

Afterwards you can use Docker to set up the database and run the server. This process is saved in the npm start script so simply run.

`npm start`

This will create two docker containers and get them up and running. One is the server and the other is the database. The database will be pre-seeded with institution and book documents.

To stop the server, press `ctrl-c`. Anytime that you would like to run the server again, simply re-use the command `npm start` in the project directory.

### Running tests

Because docker containers have their own filesystem, in order to run the tests on the server you will need to connect a new bash terminal to the server container.

To do this run the following script:

`npm run connect`

This will start a bash terminal session within the server container. From here you can run `npm test` to see the test results.

## Documentation

Documentation for the classes and modules used in the server can be acessed via github pages [at this link](https://dackq.github.io/express-code-challenge/).

If you would like, they can also be accessed at [localhost:3000/docs](localhost:3000/docs) once the server has been started.

