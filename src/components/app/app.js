import AppStyle from './app.module.css';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { burgerIngredientsData } from '../../utils/data'

function App() {
  return (
    <div className={ AppStyle.main }>
      <AppHeader/>
      <BurgerIngredients ingredients={ burgerIngredientsData }/>
      <BurgerConstructor ingredients={ burgerIngredientsData } />
    </div>
  );
}

export default App;
