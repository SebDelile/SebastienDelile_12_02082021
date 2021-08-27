const processData = (data, keyword) => {
  const processor = {
    activityToBarChart: (data) =>
      data.sessions.map((session) => ({
        x: new Date(session.day).getDate(),
        y: [session.kilogram, session.calories],
      })),
    averageSessionsToLineChart: (data) =>
      data.sessions.map((session) => {
        return {
          x: session.day,
          y: session.sessionLength,
        };
      }),
    performanceToRadarChart: (data) =>
      data.data.map((item) => ({
        key: item.kind,
        value: item.value,
      })),
    todayScoreToRadiaBarChart: (data) => (data > 1 ? 1 : data),
  };
  return processor[keyword](data) ?? data;
};

export default processData;
