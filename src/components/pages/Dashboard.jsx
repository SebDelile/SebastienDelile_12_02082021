import { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import Greetings from '../dashboard_sections/Greetings.jsx';
import Activity from '../dashboard_sections/Activity';
import AverageSessions from '../dashboard_sections/AverageSessions';
import Performance from '../dashboard_sections/Performance';
import TodayScore from '../dashboard_sections/TodayScore';
import KeyData from '../dashboard_sections/KeyData';
import getData from '../../services/getData.js';
import isObjectEmpty from '../../utils/isObjectEmpty.js';
import propTypes from 'prop-types';

/**
 * Render the Dahsboard page
 * @memberof pages
 * @extends Component
 * @param {object} state - the state of the component
 * @param {object} props
 * @param {string} props.match.params.id - contains the id of the user passed as parameter to the url
 * @param {object} state.infos - the infos of the user fetched from the API
 * @param {object} state.activity - the activity data of the user fetched from the API
 * @param {object} state.averageSessions - the average sessions data of the user fetched from the API
 * @param {object} state.performance - the performance data of the user fetched from the API
 * @param {object} state.todayScore - the today's score value of the user fetched from the API
 * @param {object} state.keyData - the key data of the user fetched from the API
 */
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infos: {},
      activity: {},
      averageSessions: {},
      performance: {},
      todayScore: {},
      keyData: {},
    };
  }

  /**
   * Launch the fetches to get the data from API or from the mock (dépending on isFromAPI boolean), then set the obtained object to the state
   */
  async componentDidMount() {
    const userId = this.props.match.params.userId;
    const mainData = await getData(`/user/${userId}`);
    const activity = await getData(`/user/${userId}/activity`);
    const averageSessions = await getData(`/user/${userId}/average-sessions`);
    const performance = await getData(`/user/${userId}/performance`);
    this.setState({
      infos: mainData.userInfos,
      activity: activity,
      averageSessions: averageSessions,
      performance: performance,
      todayScore: { value: mainData.todayScore },
      keyData: mainData.keyData,
    });
  }

  /**
   * Render the component. contain a condition to render only when data are available and not error
   * @returns {Reactnode} jsx to be injected in the html
   */
  render() {
    const isDataNotReady = isObjectEmpty(this.state.infos);
    const isDataError = this.state.infos instanceof Error;
    if (isDataNotReady) return <LoadingSpinner />;
    else if (isDataError) return <Redirect to="/errorpage" />;
    else
      return (
        <Container>
          <Greetings data={this.state.infos} />
          <Activity data={this.state.activity} />
          <AverageSessions data={this.state.averageSessions} />
          <Performance data={this.state.performance} />
          <TodayScore data={this.state.todayScore} />
          <KeyData data={this.state.keyData} />
        </Container>
      );
  }
}

/**
 * The propTypes for the Dashboard component
 * @memberof Dashboard
 */
Dashboard.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      userId: propTypes.string,
    }),
  }).isRequired,
};

/**
 * The style for the Container part of the Dashboard component
 * @memberof Dashboard
 */
const Container = styled.main`
  width: calc(100% - var(--nav-left-width));
  flex: 1;
  align-self: flex-end;
  padding: 2rem var(--main-padding);
  display: grid;
  grid-template-areas:
    'greetings greetings greetings greetings'
    'activity activity activity key-data'
    'average-sessions performance average-score key-data';
  grid-template-columns: repeat(4, 1fr);
  justify-items: stretch;
  align-items: stretch;
  gap: 1rem;

  @media only screen and (min-width: 80rem) {
    gap: 2rem;
  }
`;

/**
 * The style for the LoadingSpinner part of the Dashboard component
 * @memberof Dashboard
 */
const LoadingSpinner = styled.div`
  position: absolute;
  top: calc(50% - 10rem);
  left: calc(50% - 10rem + var(--nav-left-width) / 2);
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  border-width: 2rem;
  border-style: solid;
  border-color: transparent black black black;
  animation: spin 1s infinite cubic-bezier(0.3, 0, 0.7, 1) both;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Dashboard;
