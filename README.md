
# Library Management API

For this task I have created CRUD endpoints for books and implemented pagination. The relevant files are present in src/books. I have also created the following pipes for validating and transforming data.

#### ParsePaginationPipe

Located in src/pipes/parse-pagination.pipe.ts.This pipe is used to convert pagination data(page and limit) from string to integers. This pipe is being used in the findMultiple() method in the Books controller.

#### ValidateId

Located in src/pipes/validate-id.pipe.ts.This pipe is used to check if the id passed by a client is a valid MongoDB id. If the id is valid , the request proceeds to the controller. Otherwise, an exception is thrown.This pipe is being used in the findOne() , update() and remove() methods in the Books controller.

I am also using the built in nest validation pipe to make sure only valid data gets saved to the database.I have also created the following Exception Filters.


#### GlobalFilter

Located in src/exception-filters/globalFilter.filter.ts.This global filter catches every type of exception.

#### NotFoundFilter
      
Located in src/exception-filters/NotFound.filter.ts.This filter only catches exceptions thrown using NotFoundException. This filter is only bound to the findOne() , update() and remove() methods in the Books controller.

I  have also customized an HTTP response using NestJS's HttpException class in the implementation of the ValidateId pipe.

I have also created the following guards for Authentication.

#### JwtAuthGuard

This guard verifies that a user is logged in/authenticated before accessing a route.

#### RolesGuard

This guard verifies that a user is logged in/authenticated and has the appropriate role before accessing a route. There are two roles:user and admin. If a role is not specified during user signup, the user is assigned the user role. To create an admin user, the role has to be set to "admin" during signup.


#### RefreshAuthGuard

This guard is used in the refresh route of the auth API to determine if a valid Refresh Token is present.



## API Reference

### User Management


#### Create a User

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
The refresh token is also stored in the database as a backup.If credentials are not valid, then an appropriate message is sent to the client.

#### Request Body

```json
{
"email": "test@gmail.com",
"password": "abcdef"
}
```
#### Refresh(Must be an authenticated user)

```http
  POST /api/auth/refresh
```

Generates new access and refresh tokens and stores them in cookies as well as the database in case of the refresh token.


#### Sign out(Must be an authenticated user)

```http
  POST /api/auth/signout
```

Deletes the stored access and refresh tokens from the cookies and the database in case of the refresh token..

### Books Management

Only a properly authenticated user can access the following routes.

#### Create a book(Admin only)

```http
  POST /api/books
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `createBookDto`      | `CreateBookDTO` | **Required**. data of book to be created in the database |

Creates a new book document in the system.

#### Request Body

```json
{
  "title": "Test Final" ,
  "authors": ["Author One" , " Author  2  "],
  "pages": 249,
  "genres": ["Dystopian", "Science Fiction"],
  "publicationDate": "2023-10-23",
  "isbn": "0-1201-5069-7"

}
```

#### Get multiple books

```http
  GET /api/books[?page=num&limit=num&filter=name]
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pagination`      | `PaginationDTO` | **Optional**. An object containing pagination options. |


Get an array consisting of multiple book documents.The pagination object consists of three optional properties:page,filter and limit. Limit specifies the number of books shown per page whereas page specifies the page number. By using filter, you can search books by name.

#### Get specific book

```http
  GET /api/books/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to fetch |

Get a single book document.

#### Update a book(Admin only)

```http
  PUT /api/books/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to update |
| `book`      | `UpdateBookDTO` | **Required**. data of book to be updated |

Updates a book document with the data provided.

#### Request Body

```json
{
  "authors": ["Edgar Wright" , " Steven Martin "]
}
```

#### Delete a book(Admin only)

```http
  DELETE /api/books/${id}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of book to delete |

Deletes a book from the system
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





