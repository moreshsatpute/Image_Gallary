import './App.css';
import HeroSection from './components/HeroSection';
import { BrowserRouter as Router, } from 'react-router-dom';
import React from 'react';



function App() {
  return (

    <Router>
      <HeroSection />

    </Router>

    /* <Route path="/" exact component={UploadButton} />
    <Route path="/gallery" render={() => <div>Gallery Page</div>} /> */



  );
}

export default App;
