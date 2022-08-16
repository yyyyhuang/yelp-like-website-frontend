import update from 'immutability-helper'
import { useCallback, useEffect, useState } from "react"
import { Container } from 'react-bootstrap'
import { DndCard } from "./DndCard"
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom'
import CollectionDataService from "../services/collections";
import RestaurantDataService from "../services/restaurants";

import "./favorites.css"

const FavoritesList =({}) => {
    const[favoritesIds, setFavoritesIds] = useState([]);
    const[favorites, setFavorites] = useState([]);
    let params = useParams();

    const getFavoritesIds = useCallback(()=>{
      console.log(params.id);
      CollectionDataService.getCollection(params.id)
        .then(response => {
          setFavoritesIds(response.data.favorites);
          console.log(response.data);
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
                <div className='favoritesPanel'>
                {
                  favorites && favorites.length>0?
                   <span> My Favorites</span>:
                   <span>You haven't chosen any favorites</span>
                }
                    
                </div>
            
            {
                favorites.length>0 ? 
                <div>
                  {favorites.map((restaurant, i) => {
                    return (
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
                                  <div className="favTitle">{restaurant.name}</div>
                              </Card>
                          </div>
                  
              )
                    })}
                  </div> 
                : 
                <div></div>
            }
            </Container>
        </div>

    )
}

export default FavoritesList;