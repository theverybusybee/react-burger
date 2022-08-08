import React from 'react';
import AppStyle from './App.module.css';
import AppHeader from '../app-header/AppHeader'

function App() {
  return (
    <div className={ AppStyle.main }>
      <AppHeader/>
    </div>
  );
}

export default App;
