import { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Greetings } from './Greetings.jsx';
import { Activity } from './Activity';
import { AverageSessions } from './AverageSessions';
import { Performance } from './Performance';
import { AverageScore } from './AverageScore';
import { KeyData } from './KeyData';
import { getData } from '../services/getData.js';
import { isObjectEmpty } from '../utils/isObjectEmpty.js';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMainData: {},
      userActivity: {},
      userAverageSessions: {},
      userPerformance: {},
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    const userMainData = getData(`/user/${userId}`, false);
    const userActivity = getData(`/user/${userId}/activity`, false);
    const userAverageSessions = getData(
      `/user/${userId}/average-sessions`,
      false
    );
    const userPerformance = getData(`/user/${userId}/performance`, false);
    this.setState({
      userMainData: userMainData,
      userActivity: userActivity,
      userAverageSessions: userAverageSessions,
      userPerformance: userPerformance,
    });
  }

  render() {
    const isDataNotReady =
      isObjectEmpty(this.state.userMainData) &&
      isObjectEmpty(this.state.userActivity) &&
      isObjectEmpty(this.state.userAverageSessions) &&
      isObjectEmpty(this.state.userPerformance);
    const isDataError =
      this.state.userMainData instanceof Error ||
      this.state.userActivitya instanceof Error ||
      this.state.userAverageSessions instanceof Error ||
      this.state.userPerformance instanceof Error;
    if (isDataNotReady) return null;
    else if (isDataError) return <Redirect to="/" />;
    else
      return (
        <Container>
          <Greetings data={this.state.userMainData.userInfos} />
          <Activity data={this.state.userActivity} />
          <AverageSessions data={this.state.userAverageSessions} />
          <Performance data={this.state.userPerformance} />
          <AverageScore
            data={
              this.state.userMainData.todayScore ||
              this.state.userMainData.score
            }
          />
          <KeyData data={this.state.userMainData.keyData} />
        </Container>
      );
  }
}

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
