<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. 
<br> For development __please follow the instructions below__
## Nest Installation
```bash
$ npm i -g @nestjs/cli
```

## Project Installation

```bash
$ npm i
```
## Running database

```bash
$ docker-compose up -d
```

## Before running the app
rename the ```.env.template``` to ```.env``` file and insert the correct env variables


## Seed the database
```bash
$ http://localhost:8000/api/seed
```

## Create a user
```bash
$ http://localhost:8000/api/auth/register POST
{
    "username":"rodrigo",
    "email":"rodrigo@gmail.com",
    "password":"123456"
}
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app
1. Create .env.prod file
2. Insert the correct env variables
3. Create the new image
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```