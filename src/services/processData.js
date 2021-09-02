/**
 * group the data processing method to convert raw data into chart suitable data
 * note that the class is exported as an instance
 * @memberof services
 * @hideconstructor
 */
class ProcessData {
  /**
   * transform raw activity data into suitable barchart data
   * @param {object} data - the data obtined from API
   * @returns {array} - the data to inject as dataset prop of the barchart
   */
  activityToBarChart = (data) =>
    data.sessions.map((session) => ({
      x: new Date(session.day).getDate(),
      y: [session.kilogram, session.calories],
    }));

  /**
   * transform raw average sessions data into suitable linechart data
   * @param {object} data - the data obtined from API
   * @returns {array} - the data to inject as dataset prop of the linechart
   */
  averageSessionsToLineChart = (data) =>
    data.sessions.map((session) => {
      return {
        x: session.day,
        y: session.sessionLength,
      };
    });

  /**
   * transform raw performance data into suitable radarchart data
   * @param {object} data - the data obtined from API
   * @returns {array} - the data to inject as dataset prop of the radarchart
   */
  performanceToRadarChart = (data) =>
    data.data.map((item) => ({
      key: item.kind,
      value: item.value,
    }));

  /**
   * transform raw todayscore data into suitable radialbarchart data
   * @param {number} data - the data obtined from API
   * @returns {number} - the data to inject as dataset prop of the radialbarchart
   */
  todayScoreToRadiaBarChart = (data) => (data > 1 ? 1 : data);
}

export default new ProcessData();
