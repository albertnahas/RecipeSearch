import React, { useState } from 'react';
import './FoodInput.scss';
import * as _ from 'lodash';
import { Icon, TagPicker } from 'rsuite';
import { throttle } from 'lodash';
import FoodIcon from '../FoodIcon/FoodIcon';

type Props = {
  setIngredients: any,
  ingredients: any[]
}
const FoodInput: React.FC<Props> = ({ setIngredients, ingredients }) => {

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [cachedItems, setCachedItems] = useState<any[]>([]);

  const handleSelect = (value: any, item: any, event: any) => {
    _.remove(cachedItems, (v: any) => v === value);
    setCachedItems([...cachedItems, item]);
  }

  const getData = React.useMemo(
    () => throttle((word: string) => {
      fetch('food.json'
        , {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          const matches = myJson.filter((i: any) => i.name.match(new RegExp(word, "i"))).splice(0, 10);
          setItems(matches);
          setLoading(false);
        });
    }, 400), []);

  const getUsers = React.useMemo(
    () => throttle((word: string) => {
      fetch(`https://api.github.com/search/users?q=${word}`)
        .then(response => response.json())
        .then(data => {
          setItems(data.items);
          setLoading(false);
        })
        .catch(e => console.log('Oops, error', e));
    }, 200), []);

  const handleSearch = (word: string) => {
    if (!word) {
      return;
    }

    setLoading(true);
    getData(word);
  }

  const handleChange = (value: any) => {
    setIngredients(value)
  }

  return (
    <TagPicker
      data={items}
      cacheData={cachedItems}
      value={ingredients}
      style={{ width: '100%' }}

      labelKey="name"
      valueKey="name"
      onChange={handleChange}
      onSearch={handleSearch}
      onSelect={handleSelect}
      placeholder="Select your ingredients"
      renderMenuItem={(label, item: any) => {
        return (
          <div>
            <FoodIcon src={item['food_group']} /> {label}
          </div>
        );
      }}
    />
  )
};

export default FoodInput;
