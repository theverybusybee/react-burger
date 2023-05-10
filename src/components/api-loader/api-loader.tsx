import apiLoaderStyle from "./api-loader.module.css";

export default function ApiLoader() {
  return (
    <div className={apiLoaderStyle.main}>
      <div className={apiLoaderStyle.loading}>
        <p className="text text_type_main-large text_color_inactive">
          Загрузка<span className={apiLoaderStyle.dotFlashing}></span>
        </p>
      </div>
    </div>
  );
}
