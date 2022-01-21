# FSongs

## Models:

_User_

```
- email : required, unique
- password : required
```

_Favorite_

```
- title : required
- artist : required
- image : required
- file : required
- userId : required
```


## Associations :
>- User dan Fovorite = **One-to-Many**

## Endpoints :

- `POST /register`
- `POST /login`

routes below need authentication:

- `GET /favorites`
- `POST /favorites`
- `Delete /favorites/:id`


---

## POST /register

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
    "id": 5,
    "email": "customer3@gmail.com"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email or Password connot be null"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid email format"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email is already exists"
}
```
_Response (400 - Bad Request)_

```json
{
    "message": "Validation len on password failed"
}
```

## POST /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjQyNzI4NzMyfQ.0RSe8neTa7re0426RUXvCHDTzWujrIx2CgIArjcaBh0"
}
```

_Response (401 - Unauthenticated)_

```json
{
    "message": "Invalid Email/Password"
}
```

## GET /favorite

description:
get all data favorite from database

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
    {
        "id": 1,
        "title": "The Scientist",
        "artist": "Coldpaly",
        "image": "https://api.deezer.com/album/299821/image",
        "file": "https://cdns-preview-b.dzcdn.net/stream/c-b2a9b8a5b6dd033ce39a76a7f628bb54-3.mp3",
        "userId": 2,
        "createdAt": "2022-01-20T03:12:26.410Z",
        "updatedAt": "2022-01-20T03:12:26.410Z"
    },
    {
        "id": 5,
        "title": "Paradise",
        "artist": "coldplay",
        "image": "https://api.deezer.com/album/1312875/image",
        "file": "https://cdns-preview-4.dzcdn.net/stream/c-40392174522b5dc24ef3d67d225b1e59-7.mp3",
        "userId": 1,
        "createdAt": "2022-01-20T12:40:33.696Z",
        "updatedAt": "2022-01-20T12:40:33.696Z"
    },
    {
        "id": 6,
        "title": "Hymn for the Weekend",
        "artist": "coldplay",
        "image": "https://api.deezer.com/album/11898198/image",
        "file": "https://cdns-preview-8.dzcdn.net/stream/c-8f919512e51faf22f342d3727ff751dc-6.mp3",
        "userId": 1,
        "createdAt": "2022-01-20T12:42:25.896Z",
        "updatedAt": "2022-01-20T12:42:25.896Z"
    },
    {
        "id": 14,
        "title": "Venom (Music From The Motion Picture)",
        "artist": "Eminem",
        "image": "https://api.deezer.com/album/73301752/image",
        "file": "https://cdns-preview-c.dzcdn.net/stream/c-c2f1132eab78414f78402c5f3dd35f5b-6.mp3",
        "userId": 2,
        "createdAt": "2022-01-20T18:21:33.650Z",
        "updatedAt": "2022-01-20T18:21:33.650Z"
    },
    {
        "id": 15,
        "title": "Sing For The Moment",
        "artist": "Eminem",
        "image": "https://api.deezer.com/album/103248/image",
        "file": "https://cdns-preview-6.dzcdn.net/stream/c-6a0f240c7bd580e87697146ed3247ab5-8.mp3",
        "userId": 3,
        "createdAt": "2022-01-21T00:41:10.707Z",
        "updatedAt": "2022-01-21T00:41:10.707Z"
    },
    {
        "id": 16,
        "title": "Mockingbird",
        "artist": "Eminem",
        "image": "https://api.deezer.com/album/119606/image",
        "file": "https://cdns-preview-6.dzcdn.net/stream/c-655dfb802c35579d26a32136e3d0e7b3-12.mp3",
        "userId": 3,
        "createdAt": "2022-01-21T01:06:34.096Z",
        "updatedAt": "2022-01-21T01:06:34.096Z"
    },
    {
        "id": 17,
        "title": "Hymn for the Weekend",
        "artist": "coldplay",
        "image": "https://api.deezer.com/album/11898198/image",
        "file": "https://cdns-preview-8.dzcdn.net/stream/c-8f919512e51faf22f342d3727ff751dc-6.mp3",
        "userId": 3,
        "createdAt": "2022-01-21T01:38:50.756Z",
        "updatedAt": "2022-01-21T01:38:50.756Z"
    }
]
```

## POST /favorites

description:
send voucher to other user. default status untuk gift adalah 'unclaimed'

Request:

- headers: access_token (string)
- params:
  - userId: "integer" required

- body:

```json
{
    "title": "Hymn for the Weekend",
    "artist": "coldplay",
    "image": "https://api.deezer.com/album/11898198/image",
    "file": "https://cdns-preview-8.dzcdn.net/stream/c-8f919512e51faf22f342d3727ff751dc-6.mp3",

}
```

Response:

- status: 201
- body:

```json
{
  {
    "id": 18,
    "userId": 3,
    "title": "Hymn for the Weekend",
    "artist": "coldplay",
    "image": "https://api.deezer.com/album/11898198/image",
    "file": "https://cdns-preview-8.dzcdn.net/stream/c-8f919512e51faf22f342d3727ff751dc-6.mp3",
    "updatedAt": "2022-01-21T01:41:20.024Z",
    "createdAt": "2022-01-21T01:41:20.024Z"
}
}
```
## DELETE /favorites/:id

description:
show current user gifts

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
[
  {
    "id": 2,
    "message": "Happy Wedding My Dear",
    "sender": "bono@mail.com",
    "amount": 500000,
    "voucherId": 1,
    "receiverId": 2,
    "status": "unclaimed",
    "voucher": {
      "title": "Thank You Gift voucher",
      "imageUrl": "https://cdn.dribbble.com/users/416805/screenshots/15604755/media/f279c6ce7d2ef61fe1b301ce6f1cd509.jpg?compress=1&resize=1600x1200"
    }
  }
]
```

## PATCH /gifts/:id

description:
claim gift

Request:

- headers: access_token (string)
- params:
  - id: "integer" required

Response:

- status: 200
- body:

```json
{
  "id": 1,
  "status": "claimed"
}
```

_Response (403 - Unauthorized)_

```json
{
  "message": "You are not authorized"
}
```

## Global Error

_Response (401 - Unauthenticated - no token)_

```json
{
  "message": "you must login first"
}
```

_Response (401 - Unauthenticated - invalid token)_

```json
{
  "message": "authentication failed"
}
```
