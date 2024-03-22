# Visitor Form

# What Does It Do?

### `Problem`
Using information cards to keep track of visitors, and asking them to fill them out before leaving.

<br/>

### `Solution`
With this visitor Form:

- No more paper visitor cards.
- Provide an easy interface for the visitor to enter their information.
- Store this information in a database for future use and easier storage.
- Receive an email anytime a visitor form is filled out.
 
<br/>
<br/>

# Features

### `Landing Page`
Contains the church logo, and a button to go to the form.

<br/>

### `Thank You Page`
Contains some text, thanking the user for submitting the form and assuring the visitor that someone will reach out to them in the future.  Two buttons are displayed to take the visitor to the Facebook page or website to see any upcoming events.


<br/>
<br/>

# Getting Started
<br/>

### `Node`
You will need to have node.js installed on your local system.  You can do this by following the directions listed [here](https://nodejs.org/en/).

<br/> 

### `Dependencies` 
Once Node is installed.  In the project directory , you will need to install all of the package.json dependencies, this can be done by running. 

    npm install

<br/>

### `Change Directory`
You will need to enter into the correct directory in your terminal.

    cd my-app

Open another terminal and cd into the root of the project.

    cd VisitorForm

<br/>

### `Development Mode` 
The development mode will run on [http://localhost:3000](http://localhost:3000).  Development mode can be started by running the command.  (Keep in mind, the app will run completely in development mode, as most of it relies on being connected to the server).

    npm run start

(Keep in mind, app won't run completely in development mode, as some of the functionality of the page relies on the server).

<br/>

### `Production Mode`
The server will run on [localhost:4900](localhost:4900).  The entire application can be ran locally by entering the following commands.
    - In the client terminal run the command:

    npm run build

    -  In the root terminal run the commands:

    npm run build
    npm run start
<br/>
<br/>

# Dependencies

- React
- Node
- Express
- DotEnv
- Cors
- Font Awesome
- TailwindCSS
- Typescript
- Mysql
- Handlebars
- nodemailer-express-handlebars
- nodemon

<br/>
<br/>

#  Summary
This application was created largely for my church.  We needed to update and get away from using pen and paper for keeping track of our visitors.

If you would like to have any features added or if you would like to add any, just shoot me a message or a pull request.  Thanks for checking out my visitor form.