import homeStyles from './home.module.css'
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

function Home() {
  return (
    <div className={homeStyles.container}>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  );
}

export default Home;
