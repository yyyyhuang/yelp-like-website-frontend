import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import { useState, useCallback, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap-icons/font/bootstrap-icons.css";


import RestaurantsList from "./components/RestaurantsList";
import Restaurant from "./components/Restaurant";
import Login from "./components/Login";
import AddReview from './components/AddReview';
import CollectionDataService from './services/collections';
import CollectionsList from './components/CollectionsList';
import UserDataService from './services/users';
import UserProfile from './components/UserProfile';
import FavoritesList from './components/FavoritesList';



import './App.css';
import { BsPersonCircle } from 'react-icons/bs';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {

  const [user, setUser] = useState(null);
  const [collections, setCollections] = useState([]);

  const getCollectiions = useCallback(() => {
    CollectionDataService.get(user.googleId)
      .then(response => {
        setCollections(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  }, [user]);

  const handleSave = (data) => {
    CollectionDataService.createCollection(data)
        // .then(response => {
        //     let cur = CollectionDataService.get(user.googleId);
        //     setMyCollections(cur);
        // })
        .catch(e => {
            console.log(e);
        });
}


  const handleLogout = () => {
    googleLogout()
    setUser(null);
    console.log("Logged out successfully.");
  }

  /*
  const [saveFavorites, setSaveFavorites] = useState(false);
  
  const addFavorite = (businessId) => {
    setSaveFavorites(true);
    setFavorites([...favorites, businessId])
  }

  const deleteFavorite = (businessId) => {
    setSaveFavorites(true);
    setFavorites(favorites.filter(f => f !== businessId));
  }


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
  */

  useEffect(() => {
    if (user) {
      getCollectiions();
    }
  }, [user, handleSave]);

  const create = (loginData) => {
    var data = {
      user_id: loginData.googleId,
      name: loginData.given_name,
    }
    UserDataService.createUser(data)
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    // console.log(loginData);
    if (loginData) {
      create(loginData);
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
  }, [user]);
  

  useEffect(()=> {
    getLocation();
  },[]);
   
  



  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className="App">
      <Navbar expand="lg" sticky="top" className="navContainer">
        <Container className="Container-fluid">
        <Navbar.Brand className="brand" href="/">
          <img src="/images/hungry-logo.png" alt="icon" className="iconLogo"/>
          WELCOME
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="ml-auto">
            <Nav.Link as={Link}  to={"/restaurants"} className="navLink">
              Restaurants
            </Nav.Link>
            { user &&
              <Nav.Link as={Link} to={"/collections"} className="navLink">
                  Collections
              </Nav.Link> 
            }
          </Nav>
        </Navbar.Collapse>
        
        { user ? (
            <Dropdown className="menu">
              <Dropdown.Toggle className="userProfile">
                <BsPersonCircle size={25}/>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                  <Dropdown.Item href="/user" className="dropLink">Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="dropLink">
                    <a onClick={handleLogout}>Logout</a>
                  </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            ) : (
              <Login setUser={setUser} />
        )}
        </Container>

      </Navbar>
      <Routes>
        <Route exact path={"/"} element={
          <RestaurantsList 
            user={ user }
            x={lat}
            y={lng}
            collections = { collections }
            // addFavorite={ addFavorite }
            // deleteFavorite={ deleteFavorite }
            // favorites={ favorites }
            />
        }
          /> 
        <Route exact path={"/restaurants"} element={
          <RestaurantsList 
            user={ user }
            x={lat}
            y={lng}
            collections={ collections }
            handleSave = { handleSave }
            // addFavorite={ addFavorite }
            // deleteFavorite={ deleteFavorite }
            // favorites={ favorites }
          />}
          />
        <Route path={"/restaurants/:id/"} element={
          <Restaurant 
          user={ user }
          collections = { collections }
          handleSave = { handleSave }
          />}
          />
        <Route path={"/restaurants/:id/review"} element={
          <AddReview user={ user }/>}
          />
        
        <Route exact path={"/collections"} element={
          user ?
          <CollectionsList 
          user={ user } 
          collections = { collections }
          handleSave = { handleSave }
          />
          :
          <RestaurantsList
            user={ user }
            x={lat}
            y={lng}
            // collections = { collections }
            // addFavorite={ addFavorite }
            // deleteFavorite={ deleteFavorite }
          />
        }
        />
        <Route path={"/collections/:id/"} element={
          <FavoritesList user={ user }/>}
        />

        <Route path={"/user"} element={
          user? 
          <UserProfile
            user = { user }
            x = {lat}
            y = { lng }
            collections = {collections}
            />
            :
            <RestaurantsList
            user={ user }
            x={lat}
            y={lng}
            />
        }
       />
      </Routes>

    </div>
    </GoogleOAuthProvider>
  );
}


export default App;
