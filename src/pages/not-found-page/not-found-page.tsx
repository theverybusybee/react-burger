import NotFoundStyles from "./not-found-page.module.css";
import burgerLogo from "../../images/burger.png";

function NotFound() {
  return (
    <div className={`${NotFoundStyles.main} text_color_inactive`}>
      <p className="text text_type_digits-large">
        {" "}
        4<img className={NotFoundStyles.image} src={burgerLogo} alt="burger" />4 
      </p>
      <p className="text text_type_digits-large">Page Not Found</p>
    </div>
  );
}

export default NotFound;
