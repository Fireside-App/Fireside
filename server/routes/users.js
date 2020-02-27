const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post(
  '/login',
  userController.login,
  /*userController.getFav,*/ (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.post('/signup', userController.createUser, (req, res) => {
  res.status(200).json(res.locals);
});

////////// FAVORITES ROUTES /////////////////////

/* when user clicks on the 'Favorite' button on the search results page
adds the user_id and a camp_id to favorites, then adds all of the camp data to camps (unique table)*/
router.post(
  '/favorites',
  userController.addCampFav,
  userController.addFav,
  (req, res, next) => {
    const newBody = [res.locals.campFavorites, res.locals.favorites];
    res.status(200).json(newBody);
  }
);

// retrieves all of the logged in user's favorite camps upon successful login
router.get('/favorites/:id', userController.getFav, (req, res, next) => {
  res.status(200).json(res.locals);
});

// NOT IN USE
router.delete('/deleteuser', userController.deleteUser, (req, res) => {
  res.status(200).json();
});

module.exports = router;
