# Byte-to-Bite


## Overview
Don't know what to cook? Byte to Bite is a recipe-matching app where users can input ingredients they have at hand and receive recipes that best match their pantry. 

## Features
   1. User accounts with ability to signup, login, and have information associated with a user
   2. Meaningfully search and filter through recipes after inputting a list of ingredients
   3. Abililty to bookmark recipes that you will easily be able to access from your profile page
   4. Leave reviews on any recipe with a rating of 1-5, as well as an optional comment to accompany it
   5. Users are able to create and upload their own recipes, with any amount of ingredients, diets, and instructions, including an image.
   6. Share recipes through email
      
## Running the App

Perform the following actions on your terminal:

### Clone the repository

`git clone https://github.com/tanisha-ag/Byte-to-Bite`

Alternatively, download zip directly through GitHub and extract it locally.

### Enter the directory

`cd Byte-to-Bite/backend`
### Install the dependencies

`npm i` or `npm install`


### Start the Node.js server

Create a .env file in the backend folder. Inside, add your MongoDB URI and Email details as follows:

   ```ini
   MONGO_URI=mongodb+srv://cs35l:nebneb123@byte-to-bites.0cxe3.mongodb.net/?retryWrites=true&w=majority&appName=byte-to-bites
   EMAIL_USER="YOUR_EMAIL_USER_HERE"
   EMAIL_USERNAME="YOUR_EMAIL_USERNAME_HERE"
   EMAIL_PASS="YOUR_EMAIL_PASSWORD_HERE"
```

Afterwards, to run the backend:

`node server.js`

### Start the webpage

In a separate terminal, go back to the parent directory:

`cd Byte-to-Bite`

Install the dependencies

`npm i` or `npm install`

Then, to run the frontend:

`npx vite`

Now you can view the webpage via the generated link.

## Authors

Andrea Asprer, Benjamin Avalos, Diana Chu, Matthew Lee, Tanisha Aggarwal

