
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


## API Reference


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



