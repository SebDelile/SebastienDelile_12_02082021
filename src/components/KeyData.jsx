import { Component } from 'react';
import styled from 'styled-components';
import Card from './Card.jsx';
import iconCalorie from '../assets/icon-calorie.svg';
import iconProtein from '../assets/icon-protein.svg';
import iconCarbohydrate from '../assets/icon-carbohydrate.svg';
import iconLipid from '../assets/icon-lipid.svg';
import propTypes from 'prop-types';

/**
 * Render a KeyData component.
 * @memberof dashboard_sections
 * @extends Component
 * @param {object} props
 * @param {object} props.data - the raw data to display in the card components
 * @param {array} names - the names of the categories of the cards. used to map all categories
 * @param {object} icons - the link to the icons to display for each category
 * @param {object} values - the values to display in the cards (from props)
 * @param {object} colors - the colors of the icon shapes for each category
 */
class KeyData extends Component {
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

  /**
   * Render the component.
   * @returns {Reactnode} jsx to be injected in the html
   */
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

/**
 * The propTypes for the KeyData component
 * @memberof KeyData
 */
KeyData.propTypes = {
  data: propTypes.shape({
    calorieCount: propTypes.number,
    proteinCount: propTypes.number,
    carbohydrateCount: propTypes.number,
    lipidCount: propTypes.number,
  }).isRequired,
};

/**
 * The style for the KeyData component
 * @memberof KeyData
 */
const Container = styled.div`
  grid-area: key-data;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

export default KeyData;
