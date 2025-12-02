## Table Content

1. [About The Project](#about-the-project)
    - [Built With](#built-with)
    - [Teck Stack](#teck-stack)
2. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
3. [Usage](#usage)
4. [Folder Structure](#folder-structure)
5. [Functionality and Features](#functionalities-and-features)
6. [License](#license)
7. [Acknowledgments](#acknowledgments)
8. [Quick Start](#quick-start)
9. [Deployment](#deployment)
10. [Setup Environment Variable](#environment-variable)

## About The Project

Welcome to Your Multi-Purpose Site Powered by TYPO3 Headless CMS and Next.js. Our multi-purpose website is proudly built on Next.js 13.4, a cutting-edge web development framework that brings innovation and exceptional performance to the digital landscape. We've harnessed the power of Next.js 13.4 to create a versatile platform that's ready to meet a wide range of needs.

T3-Bootstrap is designed to provide a comprehensive showcase of Bootstrap components, making it a valuable resource for developers, designers, and anyone interested in working with Bootstrap. With our user-friendly interface, you can effortlessly browse, interact with, and understand the behavior of various Bootstrap components.

T3-Bootstrap, Where TYPO3 Meets ReactJs! The ultimate TYPO3 Headless Template crafted with React & NextJS. Focusing on modern design and lightning-fast speed.

This document serves as a comprehensive guide to understand the client-side and server-side architecture.

T3-Bootstrap is bulid in NextJS which is a popular React JS Framework for building user interfaces, known for its component-based approach and efficient rendering capabilities. The client-side and Server-side application described here in is built using NextJS to deliver a dynamic and interactive user experience.

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [![React][React.js]][React-url]
- [![Next JS][Next.js]][NextJS-url]
- [![HTML][HTML.com]][HTML-url]
- [![Sass][Sass.com]][Sass-url]
- [![npm][npm.com]][npm-url]
- [![Javascript][Javascript.com]][Javascript-url]
- [![Bootstrap][Bootstrap.com]][Bootstrap-url]
- [![React Hook Form][React-Hook-Form.com]][React-Hook-Form-url]

### Tech Stack

- **Client:** Next Js, React JS, Sass

- **Server:** Typo-3 Headless CMS


## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* node
```sh
  version : 18 or Above
```
* npm
```sh
  version : 8 or Above
```
### Installation

Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo

```sh
  git clone https://gitlab.nitsantech.com/nitsan/general/javascript/nextjs-boilerplate.git <YOUR_PROJECT_NAME>
```
  
2. Move to the appropriate directory

```bash
  cd <YOUR_PROJECT_NAME>
```

3. Run this command to install dependencies.

  ```bash
    yarn
  ```
4. Run this command to run the program.

  ```bash
    yarn dev
  ```
5. At this point you can see the example app at http://localhost:3000.


## Usage

T3-Bootstrap is a client-side and server-side application aims to provide a responsive and interactive interface for users to interact with the application's features and functionalities with server side rendering. It utilizes Next JS components to manage the UI and provides seamless navigation and data manipulation capabilities.

## Folder Structure

> Folder structure options and naming conventions for software projects
### A typical top-level directory layout

    .
    ├── .next                   # Compiled files (alternatively `dist`)
    ├── src                     # Source files (alternatively `app`)
        ├── app
            ├── [locale]
                ├── [...slug]
                    ├── page.js
                    ├── layout.js
                    ├── error.js
                    ├── not-found.js
                    ├── loading.js
            ├── api
                ├── draft
                    ├── route.js
        ├── assets
            ├── fonts
            ├── iamges
            ├── localization
        ├── components
        ├── context
        ├── scss
        ├── sections
        ├── utils
        ├── middleware.js
    ├── package.json            # All dependecies
    └── README.md

> Use short lowercase names at least for the top-level files and folders except
> `LICENSE`, `README.md`

## Functionalities & Features

- **Responsive UI:**
  The application adapts to various screen sizes and devices, providing an optimal user experience.

- **Navigation:**
  To manage navigation within the application, allowing users to move between different pages seamlessly Next JS Provide it's own Link Component. Which work's same as React Router.

- **Predictable state management:**
  Unidirectional data flow allows for change logging and time travel debugging.

- **Next generation JavaScript:**
  Use template strings, object destructuring, arrow functions, JSX syntax, and more.

- **Next generation CSS:**
  Write composable CSS that's co-located with your components for complete modularity. Unique generated class names keep the specificity low while eliminating style clashes. Ship only the styles that are on the page for the best performance.

- **API Integration:**
  Fetch is utilized for making HTTP requests to backend APIs and fetching data to populate the UI.

- **Industry-standard i18n internationalization support:**
  Scalable apps need to support multiple languages, easily add and support multiple languages with `next-intl`.

- **Form Handling:**
  The application handles user input through forms, validating and processing the data as required.

- **Data Manipulation:**
  The application allows users to perform various operations on the data, such as filtering, sorting, and searching.

- **Error Handling:**
  Error boundaries and proper exception handling are implemented to gracefully handle errors and provide meaningful feedback to users.

## License
For open source projects, say how it is licensed.

## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [React Icons](https://react-icons.github.io/react-icons/search)
* [Next-intl](https://next-intl-docs.vercel.app/)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [Fancy UI](https://fancyapps.com)
* [React Hook Form](https://react-hook-form.com/)


## Quick Start

Clone the project

```bash
  git clone https://gitlab.nitsantech.com/nitsan/general/javascript/nextjs-boilerplate.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn dev
```

You can see example app at http://localhost:3000.

## Deployment

To deploy this project run

```bash
  yarn build
```
Start the server

```bash
  yarn start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_API_URL`

```bash
  https://your_backend_url/
```

`NEXT_PUBLIC_TYPO3_MEDIA`

```bash
  fileadmin
```

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[HTML.com]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[HTML-url]: https://www.w3.org/html/
[Sass.com]: https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white
[Sass-url]: https://sass-lang.com/
[npm.com]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white
[npm-url]: https://www.npmjs.com/
[webpack.com]: https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white
[webpack-url]: https://webpack.js.org/
[Redux.com]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[Redux-url]: https://redux.js.org/
[Router.com]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[Router-url]: https://reactrouter.com/en/main
[Javascript.com]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[Javascript-url]: https://www.javascript.com/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[React-Hook-Form-url]: https://react-hook-form.com/
[React-Hook-Form.com]: https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[NextJS-url]: https://nextjs.org/
[Next.JS]: https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white