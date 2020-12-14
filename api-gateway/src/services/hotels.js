const fetch = require('universal-fetch');
const { hotelServiceUrl } = require('../config');

module.exports = async () => {
  return fetch(`${hotelServiceUrl}/hotels`)
    .then((response) => {
      if (response.status === 500) {
        return new Error(
          'Could not connect to the database, please try again later.',
        );
      }
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((err) => console.log(err));
};
