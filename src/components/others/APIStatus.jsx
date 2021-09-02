import { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import COLORS from '../../utils/COLORS.js';

class APIStatus extends Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: false, isLoading: true };
    this.BASE_URL = 'http://localhost:3001';
    this.timer = null;
  }

  componentDidMount() {
    this.testStatus();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  testStatus = async () => {
    this.setState({ isLoading: true });
    let isOnline = false;
    try {
      const response = await axios.get(this.BASE_URL + '/');
      if (response.data === 'SportSee API is ON !') isOnline = true;
    } catch (error) {
      console.log(error);
    }
    this.setState({ isOnline: isOnline, isLoading: false });
    clearTimeout(this.timer);
    this.timer = setTimeout(this.testStatus, 30000);
  };

  render() {
    return (
      <Container>
        {this.state.isOnline ? (
          <Message state="online">L'API est disponible</Message>
        ) : (
          <Message state="offline">L'API est indisponible</Message>
        )}
        <Button onClick={this.testStatus}>
          {this.state.isLoading ? <Spinner /> : null}
          <ButtonMessage visible={!this.state.isLoading}>
            Retester
          </ButtonMessage>
        </Button>
      </Container>
    );
  }
}

export default APIStatus;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  gap: 0;
`;

const Message = styled.p`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem 0 0 0.5rem;
  color: white;
  background-color: ${(props) =>
    props.state === 'online' ? '#32a852' : '#786c6c'};
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${COLORS.grey};
  position: relative;
  border-radius: 0 0.5rem 0.5rem 0;
`;

const ButtonMessage = styled.p`
  color: ${(props) => (props.visible ? 'black' : 'transparent')};
`;

const Spinner = styled.div`
  position: absolute;
  top: calc(50% - 0.5rem);
  left: calc(50% - 0.5rem);
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border-width: 0.25rem;
  border-style: solid;
  border-color: transparent black black black;
  animation: spin 1s infinite cubic-bezier(0.3, 0, 0.7, 1) both;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
