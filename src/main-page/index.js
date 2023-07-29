import { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, /*Switch,*/ Routes, Route } from "react-router-dom";
import FeaturedHouse from './featured-house';
import Header from './header';
import SearchResults from '../search-results';
import logo from './logo.svg';
import './main-page.css';
import HouseFilter from './house-filter';
import HouseFromQuery from "../house/HouseFromQuery";

function App() {

  const [allHouses, setAllHouses] = useState([]);
  useEffect(() => {
    const fetchHouses = async () => {
      const resp = await fetch('/houses.json');
      const houses = await resp.json();
      setAllHouses(houses);

    };

    fetchHouses();

  }, []);

  const featuredHouse = useMemo(() => {
    if (allHouses.length) {
      const randomIndex = Math.floor(Math.random() * allHouses.length);
      return allHouses[randomIndex];
    }
  }, [allHouses])
  
  return (
    <Router>
      <div className='container'>
        <Header subtitle="Providing houses all over the world"
          title="Some title"/>
        <HouseFilter allHouses={allHouses} />
        {/* <Switch>
          <Route path="/">
            <FeaturedHouse house={featuredHouse} />
          </Route>
  </Switch> */}
        <Routes>
          <Route path='/searchresults/:country' element={<SearchResults />} />
          <Route path='/house/:id' element={<HouseFromQuery allHouses={allHouses} />}/>
          <Route path='/' element={<FeaturedHouse house={featuredHouse} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
