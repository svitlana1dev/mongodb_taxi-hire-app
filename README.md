## Description

App for searching and ordering a nearby taxi.

## How to run project
Project is using npm as package manager, but you can use yarn as well.
##### 1. Install Dependencies:
```bash
$ npm install
```

##### 2. Create .env file:

```bash
DB=link_to_db
PORT=3000
```

##### 3. Running the app:

```bash
# development
$ npm run start:dev

# production mode
$ npm run build
$ npm run start
```
###### Or run Docker Containers
```bash
$ docker-compose up
```

##### 4. Test the app:

```bash
# unit tests
$ npm run test
```
## API Endpoints

| Method | Route                    | Description               |
|--------|--------------------------|---------------------------|
| GET    | /api/drivers?lng=0&lat=0 | Get list of a nearby taxi |
| POST   | /api/drivers             | Add a new driver          |
| POST    | /api/drivers/:id         | Edit driver data          |
| DETELE | /api/drivers/:id         | Delete driver by id       |
