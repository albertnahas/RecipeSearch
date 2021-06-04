import React, { useState } from 'react';
import { Button, ButtonToolbar, Col, Grid, List, Modal, Radio, RadioGroup, Row, Timeline } from 'rsuite';
import { getNutrient } from '../../utils/iconsMappings';
import IngredientsTable from '../IngredientsTable/IngredientsTable';
import './DetailsModal.scss';

type Props = {
  show: boolean,
  setShow: (a: boolean) => void,
  recipe: any
}
const DetailsModal: React.FC<Props> = ({ show, setShow, recipe }) => {

  const close = () => {
    setShow(false);
  }
  const open = () => {
    setShow(true);
  }

  return recipe && (
    <div className="modal-container" >
      <Modal size="md" backdrop={true} show={show} onHide={close}>
        <Modal.Header>
          <Modal.Title>{recipe.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid fluid>
            <Row>
              <Col xs={12}><img style={{ maxWidth: '100%', borderRadius: 5 }} src={recipe.image} /></Col>
              <Col xs={12}>
                <List style={{ margin: 5 }} size="sm" bordered>
                  <List.Item>Calories: {getNutrient(recipe, 'Calories')}kcal</List.Item>
                  <List.Item>Protein: {getNutrient(recipe, 'Protein')}g </List.Item>
                  <List.Item>Carbs: {getNutrient(recipe, 'Carbohydrates')}g </List.Item>
                  <List.Item>Fat: {getNutrient(recipe, 'Fat')}g</List.Item>
                  <List.Item>Fiber: {getNutrient(recipe, 'Fiber')}g</List.Item>
                  <List.Item>Sugar: {getNutrient(recipe, 'Sugar')}g</List.Item>
                </List>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h5 style={{marginBottom:20}}>Ingriendeints</h5>
              </Col>
            </Row>

            <Row>
              <Col>
                <IngredientsTable recipe={recipe} />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <h5 style={{marginBottom:20}}>Instrucitons</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
                <Timeline>
                  {recipe.analyzedInstructions[0] && recipe.analyzedInstructions[0].steps.map((s: any) =>
                    <Timeline.Item key={s.number}>{s.step}</Timeline.Item>)}
                </Timeline>
              </Col>
            </Row>
          </Grid>


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close} appearance="primary">
            Close
              </Button>
        </Modal.Footer>
      </Modal>
    </div >
  )
};

export default DetailsModal;
