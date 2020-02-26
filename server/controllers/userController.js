const fetch = require('node-fetch');
const userController = {};
const db = require('../index.js');

userController.login = (req, res, next) => {
  const user = [req.body.username];
  const password = req.body.password;

  const text = `SELECT * FROM users WHERE username = $1`;

  db.query(text, user, (err, data) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    console.log('data from postgres: ', data.rows[0].password);

    if (data.rows[0].password !== password) {
      console.log('password did not match');
      return next(err);
    } else {
      res.locals.user = data.rows[0];
      console.log(res.locals, 'this is locals inside login middleware');
      return next();
    }
  });
};

userController.deleteUser = (req, res, next) => {
  const user = JSON.stringify(req.body.username);

  const text = `DELETE FROM users WHERE username = $1`;
  const value = [user];

  db.query(text, value, (err, data) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      if (!data) {
        return next(err);
      }
      return next();
    }
  });
};

userController.createUser = (req, res, next) => {
  const user = req.body.username;
  const password = req.body.password;

  console.log('expresscreate user: ', user);
  console.log('expresscreate pass: ', password);

  const text = `INSERT INTO users (username, password, loggedin) VALUES ($1, $2, $3)`;
  const values = [user, password, true];

  db.query(text, values)
    .then(response => {
      console.log('res in login: ', response);
      res.locals.user = response.rows;
      return next();
    })
    .catch(err => {
      console.log('Error: ', err);
      return next(err);
    });
};

userController.addCampground = (req, res, next) => {};

/*
this addFav functionality has yet to be implemented. unsure of whether or not this middleware 
will work with the way iteration teams will end up sending fav data back to the server. be sure to send 
back userId when calling addFavs.
*/
userController.addFav = (req, res, next) => {
  const user = req.body.username;
  const campground = req.body.campground;

  const text = `INSERT INTO favorites (Campground_id, user_id) VALUES ($1,$2)`;
  const values = [campground, user];

  db.query(text, values)
    .then(response => {
      return next();
    })
    .catch(err => {
      console.log('Error: ', err);
      return next(err);
    });
};

userController.getFav = (req, res, next) => {
  const user = req.body.username;

  const text = `SELECT * FROM campground WHERE campground_id in
  (
  select campground_id from favorites where user_id = $1
  )`;

  const value = [user];

  db.query(text, value)
    .then(response => {
      res.locals.user = response.rows;
      return next();
    })
    .catch(err => {
      console.log('Error: ', err);
      return next(err);
    });
};

userController.deleteFav = (req, res, next) => {
  const user = JSON.stringify(req.body.username);
  const campground = JSON.stringify(req.body.campground);
  const text = `DELETE FROM favorites
  WHERE campground_id = $1 AND user_id = $2`;
  const values = [campground, user];
  db.query(text, values)
    .then(response => {
      return next();
    })
    .catch(err => {
      console.log('Error: ', err);
      return next(err);
    });
};

module.exports = userController;
