# Back-End

## Heroku

https://water-my-plants-tt17-chris.herokuapp.com

| Routes     |                         |                                                                                                                                           |
| ---------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Users**  |                         |                                                                                                                                           |
| **GET**    | _/api/users_            | List of all users                                                                                                                         |
| **GET**    | _/api/users/:id_        | User info for the given user_id                                                                                                           |
| **POST**   | _/api/users/register_   | Register new user - username, password, and phone_number required                                                                         |
| **POST**   | _/api/users/login_      | Login - username and password required - returns token                                                                                    |
| **PUT**    | _/api/users/:id/update_ | Update user password and phone number for the given user_id - password, phone_number, valid user_id, and valid token required             |
| ------     | ------                  | ------                                                                                                                                    |
| **Plants** |                         |                                                                                                                                           |
| **GET**    | _/api/plants/:id_       | List of a users plants for the given user_id                                                                                              |
| **POST**   | _/api/plants/:id_       | Adds a plant to a user with the given user_id - nickname, species, h2oFrequency, user_id and valid token required - returns the new plant |
| **PUT**    | _/api/plants/:id_       | Updates a plant at the given plant_id - nickname, species, h2oFrequency, and valid token required                                         |
| **DELETE** | _/api/plants/:id_       | Deletes a plant at the given plant_id                                                                                                     |
