## Task Management Application

Task management build with laravel and react

### Demo

[Deployed on Heroku](https://guarded-depths-03538.herokuapp.com/)

### Built using

* Laravel
* React
* Postgre SQL


## Features

- Authentication 
- Register, with own tenant. Multitenancy supported
- CRUD projects
- CRUD task, with title, description, type, priority, and status
- Sort projects/bugs by various parameters like type, priority, status

## Screenshots


![Desktop-1](https://github.com/fahrurben/taskman-react/blob/master/screenshots/desktop-1.png)
![Desktop-2](https://github.com/fahrurben/taskman-react/blob/master/screenshots/desktop-2.png)
![Desktop-3](https://github.com/fahrurben/taskman-react/blob/master/screenshots/desktop-3.png)
![Desktop-4](https://github.com/fahrurben/taskman-react/blob/master/screenshots/desktop-4.png)
![Desktop-5](https://github.com/fahrurben/taskman-react/blob/master/screenshots/desktop-5.png)
![Desktop-5](https://github.com/fahrurben/taskman-react/blob/master/screenshots/desktop-6.png)

## Usage

#### Env variable:

Create a .env file in server directory and add the following:

```
REACT_APP_API_BASE_URL={backend_url}

```

Run development server:

```
npm install
npm run start
```