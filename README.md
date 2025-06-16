# CartrawlerFrontendTest

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher recommended)
- npm (comes with Node.js) or yarn
- Angular CLI (install globally with `npm install -g @angular/cli`)

## First-Time Installation

To set up the project for the first time, follow these steps:

1. Clone the repository (if available):

```bash
git clone <repository-url>
cd cartrawler-frontend-test
```

or just open terminal in the folder (if using the zip file)

```bash
cd cartrawler-frontend-test
```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Install Angular CLI globally if you haven't already:

```bash
npm install -g @angular/cli
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to http://localhost:4200/. The application will automatically reload whenever you modify any of the source files.

## Available Scripts

The project includes the following npm scripts:

| Command         |                   Descriptions                   |
| --------------- | :----------------------------------------------: |
| npm start       | Starts the development server (same as ng serve) |
| npm run build   |     Compiles the application for production      |
| npm run         |       Builds in watch mode for development       |
| npm test        |            Runs unit tests with Karma            |
| npm run lint    |    Runs ESLint and fixes auto-fixable issues     |
| npm run format  |           Formats code using Prettier            |
| npm run lint:ci |   Runs ESLint in CI mode (no warnings allowed)   |

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as components, directives, or pipes), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the dist/ directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the Karma test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Note: This project doesn't currently include an e2e testing framework. You can add one (like Cypress or Protractor) if needed.

## Linting and Formatting

The project is configured with:

- ESLint for TypeScript and HTML linting

- Prettier for code formatting

Run these commands to maintain code quality:

```bash
npm run lint   # Check and fix linting issues
npm run format # Format all code
```

## Dependencies

### Main Dependencies

- Angular: 19.2.x

- RxJS: ~7.8.0

- Zone.js: ~0.15.0

## Development Dependencies

- Angular CLI: 19.2.15

- ESLint with TypeScript support

- Prettier for code formatting

- Jasmine/Karma for testing

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
