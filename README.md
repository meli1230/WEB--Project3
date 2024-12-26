# Console commands

### `npm install express mysql2 ejs bcrypt passport express-session body-parser`
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
- `express-session`
  - used to persist user sessions across multiple requests
  - maintains the user session after login
- `body-parser`
  - parses data sent from forms, such as registration or login details
---
# Added functionalities
### `default` - events are displayed by last added
### `filtering` - by speaker
### `searching` - by name and speaker
### `sorting` - by price
