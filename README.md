# Computer Parts Store (Admin Page)

## About

This repository is the backend half of a 2-part project for a fictional computer parts online store. I have used NodeJS with Express, VanillaJS with EJS Templating, Mongo DB, and TailwindCSS to create a management interface for store.

Users have to authenticate with a Google account to view the backend, and once authenticated, they have the ability to add, manage, and remove products and categories and track order information.

### Please Note

I am aware that the Google ClientID and Client Secret are visible in the code and that this is typically frowned upon. This is currently required to function and for the purposes of this project will remain as part of code. I would like to continue with this project after class ends and will likely move this over to a hosting service so that I can hide the ENV file and make it easier for anyone to view this in the future.

## 🛠 To run locally:

1. Clone this repository using your Terminal (Mac and Linux) or Command Prompt (Windows).

```sh
   git clone https://github.com/DakotaRileyMedia/computer-parts-store-admin.git
```

2. Install the LTS version of NodeJS for your machine at https://nodejs.org/en.

3. Once NodeJS has installed, exit your Terminal or Command Prompt so the NodeJS CLI can start to work.

4. Reopen your Terminal or Command Prompt and use it to move into the directory with the product. Replace ## "path" ## with the path where you cloned the project.

```sh
   cd "path"/computer-parts-store-admin/
```

5. Once inside of the directory, we need to install all of our node pagages using npm.

```sh
   npm install
```

6. To start the project, use npm to start the webserver.

```sh
   npm start
```

7. Now that our webserver has started running, go to your browser and type http://localhost:3000/ in the address bar to visit the project.
