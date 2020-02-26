const fs = require("fs");
const path = require("path");
const axios = require("axios");
const parseString = require("xml2js").parseString;

require("dotenv").config();

const campController = {};

campController.query = (req, res, next) => {
  console.log("entered campcontrollerquery");
  const { pet, waterFront, waterHook, sewerHook, state } = req.body;

  //this logic builds our api query string based upon the parameters passed back
  //to the server by our React App query page.

  let apiString = "http://api.amp.active.com/camping/campgrounds?pstate=";

  apiString += state;

  if (pet === true) {
    apiString += "&pets=3010";
  }
  if (sewerHook == true) {
    apiString += "&sewer=3007";
  }
  if (waterHook === true) {
    apiString += "&water=3007";
  }
  if (waterFront === true) {
    apiString += "&waterfront=3011";
  }
  apiString += "&api_key=";
  // console.log(apiString);

  const campOptions = {

    url: (apiString += process.env.CAMPGROUND_KEY),
    method: "GET",
// =======
//     url: apiString  += '7zfwzuqf57fwnbv3sdkgc66j',
//     method: 'GET',

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8"
    }
  };

  axios(campOptions)
    .then(response => {
      // this logic parses our XML response into JSON for use by the front end.
      // res.locals.campground is set to an array of objects matching our query parameters
      const stringRes = response.data;
      let superParse;
      parseString(stringRes, function(err, result) {
        superParse = result.resultset.result;
      });

      // fs.writeFileSync(
      //   path.resolve(__dirname, "../database/camp.json"),
      //   JSON.stringify(superParse)
      // );

      let arrData = superParse.map(curr => curr["$"]);
      // res.locals.campgrounds = arrData;

      if (pet) {
        arrData = arrData.filter(curr => curr.sitesWithPetsAllowed === "Y");
      }
      if (sewerHook) {
        arrData = arrData.filter(curr => curr.sitesWithSewerHookup === "Y");
      }
      if (waterHook) {
        arrData = arrData.filter(curr => curr.sitesWithWaterHookup === "Y");
      }
      if (waterFront) {
        arrData = arrData.filter(curr => curr.sitesWithWaterfront !== "");
      }
      console.log("arrData: ", arrData);

      res.locals.campgrounds = arrData;
      return next();
    })
    .catch(err => {
      return next(err);
    });
  // .catch(err => console.log("camp controller : axios fetch error: ", err));
};

module.exports = campController;
