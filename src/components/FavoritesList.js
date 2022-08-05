import update from 'immutability-helper'
import { useCallback, useEffect, useState } from "react"
import { Container } from 'react-bootstrap'
import { DndCard } from "./DndCard"
import RestaurantDataService from "../services/restaurants";

import "./favorites.css"

const FavoritesList =({
    favorites,
}) => {
    const[moviesFav, setMoviesFav] = useState([]);


    const getMovieInfo = useCallback((ids)=>{
      if(ids && ids.length>0){
        RestaurantDataService.findIds(ids)
        .then(response=>{
          let get_movies = response.map(res=>res.data);
          setMoviesFav(get_movies)
        })
        .catch(e=>{
          console.log(e)
        })
      }
    },[])

    useEffect(()=>{
      getMovieInfo(favorites);
    },[getMovieInfo, favorites])
    

    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setMoviesFav((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
      )
    }, [])


    const renderCard = useCallback((card, index) => {
      return (
        <DndCard
          key={card._id}
          id={index + 1}
          movie={card}
          index={index}
          moveCard={moveCard}
        />
      )
    }, [])
    
    return (
        <div >
            <Container className='favoritesContainer'>
                <div className='favoritesPanel'>
                {
                  favorites && favorites.length>0?
                   <span> Drag your favorites to rank them</span>:
                   <span>You haven't chosen any favorites</span>
                }
                    
                </div>
            
            {
                moviesFav.length>0 ? 
                <div style={{width:500, margin:16}}>{moviesFav.map((movie, i) => {return renderCard(movie, i)})}</div> 
                : 
                <div></div>
            }
            </Container>
        </div>

    )
}

export default FavoritesList;