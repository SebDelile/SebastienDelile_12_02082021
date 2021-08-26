import { MOCKED_DATA } from '../data/MOCKED_DATA.js';
import axios from 'axios';

/**
 * make the call to API or MOCKED_DATA (depending on route) and return the required data as an object
 * @memberof services
 * @param {string} route - the route to get the required data
 * @returns {object} the required data, corresponding to the specified user in the route. Or an error if it fails
 */
const getData = async (route) => {
  const [userId, category] = route.replace('/user/', '').split('/');
  if (userId.includes('mock')) {
    //use the mocked data
    const parsedUserId = parseInt(userId.replace('mock', ''));
    let module = '';
    switch (category) {
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
    const data = MOCKED_DATA[module]
      ? MOCKED_DATA[module].find((element) => element.userId === parsedUserId)
      : null;
    return data ? data : new Error('Donnée introuvable');
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
