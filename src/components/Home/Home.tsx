import React, { useState } from 'react';
import { Button, Container, Grid, Header, Row, Col, Content, Panel } from 'rsuite';
import FoodIcon from '../FoodIcon/FoodIcon';
import FoodInput from '../FoodInput/FoodInput';
import './Home.scss';
import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'
import DetailsModal from '../DetailsModal/DetailsModal';
import { getNutrient } from '../../utils/iconsMappings';

const Home: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  // Create `axios-cache-adapter` instance
  const cache = setupCache({
    maxAge: 15 * 60 * 1000,
    exclude: { query: false }
  })

  // Create `axios` instance passing the newly created `cache.adapter`
  const api = axios.create({
    adapter: cache.adapter
  })

  const handleClickSearch = () => {
    setLoading(true);
    setRecipes([]);
    // Send a GET request to some REST api
    api({
      url: 'https://api.spoonacular.com/recipes/complexSearch',
      method: 'get',
      params: {
        includeIngredients: ingredients.join(','),
        apiKey: 'b20fad2508884d1f8f63923bfe3f6b5f',
        addRecipeNutrition: true
      }
    }).then(async (response) => {
      console.log(response);
      setLoading(false);
      console.log(response.data.results)
      setRecipes(response.data.results);
    }).catch(err => {
      setLoading(false)
      console.log(err);
    })
  }

  const showRecipeDetails = (selectedRecipe: any) => {
    setRecipe(selectedRecipe);
    setShowDetails(true);
  }

  const renderRecipe = () => {
    return recipes.map((recipe: any) => {
      return <Col key={recipe.id} md={6}>
        <Panel style={{ height: 370, marginBottom: 15 }} onClick={() => showRecipeDetails(recipe)} shaded bordered bodyFill>
          <img src={recipe.image} style={{width:'100%'}} />
          <Panel header={recipe.title}>
            <p>
              <small>Calories: {getNutrient(recipe, 'Calories')}</small>
            </p>
            <p>
              <small>P: {getNutrient(recipe, 'Protein')}g </small>
              <small>C: {getNutrient(recipe, 'Carbohydrates')}g </small>
              <small>F: {getNutrient(recipe, 'Fat')}g</small>
            </p>
          </Panel>
        </Panel>
        <img className="veganIcon" src="https://uxwing.com/wp-content/themes/uxwing/download/20-food-and-drinks/vegan.png" alt="" />
      </Col>
    });
  }

  return (
    <Content>

      <Header style={{ textAlign: 'center', margin: 25 }}>
        <h3>Find Your Meal</h3>

      </Header>
      <Grid >
        <Row>
          <Col md={24}>
            <FoodInput ingredients={ingredients} setIngredients={setIngredients} />
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: '10px' }} md={24}>
            <Button onClick={handleClickSearch} appearance="primary">Search Recipes</Button>
          </Col>

        </Row>
        <Row>
          <Col style={{ marginTop: '10px', textAlign: 'center' }} md={24}>
            {loading && <img style={{ width: '50%', filter: 'hue-rotate(302deg)' }} src="https://i.pinimg.com/originals/72/44/81/7244816ccc2a3015e5fa1ce52bc6fd82.gif" alt="" />}
          </Col>

        </Row>
        <Row>
          {recipes && renderRecipe()}
          <DetailsModal recipe={recipe} show={showDetails} setShow={setShowDetails} />
        </Row>
      </Grid>
      <Container>
      </Container>
    </Content>
  )
};

export default Home;
