# CMS for NYC State Park Touchscreen Kiosks

A CMS build with MongoDB, Express, Vue, Node. (Note: This project is ongoing)

### Prepare Database
Before running the website, you need to prepare mongoDB on your local or cloud.
Create a new collection and rewrite the DB's URL in the prod/routes/data.js or dev/routes/data.js with yours.
And import the sample documents to your DB from the csv files under db/.
Then make sure to run the mongoDB on your computer if you use mongoDB locally.

```sh
$ brew services start mongodb
```

### Installation

For production environment

```sh
$ cd prod
$ npm install
$ npm start
```

For development environment

```sh
$ cd dev
$ npm install
$ cd backend
$ npm start
$ cd frontend
$ npm run dev
```
