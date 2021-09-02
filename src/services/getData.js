import getDataFromAPI from './getDataFromAPI';
import getDataFromMock from './getDataFromMock';

/**
 * make the call to API and return the required data as an object or an error if it fails. Use an array as input to be sure that Promise.allSettled() will return results in an array with the same order
 * @memberof services
 * @param {string} userId - the ID of the user for who the data are needed
 * @returns {object} the required data, corresponding to the specified user. Or an error if it fails
 */
const getData = async (userId) => {
  const fetchedData = userId.includes('-data-from-mock')
    ? getDataFromMock(userId.replace('-data-from-mock', ''))
    : await getDataFromAPI(userId);
  if (!fetchedData || fetchedData.every((data) => data.value instanceof Error))
    return new Error('Data not found');
  else {
    const [mainData, activity, averageSessions, performance] = fetchedData.map(
      (data) => data.value
    );
    const response = {
      greetings: mainData.userInfos,
      activity: activity,
      averageSessions: averageSessions,
      performance: performance,
      todayScore: mainData.todayScore,
      keyData: mainData.keyData,
    };
    Object.keys(response).forEach((key) => {
      if (response[key] === undefined)
        response[key] = new Error('Data not found');
    });
    return response;
  }
};

export default getData;
