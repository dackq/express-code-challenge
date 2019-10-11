# Old Bibliu Express Server Tech Test

This code is my response to Bibliu's [old tech test](https://github.com/bibliotom/express-code-challenge). It is an express server with a mongodb database and [mongoose](https://mongoosejs.com/) object modeling. 

## Outline

The database contains **`User`**, **`Institution`** and **`Book`** models which can be accessed by three routes defined by express:

1. **`POST /users/signin`**: verifies user credentials with the [passport](https://www.npmjs.com/package/passport) library which then registers a session with [express-session](https://www.npmjs.com/package/express-session).
1. **`POST /users/create`**: creates user with a **name**, **email**, **role** and **password**. 
    - At the time of saving, the user model will also use the registered email domain to associate users with their respective institution.
1. **`GET /books`**: returns a list of books offered by each user's respective institution to the client.

## How to Use

Clone this repository and run **`npm install`** in the directory. The server can be started with **`npm start`**. 

The server must have access to a **MongoDB** database, so, on the first, run a database url will be requested in the console. This information will be saved in a **.env** file so that it may be used on subsequent runs. 

If you would like to initialize the database with test data, use **`npm run db-init`**. You can then create a user using the domain names **'@wikipodia.org'** or **'@uofn.org'**.

