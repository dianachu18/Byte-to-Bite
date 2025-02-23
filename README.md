# Byte-to-Bite

## Running the App

Perform the following actions on your terminal:

### Clone the repository

`git clone https://github.com/tanisha-ag/Byte-to-Bite`

Alternatively, download zip directly through GitHub and extract it locally.

### Enter the directory

`cd Byte-to-Bite`

### Install the dependencies

`npm i` or `npm install`


### Start the Node.js server

`cd backend`

Create a .env file in the backend folder. Inside, add your [spoonacular API](https://spoonacular.com/food-api) key and the MongoDB URI as follows:

   ```ini
   MONGO_URI="YOUR_URI_HERE"
   SPOONACULAR_API_KEY="YOUR_API_KEY_HERE"
```

Afterwards, to run the backend:

`node server.js`
