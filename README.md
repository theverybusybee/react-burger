# Stellar burgers - космическая бургерная 

## Tech Stack
![HTML5](https://img.shields.io/badge/-HTML5-black?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-black?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-black)
![ReactDnD](https://img.shields.io/badge/react-dnd-black)
![uuidv4](https://img.shields.io/badge/uuidv4-purple)

## Description
  Доставка космической бургерной. Проект написан при помощи библиотек React, Redux, Drag-n-Drop и обладает разнообразным функционалом: 
- Данные ингредиентов загружаются с сервера;
- При нажатии на ингредиент открывается модальное окно с подробным описанием ингредиента;
- Чтобы добавить ингредиент в бургер, перетащите его в конструктор;
- При перетаскивании ингредиента срабатывает счетчик его количества и пересчитывается итоговая стоимость заказа;
- Есть возможность удалить ингредиент;
- Можно установить желаемый порядок ингредиентов в бургере при помощи перетаскивания;
- При оформлении заказа, на сервер отправляются все ингредиенты в заказе, а в ответ с сервера приходит номер заказа.
- Есть авторизация, регистрация, восстановление пароля, личный кабинет пользователя. 
- Можно посмотреть историю заказов.
При написании проекта использовались функциональные компоненты и подключение WebSocket для непрерывного обновления данных в реальном времени.

## Demo

Ссылка на задеплоенный проект: https://theverybusybee.github.io/react-burger/

![Alt text](./src/images/demo.png "demo")

## Клонирование репозитория 

```bash
$ git clone git@github.com:theverybusybee/react-burger.git
```

## Установка зависимостей и запуск проекта

#### install dependencies
```bash
$ npm install
```

#### build project
```bash
$ npm run build
```

#### run prod mode
```bash
$ npm run start
```

#### run test
```bash
$ npm run test
```

## Links
* [Link to figma](https://www.figma.com/file/zFGN2O5xktHl9VmoOieq5E/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8_external_link)
* [React Developer Burger UI Components](https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/)