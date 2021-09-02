import { MOCKED_DATA } from '../data/MOCKED_DATA.js';

/**
 * fetch the data from the Mock and return an array containing the fetched data
 * @memberof services
 * @param {string} userId - the ID of the user for who the data are needed
 * @returns {array} - the array containing the fetched data or error objects
 */
const getDataFromMock = (userId) => {
  /**
   * search the data of the required user in the corresponding key of MOCKED_DATA
   * @param {string} key - the key where to find the data
   * @returns {object} - the data object or an error object
   */
  const dataExtractor = (key) => {
    try {
      const data =
        MOCKED_DATA[key].find((element) => element.userId === +userId) ??
        new Error('Data not found');
      return { value: data };
    } catch {
      return new Error('Data not found');
    }
  };

  return [
    dataExtractor('userMainData'),
    dataExtractor('userActivity'),
    dataExtractor('userAverageSessions'),
    dataExtractor('userPerformance'),
  ];
};

export default getDataFromMock;
