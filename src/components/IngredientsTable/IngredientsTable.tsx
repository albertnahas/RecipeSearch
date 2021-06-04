import React from 'react';
import { Table } from 'rsuite';
import './IngredientsTable.scss';


type Props = {
  recipe: any
}

const { Column, HeaderCell, Cell } = Table;

const IngredientsTable: React.FC<Props> = ({ recipe }) => (
  <div>
    <Table
      autoHeight={true}
      data={recipe.nutrition.ingredients}
    >
      <Column width={250}>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column width={100}>
        <HeaderCell>Amount</HeaderCell>
        <Cell dataKey="amount" />
      </Column>

      <Column width={150}>
        <HeaderCell>Unit</HeaderCell>
        <Cell dataKey="unit" />
      </Column>
    </Table>
  </div>
);

export default IngredientsTable;
