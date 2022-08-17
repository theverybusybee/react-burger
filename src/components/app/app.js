import { useState, useEffect } from 'react';
import AppStyle from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { urlLink } from '../../utils/data';

function App(props) {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  })

   useEffect(() => {
    const getData = async () => {
      setState({...state, isLoading: true});
      const res = await fetch(`${urlLink}`);
      const data = await res.json();
      setState({...state, data: data.data, isLoading: false });
    }
    getData();
  }, [props])

  const {data} = state;

  return (
    <div className={ AppStyle.main }>
      <AppHeader/>
      <BurgerIngredients ingredients={data} /> 
      <BurgerConstructor ingredients={data} />
    </div>
  );
}

export default App;
