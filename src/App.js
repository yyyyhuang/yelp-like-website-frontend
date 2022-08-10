import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState, useCallback, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap-icons/font/bootstrap-icons.css";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import RestaurantsList from "./components/RestaurantsList";
import Restaurant from "./components/Restaurant";
import Login from "./components/Login";
import Logout from "./components/Logout";
import AddReview from './components/AddReview';
import CollectionDataService from './services/collections';
import FavoritesList from './components/FavoritesList';



import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
// const cuisines = ["Mexican", "American", "Chinese", "Italian"];

function App() {

  const [user, setUser] = useState(null);
  /*
  const [favorites, setFavorites] = useState([]);
  const [saveFavorites, setSaveFavorites] = useState(false);
  
  const addFavorite = (businessId) => {
    setSaveFavorites(true);
    setFavorites([...favorites, businessId])
  }

  const deleteFavorite = (businessId) => {
    setSaveFavorites(true);
    setFavorites(favorites.filter(f => f !== businessId));
  }

  const retrieveFavorites = useCallback(() => {
    FavoriteDataService.getFavorites(user.googleId)
      .then(response => {
        setFavorites(response.data.favorites)
      })
      .catch(e => {
        console.log(e);
      });
  }, [user]);

  const updateFavorites = useCallback(() => {
    var data = {
      _id: user.googleId,
      favorites: favorites
    }
    FavoriteDataService.updateFavorites(data)
      .catch(e => {
        console.log(e);
      })
  }, [favorites, user])

  useEffect(() => {
    if (saveFavorites && user) {
      updateFavorites();
      setSaveFavorites(false);
      //reload = false;
    }
  }, [user, favorites, updateFavorites, saveFavorites]);

  useEffect(() => {
    if (user) {
      retrieveFavorites();
    }
  }, [user, retrieveFavorites]);

  */
  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    // console.log(loginData);
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;
      if (now < loginExp) {
        // Not expired
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }, [lat, lng, status]);
  

  useEffect(()=> {
    getLocation();
    // console.log("lat:" + lat + "lng: " + lng);
  }, [lat, lng, status]);
   


  

    
  /* filter here */
  // const [selectedCuisines, setSelectedCuisines] = useState([]);

  // const handleSelect = cuisine => {
    // const isSelected = selectedCuisines.includes(cuisine); 
    /* If the option has already been selected, we remove it from the array. */
    /* Otherwise, we add it. */ 
    /*
    const newSelection = isSelected 
    ? selectedCuisines.filter(currentCuisine => currentCuisine !== cuisine)
    : [...selectedCuisines, cuisine];
    setSelectedCuisines(newSelection);
    
  }
  */

  


  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className="App">
      <Navbar bg="light" expand="lg" sticky="top" variant="light">
        <Container className="Container-fluid">
        <Navbar.Brand className="brand" href="/">
          <img src="/images/hungry-logo.png" alt="icon" className="iconLogo"/>
          WELCOME
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="ml-auto">
            <Nav.Link as={Link}  to={"/restaurants"}>
              Restaurants
            </Nav.Link>
            { user &&
              <Nav.Link as={Link} to={"/collections"}>
                  Collections
              </Nav.Link> 
            }
          </Nav>
        </Navbar.Collapse>
        
        { user ? (
              <Logout setUser={setUser} />
            ) : (
              <Login setUser={setUser} />
        )}
          {/* <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="ml-auto">
            { user && 
              <Nav.Link as={Link} to={"/user"}>
                <i class="bi bi-person-circle"></i>
              </Nav.Link>
            }
          </Nav>
        </Navbar.Collapse> */}
          <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <i class="bi bi-person-circle"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                  <Dropdown.Item href="/users">Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
        </Container>

      </Navbar>
      {/* 
      <Filter label={"Cuisine Type"} onApply={()=> alert(selectedCuisines)} children={cuisines}>
         <div>
              { cuisines.map((cuis, index)=>{
                const isSelected = selectedCuisines.includes(cuis);
                return (
                  <label key={index}>
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={()=>{handleSelect(cuis)}}
                    />
                    <span className="ml-2 text-base text-gray-500 font-heading">
                      {cuis}
                    </span>
                    
                  </label>
                )
              })}
         </div>         
      </Filter>
      */}
      <Routes>
        <Route exact path={"/"} element={
          <RestaurantsList 
            user={ user }
            // addFavorite={ addFavorite }
            // deleteFavorite={ deleteFavorite }
            // favorites={ favorites }
            />
        }
          /> 
        <Route exact path={"/restaurants"} element={
          <RestaurantsList 
            user={ user }
            // addFavorite={ addFavorite }
            // deleteFavorite={ deleteFavorite }
            // favorites={ favorites }
          />}
          />
        <Route path={"/restaurants/:id/"} element={
          <Restaurant user={ user }/>}
          />
        <Route path={"/restaurants/:id/review"} element={
          <AddReview user={ user }/>}
          />
        
        {/* favorites drogging page 
        <Route exact path={"/favorites"} element={
          user?

          <DndProvider backend={HTML5Backend}>
              <FavoritesList 
                  favorites={ favorites }
                        />
				  </DndProvider>
          :
          <MoviesList
            user={ user }
            // addFavorite={ addFavorite }
            // deleteFavorite={ deleteFavorite }
            // favorites={ favorites }
          />
        }
        />
        */}
      </Routes>

    </div>
    </GoogleOAuthProvider>
  );
}


export default App;
