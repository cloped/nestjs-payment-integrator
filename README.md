# Project Overview

This project includes:

- Backend structure built with **NestJS** framework.
- Setup for running **integration tests**.
- Database integration using the **Prisma ORM**.
- Integration of **testcontainers** in integration tests to enable reliable TDD-style end-to-end (e2e) testing with a real database.
- Stripe payment gateway integration, validated through e2e tests.

## Setup Requirements

- **NodeJS** v24.4.0  
- **Docker** installed and running  
- In **VSCode**, install the Jest extension for easy test running and debugging:  
  [Jest - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)

## How to Run

Run the following commands in your terminal:

- npm i  
- npm run start:dev

## Recommended Workflow

- Run tests using:  
  npm test <test-file-name>  

  to follow Test-Driven Development (TDD) practices.

- Benefit from the **Jest VSCode extension** to run and debug tests easily inside the editor.

## TODO

- Design and implement the **charge model** in the database.  
- Develop the **billing flow** with unit tests and e2e tests, following a TDD approach.
