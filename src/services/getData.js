import { MOCKED_DATA } from '../data/MOCKED_DATA.js';

export function getData(route, isFromAPI = true) {
  if (isFromAPI) {
    //do a fetch to the API
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
      (element) => element.userId === userId || element.id === userId
    );
    return data ? data : new Error('Donnée introuvable');
  }
}
