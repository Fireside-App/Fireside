const { Pool } = require('pg');
const PG_URI = require('./PG_URI.js'); 
// if you'd like to test this app on your own, you'll need to provide a PG_URI from a SQL database provider like ElephantSQL

const pool = new Pool({
  connectionString: PG_URI
});
// Adding some notes about the database here will be helpful for future you or other developers.
// Schema for the database can be found below:
// https://github.com/CodesmithLLC/unit-10SB-databases/blob/master/docs/images/schema.png?raw=true
// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
