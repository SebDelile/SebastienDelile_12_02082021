import { MOCKED_DATA } from '../data/MOCKED_DATA.js';
import axios from 'axios';

/**
 * make the call to API or MOCKED_DATA (dependiing on bool) and return the required data as an object
 * @memberof services
 * @param {string} route - the route to get the required data
 * @param {boolean} isFromAPI - true if the call has to be made to the API, false to get the mocked data
 * @returns {object} the required data, corresponding to the specified user in the route. Or an error if it fails
 */
const getData = async (route, isFromAPI = true) => {
  if (isFromAPI) {
    //do a fetch to the API
    const BASE_URL = 'http://localhost:3001';
    try {
      const rawResponse = await axios.get(BASE_URL + route);
      return await rawResponse.data.data;
    } catch (error) {
      return error;
    }
  } else {
    //use the mocked data
    const parsedRoute = route.replace('/user/', '').split('/');
    const userId = parseInt(parsedRoute[0]);
    let module = '';
    switch (parsedRoute[1]) {
      case undefined:
        module = 'userMainData';
        break;
      case 'activity':
        module = 'userActivity';
        break;
      case 'average-sessions':
        module = 'userAverageSessions';
        break;
      case 'performance':
        module = 'userPerformance';
        break;
      default:
        module = 'error';
    }
    const data = MOCKED_DATA[module].find(
      (element) => element.userId === userId
    );
    return data ? data : new Error('Donnée introuvable');
  }
};

export default getData;
