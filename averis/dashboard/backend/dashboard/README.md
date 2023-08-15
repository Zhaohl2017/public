# Servic created using NodeJS Express framework (JWT Authentication with PostgreSQL) for the Dashboard project

This is the REST API service with JWT Authentication created under NodeJS Express framework & PostgreSQL database, used for he Dashboard project.

## API list

The following table shows overview of the Rest APIs that will be exported:

- GET     `api/auth/signup`                	            Register users
- GET     `api/auth/signin`               	            Login an account

- GET     `api/test/all`                 	            Access public resource
- GET     `api/test/user`               	            Access protected resource
- GET     `api/test/mod`            	                Access protected resource
- GET     `api/test/admin`          	                Access protected resource

- POST    `api/product`                                 Create a new Product
- GET     `api/product`	                                Retrieve all Products
- GET     `api/product/:id`                             Retrieve a single Product by id
- PUT     `api/product/:id`                             Update a Product by id
- DELETE  `api/product/:id`                             Delete a Product by id
- DELETE  `api/product`                                 Delete all Products - Be careful
- GET     `api/product?country=[ctry]&category=[cat]`   Find all Products with conditions
- GET     `api/dashboard?country=[ctry]&category=[cat]` The Dashboard

## Technology

Main technologies as below list:

    . express 4.18.2
    . jsonwebtoken 9.0.1
    . bcryptjs 2.4.3
    . cors 2.8.5
    . pg 8.11.2
    . pg-hstore 2.3.4
    . sequelize 6.32.1

## Project setup
```
npm install
```

### Run
```
npm start
```

Base URL: [http://localhost:8080](http://localhost:8080) for local testing.
