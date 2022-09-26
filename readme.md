<p align="center">
  <img  src="https://img.icons8.com/external-flat-satawat-anukul/344/external-newmedia-new-media-flat-flat-satawat-anukul-56.png">
</p>
<h1 align="center">
  Projeto 21 - Sing me a Song
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e" height="30px"/>
  <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" height="30px"/>
</div>

<br/>

# Description

Sing me a Song is a simple project to share video recommendations on youtube.

</br>

## Features

-   Share video recommendations
-   Vote in recommendations
-   List top recommendations
-   Get random recommendations

</br>

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file (see .env.example).

On .env file (front-end folder):

`REACT_APP_API_BASE_URL = http://localhost:5000`

On .env file (back-end folder)

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

On .env.test file (back-end folder):

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/TestDatabaseName`

`ENVIRONMENT=tests`

</br>

## Test Locally

Clone the project

```bash (for SSH)
  git clone git@github.com:danton03/projeto21-singmeasong.git
```

or

```bash (for HTTPS)
  git clone https://github.com/danton03/projeto21-singmeasong.git
```

Go to the project directory

```bash
  cd projeto21-singmeasong
```

Install dependencies

Go to the back-end directory

```bash
  cd back-end
```

```bash
  npm install
```

Create database
```bash
  npx prisma migrate dev
```

To run integration tests

```bash
  npm run test:integration
```

To run unit tests

```bash
  npm run test:unit
```

To run E2E tests:

You will need 3 terminal tabs open. One to start the back-end server, one to start the front-end server and one to start Cypress.

Go to the back-end directory and start the server

```bash
  npm run dev
```

Go to the front-end directory and start the server

```bash
  npm start
```

Go to the front-end directory and open the Cypress

```bash
  npx cypress open
```

On the welcome screen select "E2E testing"
<p align="center">
  <img  src="./assets/WelcomePage.png" width=700px>
</p>

Choose your preferred browser and click on "start testing in _your_browser_name_"
<p align="center">
  <img  src="./assets/Choose_a_Browser.png" width=700px>
</p>

Finally, start the desired test.
<p align="center">
  <img  src="./assets/SelectTest.png" width=700px>
</p>

</br>

## Acknowledgements

-   [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)
-   [Markdown Badges](https://ileriayo.github.io/markdown-badges/)
-   [Newmedia - satawat-anukul on icons8](https://icons8.com.br/icons/set/videosharing")

</br>

## Authors

-   Danton Matheus is a Full Stack Web Development student at Driven Education and engineering academic passionate about technology. 

<br/>

#