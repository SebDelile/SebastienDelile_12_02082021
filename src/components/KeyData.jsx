import { Component } from 'react';
import styled from 'styled-components';
import { Card } from './Card.jsx';
import iconCalorie from '../assets/icon-calorie.svg';
import iconProtein from '../assets/icon-protein.svg';
import iconCarbohydrate from '../assets/icon-carbohydrate.svg';
import iconLipid from '../assets/icon-lipid.svg';

export class KeyData extends Component {
  constructor(props) {
    super(props);
    this.names = ['Calories', 'Protéines', 'Glucides', 'Lipides'];
    this.units = {
      Calories: 'kcal',
      Protéines: 'g',
      Glucides: 'g',
      Lipides: 'g',
    };
    this.icons = {
      Calories: iconCalorie,
      Protéines: iconProtein,
      Glucides: iconCarbohydrate,
      Lipides: iconLipid,
    };
    this.values = {
      Calories: this.props.data.calorieCount,
      Protéines: this.props.data.proteinCount,
      Glucides: this.props.data.carbohydrateCount,
      Lipides: this.props.data.lipidCount,
    };
    this.colors = {
      Calories: '#FF0000',
      Protéines: '#4AB8FF',
      Glucides: '#FDCC0C',
      Lipides: '#FD5181',
    };
  }
  render() {
    return (
      <Container>
        {this.names.map((name, index) => (
          <Card
            key={`${index + 1}-${name}`}
            name={name}
            unit={this.units[name]}
            icon={this.icons[name]}
            value={this.values[name]}
            color={this.colors[name]}
          />
        ))}
      </Container>
    );
  }
}

const Container = styled.div`
  grid-area: key-data;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;
