const fetch = require("node-fetch");
const userController = {};
const db = require("../index.js");

userController.login = (req, res, next) => {
  const user = [req.body.username];
  const password = req.body.password;

  const text = `SELECT * FROM users WHERE username = $1`;

  db.query(text, user, (err, data) => {
    if (err) {
      console.log(err);
      res.locals.badPassword = true;
      return next();
    }


    console.log("data from postgres: ", data.rows[0].password);

    if (data.rows[0].password !== password) {
      console.log('password did not match');
      res.locals.badPassword = true;
      return next();
    } else {
      res.locals.user = data.rows[0];
      console.log(res.locals, "this is locals inside login middleware");
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
  const name = req.body.name;
  const user = req.body.username;
  const password = req.body.password;

  console.log("expresscreate user: ", user);
  console.log("expresscreate pass: ", password);

  const text = `INSERT INTO users (name, username, password) VALUES ($1, $2, $3)`;
  const values = [name, user, password];

  db.query(text, values)
    .then(response => {
      console.log("res in login: ", response);
      res.locals.user = response.rows;
      return next();
    })
    .catch(err => {
      console.log("Error: ", err);
      return next(err);
    });
};

userController.addCampground = (req, res, next) => {
  // this is where we want to add the campground;
};

/*
this addFav functionality has yet to be implemented. unsure of whether or not this middleware 
will work with the way iteration teams will end up sending fav data back to the server. be sure to send 
back userId when calling addFavs.
*/
userController.addFav = (req, res, next) => {
  // const user = req.body.user;
  // const campground = req.body.campground;
  console.log(req.body, "THIS IS REQ BODY COMING FROM POST");

  // this is where we want to add favorites, make sure to extra from body
  const text = `INSERT INTO favorites (camp_id, user_id) VALUES ($1, $2)`;
  const values = [req.body.user_id, req.body.camp_id];

  db.query(text, values)
    .then(response => {
      // grabbing the response and then adding it to res locals favorites
      res.locals.favorites = response;
      return next();
    })
    .catch(err => {
      console.log("Error: from adding favorites", err);
      return next(err);
    });
};

userController.addCampFav = (req, res, next) => {
  console.log(req.body, "REQ BODY SUCCESSFUL FOR CAMPFAV");

  // this is where we want to add favorites, make sure to extra from body
  const text = `INSERT INTO camps (name, pets, sewer, water, waterfront, long, lat) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  const values = [req.body.name, req.body.pets, req.body.sewer, req.body.water, req.body.waterfront, req.body.long, req.body.lat];

  db.query(text, values)
    .then(response => {
      // grabbing the response and then adding it to res locals favorites
      res.locals.favoriteCamps = response;
      return next();
    })
    .catch(err => {
      console.log('Error: from adding campfavs', err);
      return next(err);
    });
}

// Users table & Favs table will stay the same

userController.getFav = (req, res, next) => {

  console.log(req.params, "THIS IS REQ PARAMS");
  const value  = [req.params.id] ;

  const text = `SELECT c.* FROM camps c INNER JOIN favorites f ON c.id = f.camp_id WHERE f.user_id = $1`;
// we're requesting data from the req body

  db.query(text, value)
    .then(response => {
      res.locals.user = response.rows;
      return next();
    })
    .catch(err => {
      console.log("Error: from GETTING FAVORITES", err);
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
      console.log("Error: ", err);
      return next(err);
    });
};

module.exports = userController;
