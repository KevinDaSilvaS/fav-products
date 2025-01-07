# Fav-products-api

## Running the app
To run the app just run:<br>
`podman compose up -d --build` <br>
Or with docker<br>
`docker compose up -d --build` <br>

## Endpoints

### Collection
There's an insomnia collection by the name ./collection to import and help testing the api

### Users: `/clients`
- POST(Creates a user) `/clients` <br> 
    Request body:<br>
    `{
        "name": "Kevin",
        "email": "k@k.com"
    }
`

- PATCH(Updates a user) `/clients/:user_id` <br> 
    Request body: <br>
    ` {
        "name": "Kevin"
    } `

- GET(Obtains logged user data) `/clients` 

- DELETE(removes a user) `/clients:user_id` 

### Products: `/user_id/products`
- GET(Obtains paginated products in list) `/user_id/products?page=1&limit=10` 

- GET(Obtains one product in list) `/user_id/products/:product_id` 

- PATCH(Add product to list) `/user_id/products/:product_id` 

- DELETE(Remove product from list) `/user_id/products/:product_id` 

### Auth: `/auth`
- POST(Logs in) `/auth` <br> 
    Request body:<br>
    `{
        "email": "k@k.com"
    }
`

- GET(Gets user id from SESSION_TOKEN header) `/auth` <br> 

- DELETE(Logs out user) `/auth/logout` <br> 

### Notice
When you login at /auth the response will be a uuid that will be the value of the SESSION_TOKEN header which is responsible for checking if the user is logged in and can perform certain action on api 
