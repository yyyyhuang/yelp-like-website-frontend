import update from 'immutability-helper'
import { useCallback, useEffect, useState } from "react"
import { Container } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from 'react-router-dom'
import CollectionDataService from "../services/collections";
import RestaurantDataService from "../services/restaurants";

import "./FavoritesList.css"

const FavoritesList =({}) => {
    const[favoritesIds, setFavoritesIds] = useState([]);
    const[favorites, setFavorites] = useState([]);

    let params = useParams(); 


    const getFavoritesIds = useCallback(()=>{
      CollectionDataService.getCollection(params.id)
        .then(response => {
          setFavoritesIds(response.data.favorites);
        })
        .catch(e => {
          console.log(e);
        })
    }, [params.id]);
    

    const getFavorites = useCallback((ids) => {
      if (ids && ids.length > 0) {
        RestaurantDataService.findIds(ids)
          .then(response => {
            let fav = response.map(res => res.data);
            setFavorites(fav);
          })
          .catch(e => {
            console.log(e);
          })
      }
    }, [])


    useEffect(()=>{
      getFavoritesIds();
    },[params.id])

    useEffect(() => {
      getFavorites(favoritesIds);
    }, [getFavorites, favoritesIds]);
    
    return (
        <div >
            <Container className='favoritesContainer'>
            <div className="favNav">
                    <div className="favTitle">
                        <span>
                            Favorites
                        </span>
                    </div>
                </div>
                <div className='favoritesPanel'>
                {
                  favorites && favorites.length>0?
                   <div></div>:
                   <span className="info">You haven't chosen any favorites</span>
                }
                    
                </div>
            
            {
                favorites.length>0 ? 
                <div>
                  <Row xs={1} md={4} className="grid">
                  {favorites.map((restaurant, i) => {
                    return (
                      <Col>
                          <div>
                              <Card as="a" href={"/restaurants/"+restaurant.business_id} className="favCard">
                                <Card.Img
                                    className="favPoster"
                                    src={restaurant.poster ? restaurant.poster : "/images/RestaurantSample.jpg"}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src="/images/RestaurantSample.jpg";
                                    }}
                                    />
                                  <Card.Body className="favContent">
                                    <Card.Text className="favCardTitle">{restaurant.name}</Card.Text>
                                  </Card.Body>
                                  
                              </Card>
                          </div>
                          </Col>
              )
                    })}
                    </Row>
                  </div> 
                : 
                <div></div>
            }
            </Container>
        </div>

    )
}

export default FavoritesList;