# Console commands

### `node app.js`
- runs the application

### `npm install express mysql2 ejs bcrypt passport passport-local express-session body-parser`
- `npm install`: installs Node.js modules using npm (node package manager)
- `express` 
  - a web application framework for Node.js
  - simplified handling HTTP requests, routing and rendering views
  - *ex: handles routes like `/register`, `/login`, `/dashboard`*
- `mysql2`
  - a library that allows the app to interact with the MySQL database
  - stores user data
  - contains promise support, which is used in this app (`pending`, `fulfilled`, `rejected`)
- `ejs` (Embedded JavaScript)
  - template engine for NodeJS
  - useful for rendering data from the server to the client
  - *ex: renders pages like login.ejs with dynamic data*
- `bcrypt`
  - library to hash passwords securely 
- `passport`
  - handles authentication in Node.js applications
  - simplifies the login/logout process, by supporting various strategies
  - *ex: authenticates users during login*
- `passport-local`
  - strategy used by passport for authenticating users with a username and password
  - verifies user credentials by comparing input with stored data
  - *ex: checks if the entered password matches the hashed password during login*
- `express-session`
  - used to persist user sessions across multiple requests
  - maintains the user session after login
- `body-parser`
  - parses data sent from forms, such as registration or login details
---
# Added functionalities
### Sorting by price
- `Sort by Price Ascending`: sorts the events by price, ascending
- `Sort by Price Descending`: sorts the events by price, descending
- `Reset Sorting`: resets all sorting filters, going to the initial state of the page

### View event button
- `View`: allows you to view all event details, including the description of the event which is not visible anywhere else

