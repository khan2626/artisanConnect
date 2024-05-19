//import { MongoClient } from 'mongodb';
const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;


class DBClient {
 constructor() {
   MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
     if (err) {
       console.log(err);
       this.connected = false;
     } else {
       this.client = client.db(DB_DATABASE);
       this.users = this.client.collection('users');
       this.projects = this.client.collection('projects');
       this.artisans = this.client.collection('artisans');
       this.reviews = this.client.collection('reviews');
       this.connected = true;
     }
   });
 }


 isAlive() {
   return Boolean(this.connected);
 }


 async nbUsers() {
   const count = await this.users.countDocuments();
   return count;
 }


 async nbProjects() {
   const count = await this.projects.countDocuments();
   return count;
 }
}


const dbClient = new DBClient();
export default dbClient;