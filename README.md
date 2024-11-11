
# RESTful APIs , Pipes for Data Transformation , Error Handling and Custom Responses

For this task I have created CRUD endpoints for books and implemented pagination. The relevant files are present in src/books. I have also created the following pipes for validating and transforming data.

#### ParsePaginationPipe:-

Located in src/pipes/parse-pagination.pipe.ts.This pipe is used to convert pagination data(page and limit) from string to integers. This pipe is being used in the findMultiple() method in the Books controller.

#### ValidateId:- 

Located in src/pipes/validate-id.pipe.ts.This pipe is used to check if the id passed by a client is a valid MongoDB id. If the id is valid , the request proceeds to the controller. Otherwise, an exception is thrown.This pipe is being used in the findOne() , update() and remove() methods in the Books controller.

I am also using the built in nest validation pipe to make sure only valid data gets saved to the database.I have also created the following Exception Filters.


#### GlobalFilter:-

Located in src/exception-filters/globalFilter.filter.ts.This global filter catches every type of exception.

#### NotFoundFilter:-
      
Located in src/exception-filters/NotFound.filter.ts.This filter only catches exceptions thrown using NotFoundException. This filter is only bound to the findOne() , update() and remove() methods in the Books controller.

I  have also customized an HTTP response using NestJS's HttpException class in the implementation of the ValidateId pipe.

I have also created the following guards for Authentication.

#### JwtAuthGuard:-

This guard verifies that a user is logged in/authenticated before accessing a route.

#### RolesGuard:-

This guard verifies that a user is logged in/authenticated and has the appropriate role before accessing a route.


#### RefreshAuthGuard:-

This guard is used in the refresh route of the auth API to determine if a valid Refresh Token is present.



## API Reference

### User Management


#### Create a User:-

```http
  POST /api/auth/signup
```
Saves the data of the user to the database.

#### Request Body

```json
{
"firstName": "test",
"lastName": "doe",
"email": "test@gmail.com",
"password": "abcdef"
}
```

#### User Login

```http
  POST /api/auth/login
```
Firstly, it checks user credentials. If valid, it generates Access and Refresh Tokens and saves them in cookies.
If not, then an appropriate message is sent to the client.

#### Request Body

```json
{
"email": "test@gmail.com",
"password": "abcdef"
}
```
#### Refresh:-

```http
  POST /api/auth/refresh
```

Generates new access and refresh tokens.


#### Sign out:-

```http
  POST /api/auth/signout
```

Deletes the stored access and refresh tokens.

### Books Management

#### Create a book

```http
  POST /api/books
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `createBookDto`      | `CreateBookDTO` | **Required**. data of book to be created in the database |

#### Get multiple books

```http
  GET /api/books[?page=num&limit=num]
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pagination`      | `PaginationDTO` | **Optional**. An object containing pagination options. |

The pagination object consists of two optional properties:page and limit. Limit specifies the number of books shown per page whereas page specifies the page number.

#### Get specific book

```http
  GET /api/books/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to fetch |

#### Update a book

```http
  PUT /api/books/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to update |
| `book`      | `UpdateBookDTO` | **Required**. data of book to be updated |

#### Delete a book

```http
  DELETE /api/books/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to delete |


#### Borrow a Book:

```http
  POST /api/books/${id}/borrow
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to borrow |

A user in the system can borrow a book if it is not already borrowed by another person.

#### Return a Book:

```http
  POST /api/books/${id}/return
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to return|

A user in the system can return their borrowed book.





