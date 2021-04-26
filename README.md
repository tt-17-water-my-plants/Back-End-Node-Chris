# Back-End

## Heroku

https://water-my-plants-tt17-chris.herokuapp.com

| ------ | ------ | ------ |
| **Users** | | |
| **GET** | _/api/users_ | List of all users |
| **GET** | _/api/users/:id_ | User info for the given user*id |
| **POST** | */api/users/register* | Register new user - username, password, and phone_number required |
| **POST** | */api/users/login* | Login - username and password required - returns token |
| **PUT** | */api/users/:id/update* | Update user password and phone number for the given user_id - password, phone_number, valid user_id, and valid token required  
| ------ | ------ | ------ |
| **Plants** | | |
| **GET** | */api/plants/:id* | List of a users plants for the given user_id |
| **POST** | */api/plants/:id* | Adds a plant to a user with the given user_id - nickname, species, h2oFrequency, user_id and valid token required - returns the new plant |
| **PUT** | */api/plants/:id* | Updates a plant at the given plant_id - nickname, species, h2oFrequency, and valid token required |
| **DELETE** | */api/plants/:id\_ | Deletes a plant at the given plant_id |
