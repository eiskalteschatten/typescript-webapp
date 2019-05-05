# TypeScript Boilerplate Web App

[![Build Status](https://travis-ci.org/eiskalteschatten/typescript-webapp.svg?branch=master)](https://travis-ci.org/eiskalteschatten/typescript-webapp)

This project is a boilerplate web app based on TypeScript. It includes a few features that commonly appear in web applications in a way that is easy to use and configure.

There is also a [version written in plain Node.js](https://github.com/eiskalteschatten/nodejs-webapp).

But why are there so few commits? This project has existed for a long time and has formed the basis for many a TypeScript application, but was in a private repository for most of its existence. It included several items that needed to remain private, so the commit history was deleted along with those items when preparing it to go open source.


## Table of Contents

- <a href="#requirements">Requirements</a>
- <a href="#included-frameworks">Included Frameworks</a>
- <a href="#features">Features</a>
- <a href="#usage">Usage</a>
- <a href="#contributing">Contributing</a>

## Requirements

- Node.js >= 11 (may work with earlier versions, but isn't tested)


## Included Frameworks

- TypeScript
- Express.js
- Express Enrouten
- Nunjucks
- Bootstrap
- jQuery
- compile-sass (based on node-sass)
- Moment
- Marked (for Markdown)
- Highlight.js (for code highlighting)
- Matomo (for tracking with Matomo)

### Dev Frameworks

- Nodemon
- Eslint
- Husky
- ts-node


## Features

- Automatically configured controllers based on Express Enrouten
- SASS files compiled on page load when `NODE_ENV=development`
    - For all other environments, SASS files are automatically compiled and saved into CSS files in the public folder on the hard drive on application start.
- Support for websites in multiple languages
- Markdown rendering in Nunjucks templates or controllers
    - Including support for code syntax highlighting
- Server-side page tracking with Matomo
- Configurable redirects
- Ability to create proxy routes (i.e. for frameworks like jQuery which appear in the `node_modules` folder) so that they have an URL accessible from the browser such as `/js/libs/jquery.min.js`)
- Automatic TypeScript compilation and server restart when developing
- Pre-made Dockerfile


## Usage

After starting the application, you can access it at http://localhost:3025.

Before you use the application, you need to install all dependencies with:

```bash
npm install
```


**Start in development mode**

```bash
npm run start:dev
```

**Start in production mode**

```bash
npm run start:prod
```

**Build TypeScript**

```bash
npm run build
```

**Build TypeScript in development mode**

```bash
npm run build:dev
```

**Start with Docker**

```bash
npm run docker
```

**Start and Rebuild Docker Image**

```bash
npm run docker:rebuild
```

**Linting**

```bash
npm run lint
```

## Contributing

If you would like to contribute to the project, feel free to fork the repository and make a pull request. When committing, Husky will create a commit hook that will automatically lint your code before it allows you to commit, so it is recommended to lint any changes before committing by running `npm run lint`.

If you find a bug or any other issues or have any feature requests, don't hesitate to create a GitHub issue.


---

Alex Seifert - https://www.alexseifert.com
