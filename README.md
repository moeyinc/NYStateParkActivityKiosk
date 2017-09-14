# CMS for NYC State Park Touchscreen Kiosks

A CMS build with MongoDB, Express, Vue, Node. (Note: This project is ongoing)

### Prepare Database
Before running the website, you need to prepare mongoDB on your local or cloud.
Create a new collection and rewrite the DB's URL in the prod/routes/data.js or dev/routes/data.js with yours.
And import some of the sample documents to your DB from the json files under db/ with mongoimport command.
```sh
$ brew services start mongodb
$ mongoimport --db [your db name] --collection general_settings --file general_settings.json
$ mongoimport --db [your db name] --collection activities --file activities.json
$ mongoimport --db [your db name] --collection media --file media.json
```

### Installation

For production environment, just npm start to run the server program.
Frontend files are stored under public/.

```sh
$ cd prod
$ npm install
$ npm start
```

For development environment, you need to run both server program that hosts db and frontend program with help from webpack.
If you updated dev code, you'll need to do 'npm build' and copy and paste the generated files to the public folder in the prod.

```sh
$ cd dev
$ npm install
$ cd backend
$ npm start
$ cd frontend
$ npm run dev
```
