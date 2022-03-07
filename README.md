# Didomi

## Introduction

The task is to build an API that creates and manages users and also manages the kind of notifications the user wants. It also helps the user enable a specific kind of notification.

## File Structure

The following details the file structure for the project:

- config: Configuration files for databases or other infrastructure.
- src
  - entities: The database entities.
  - helpers: General helper functions
  - migrations: Migration files to help manage database e.g. create tables.
  - modules: Contains the business logic separated into modules
  - shared: Contains shared modules, repositories etc. e.g. A BaseRepository class that all repositories inherit.
  - test: Contains tests

## Some Libraries Used

- @nestjs/swagger: Swagger docs
- @nestjs/typeorm & typeorm: ORM for database
- pg: Postgres library that works with typorm

## How To Run The App

- Git clone the project by doing `git clone https://github.com/gate3/didomi.git`
- Run `yarn` in project root to install dependencies
- Create `.env` file and copy fields from `.env.sample` into it
- Run `yarn start:database` in project root to start the database from docker-compose
- Once the database is running, connect to it using your postgres client (e.g. pg4admin, dbeaver)
- Create a database called `didomi-postgres`
- Run the app, you can run in dev mode using `yarn start:dev` or production using `yarn start:prod`

### Discover API endpoints

I included a swagger api as part of the app to make discovering and working with endpoints easy

- Visit `localhost:3009/docs` in your browser to see the swagger documentation
- You can get the endpoints there and use postman or test from swagger

## Considerations

- I created the notification consent types as an enum `ConsentTypes`. Creating this as an enum helps ensure that only the allowed specified fields are allowed and persisted among other things. Also the performance is better for an enum.
- According to the requirements, I'm to return a 422 response when the user creation has an error. To accomplish that, I created a `HTTP-Exception Filter` called `helpers/errors/exception-filters/users-http-exception.filter.ts`. This can be applied using the `@UseFilters` decorator.
- I included an API doc using swagger. I made the decision because its portable and doesn't require any extra setup.
- I also included a transformation step to the API response so the response can be transformed to what is expected in the requirements. I could have transformed it in the service function, but it would not have been very neat, plus this way the inner workings of the API isn't exposed.

## TODO (Things I could have done better)

- I could have written more unit tests to cover more edge cases
- I could have written integration/e2e (end to end) tests to verify data validation and that the API works properly with the requests and responses

Cheers