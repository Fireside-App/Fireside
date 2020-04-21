const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post(
  '/login',
  userController.login,
  /*userController.getFav,*/ (req, res) => {
    console.log('outside of login middleware');
    res.status(200).json(res.locals);
  }
);

router.post('/signup', userController.createUser, (req, res) => {
  res.status(200).json(res.locals);
});

// router.get('/favorite', userController.getFav, (req, res) => {
//     res.status(200).json()
// });
// we use router.use for a general case

// this is old code
// router.post('/favorite', userController.addCampground, userController.addFav, (req, res) => {
//     res.status(200).json()
// });
router.post(
  '/favorites',
  userController.addCampFav,
  userController.addFav,
  (req, res, next) => {
    console.log('RESPONSE OKAY');
    const newBody = [res.locals.campFavorites, res.locals.favorites];

    // res.status(200).json(newBody);
    res.status(200).json(newBody);
  }
);

router.get('/favorites/:id', userController.getFav, (req, res, next) => {
  res.status(200).json(res.locals);
});

router.delete('/deleteuser', userController.deleteUser, (req, res) => {
  res.status(200).json();
});

module.exports = router;
