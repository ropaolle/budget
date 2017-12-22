import React from 'react';
import renderer from 'react-test-renderer';
import BudgetList from './BudgetList';

test('Link changes the class when hovered', () => {
  function handleClickOpen() {}
  const expenses = {};
  const categories = {};
  const component = renderer.create(
    <BudgetList
      handleClickOpen={handleClickOpen}
      expenses={expenses}
      categories={categories}
    />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
