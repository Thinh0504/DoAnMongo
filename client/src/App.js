import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './components/header/Header';
import MainPage from './components/homepages/Page';
import Footer from './components/footer/Footer';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="font-barlow">
          <Header />
          <MainPage />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
