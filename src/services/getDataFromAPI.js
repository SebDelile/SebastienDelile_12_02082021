import axios from 'axios';

/**
 * fetch the data from the API and return an array containing the fetched data
 * @memberof services
 * @param {string} userId - the ID of the user for who the data are needed
 * @returns {array} - the array containing the fetched data or error objects
 */
const getDataFromAPI = async (userId) => {
  const BASE_URL = 'http://localhost:3001';

  /**
   * the method to do the API call and manage result/error
   * @param {string} route - the endpoint of the API
   * @returns {object} - the data object or an error object
   */
  const axiosGet = async (route) => {
    try {
      const rawResponse = await axios.get(BASE_URL + route);
      return await rawResponse.data.data;
    } catch {
      return new Error('Data not found');
    }
  };

  return await Promise.allSettled([
    axiosGet(`/user/${userId}`),
    axiosGet(`/user/${userId}/activity`),
    axiosGet(`/user/${userId}/average-sessions`),
    axiosGet(`/user/${userId}/performance`),
  ]);
};

export default getDataFromAPI;
