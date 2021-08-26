import { MOCKED_DATA } from '../data/MOCKED_DATA.js';

/**
 * the method to get the data from the mock
 * @memberof services
 * @param {string} route - the route to get the required data, it contains "-data-from-mock" to be removed to convert as real world route
 * @returns {object} the required data, corresponding to the specified user in the route. Or an error if it fails
 */
const getDataFromMock = (route) => {
  const [userId, category] = route
    .replace('/user/', '')
    .replace('-data-from-mock', '')
    .split('/');
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
    ? MOCKED_DATA[module].find((element) => element.userId === +userId)
    : null;
  return data ? data : new Error('Donnée introuvable');
};

export default getDataFromMock;
