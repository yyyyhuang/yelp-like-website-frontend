import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState, useCallback, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import MoviesList from "./components/MoviesList";
import Movie from "./components/Movie";
import Login from "./components/Login";
import Logout from "./components/Logout";
import AddReview from './components/AddReview';
import FavoriteDataService from './services/favorites';
import FavoritesList from './components/FavoritesList';

import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
// const cuisines = ["Mexican", "American", "Chinese", "Italian"];

function App() {

  const [user, setUser] = useState(null);
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
      <Navbar bg="light" expand="lg" sticky="top" variant="dark">
        <Container className="Container-fluid">
        <Navbar.Brand className="brand" href="/">
          <img src="/images/hungry-logo.png" alt="movies logo" className="moviesLogo"/>
          WELCOME
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="ml-auto">
            <Nav.Link as={Link}  to={"/movies"}>
              Movies
            </Nav.Link>
            { user &&
              <Nav.Link as={Link} to={"/favorites"}>
                  Favorites
              </Nav.Link> 
            }
          </Nav>
        </Navbar.Collapse>
        { user ? (
              <Logout setUser={setUser} />
            ) : (
              <Login setUser={setUser} />
        )}
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
           <MoviesList 
            user={ user }
            addFavorite={ addFavorite }
            deleteFavorite={ deleteFavorite }
            favorites={ favorites }
          />}
          /> 
        <Route exact path={"/movies"} element={
          <MoviesList 
            user={ user }
            addFavorite={ addFavorite }
            deleteFavorite={ deleteFavorite }
            favorites={ favorites }
          />}
          />
        <Route path={"/movies/:id/"} element={
          <Movie user={ user }/>}
          />
        <Route path={"/movies/:id/review"} element={
          <AddReview user={ user }/>}
          />
        
        {/* favorites drogging page */}
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
            addFavorite={ addFavorite }
            deleteFavorite={ deleteFavorite }
            favorites={ favorites }
          />
        
        }
        />
      </Routes>

    </div>
    </GoogleOAuthProvider>
  );
}


export default App;
