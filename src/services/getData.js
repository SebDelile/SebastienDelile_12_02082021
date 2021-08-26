import axios from 'axios';
import getDataFromMock from './getDataFromMock';

/**
 * make the call to API or MOCKED_DATA (depending on route) and return the required data as an object
 * @memberof services
 * @param {string} route - the route to get the required data, if it contains "-data-from-mock" then the call is done to the mocked data
 * @returns {object} the required data, corresponding to the specified user in the route. Or an error if it fails
 */
const getData = async (route) => {
  if (route.includes('-data-from-mock')) {
    return getDataFromMock(route);
  } else {
    //do a fetch to the API
    const BASE_URL = 'http://localhost:3001';
    try {
      const rawResponse = await axios.get(BASE_URL + route);
      return await rawResponse.data.data;
    } catch (error) {
      return error;
    }
  }
};

export default getData;
