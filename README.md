![Stackoverflow-Clone-Backend](https://socialify.git.ci/Mayank0255/Stackoverflow-Clone-Backend/image?font=Source%20Code%20Pro&forks=1&issues=1&language=1&owner=1&pattern=Charlie%20Brown&pulls=1&stargazers=1&theme=Dark)

[![Version](https://img.shields.io/static/v1?label=version&message=2.0.0&color=blue)](https://shields.io/)
[![NPM](https://img.shields.io/static/v1?label=npm&message=6.8.5&color=blue)](https://shields.io/)
[![NODE](https://img.shields.io/static/v1?label=node&message=10.12.8&color=success)](https://shields.io/)
[![MYSQL](https://img.shields.io/static/v1?label=mysql&message=8.0.10&color=blueviolet)](https://shields.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://shields.io/)

__[Demo Video](https://www.youtube.com/watch?v=3jDIEf5vNp8)__

As the name suggests, this project is a clone of a famous Q/A website for professional and enthusiast programmers built solely by me using a completely different stack.

This repo consists of the Backend code of the project, the backend code is in [Stackoverflow-Clone-Frontend](https://github.com/Mayank0255/Stackoverflow-Clone-Frontend)

## My Tech Stack (MERN)

#### Front-end
* Front-end Framework: `React.js (with Redux)`
* Styling: `SASS` and `BOOTSTRAP`

#### Back-end
* For handling server requests: `Node.js with Express.js Framework`
* As Database: `MySQL`
* API tested using: `POSTMAN`

### Original Tech Stack
* For handling server requests: `C#`
* As Database: `Microsoft SQL Server`
* `.NET` as well

## Contributing
* Go to [Contributing.md](./CONTRIBUTING.md)

## Guidelines to setup

There are two ways to setup the project: manually or using the Dockerfile. Read below for more details:
### Manual Setup
1. Open your local CLI -

    ```
    mkdir Stackoverflow-Clone
    cd Stackoverflow-Clone
    ```
2. Setup the backend code -

    - Create a `.env` file and the format should be as given in `.env.example`.
    - Clone the code & install the modules-
   
        ```
        git clone https://github.com/Mayank0255/Stackoverflow-Clone-Backend.git
        cd Stackoverflow-Clone-Backend

        npm install
        ```
    - Open your MySQL Client -
    
        ```
        source ./data/databaseConfig.sql
        source ./data/seed.sql
        ```
    - Run the server `npm run server`.
3. Open a new CLI terminal and goto the root `Stackoverflow-Clone` folder you created in the first step.
4. Setup the Frontend code -

    - Clone the code & install the modules-
    
        ```
        git clone https://github.com/Mayank0255/Stackoverflow-Clone-Frontend.git
        cd Stackoverflow-Clone-Frontend
        
        npm install
        ```
    - Run the client server `npm start`.
### Docker Setup

The back-end has support for Docker. So if you want to run the back-end in a container, you need do:

- Setup environment variables in `.env` file.
- Build the Docker image:
    
    ```
    docker build -t stackoverflowclone .
    ```
- Run the container. For example, if you want to run the container in a new terminal, you can do:
    
    ```
    docker run -p -d 3000:5000 stackoverflowclone
    ```

The default port of api is 5000. After running the container, you can access the api by typing:
        
    http://localhost:3000/api/<endpoint that you request - see next section>

_Follow the steps properly (manual or Docker) and you are good to go._
## API Endpoints

#### Base Url - `http://localhost:5000/api`

#### Users
* `GET /auth`
* `POST /auth`
* `POST /users/:id`
* `GET /users`
* `GET /users/:id`

#### Posts
* `GET /posts`
* `GET /posts/top`
* `GET /posts/tag/:tagname`
* `GET /posts/:id`
* `POST /posts/`
* `DELETE /posts/:id`

#### Answers
* `GET /posts/answers/:id`
* `POST /posts/answers/:id`
* `DELETE /posts/answers/:id`

#### Comments
* `GET /posts/comments/:id`
* `POST /posts/comments/:id`
* `DELETE /posts/comments/:id`

#### Tags
* `GET /tags`
* `GET /tags/:tag_name`

## Future Scope
* Setup `Sequelize` with `MySQL` in the `API`.
* Deploy the database to cloud, API, and client-side.

## DEMO

#### VIDEO - [Watch the video](https://www.youtube.com/watch?v=3jDIEf5vNp8)
 _Video Last Updated on 22nd March, 2020_
  
#### IMAGES
<img src="/demo/images/1.png" width=340px /><img src="/demo/images/2.png" width=340px />
<img src="/demo/images/3.png" width=340px /><img src="/demo/images/4.png" width=340px />
<img src="/demo/images/5.png" width=340px /><img src="/demo/images/6.png" width=340px />
