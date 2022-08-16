import React, { useState, useEffect, useCallback} from "react";
import RestaurantDataService from "../services/restaurants";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
// import { BsStar, BsStarFill } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";


import "./RestaurantsList.css";


const RestaurantsList = ({
    user,
    x,
    y
}) => {
    // useState to set state values
    const [restaurants, setRestaurants] = useState([]); // syntax const [<state_name>, <setter_name>] = useState(<initial state_value>)
    const [searchName, setSearchName] = useState("");
    // const [searchRating, setSearchRating] = useState("");
    // const [ratings, setRatings] = useState(["All Ratings"]);
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState("");
    const distance = [1, 2, 5];
    const [filter, setFilter] = useState(10);

    // useCallback to define functions which should
    // only be created once and will be dependencies for
    // useEffect
    
    // const retrieveRatings = useCallback(() => {
    //     RestaurantDataService.getRatings() // calls getRatings to get a l ist of possible ratings
    //         .then(response => {
    //             setRatings(["All Ratings"].concat(response.data))
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }, []); // empty array passed as the second argument of useCallback indicates that this function does not have any dependencies


    const retrieveRestaurants = useCallback(() => {
        setCurrentSearchMode("");
        RestaurantDataService.getAll(currentPage)
            .then(response => {
                setRestaurants(response.data.restaurants);
                setCurrentPage(response.data.page);
                setEntriesPerPage(response.data.entries_per_page);

                // restaurants.map((restaurant) => {
                //     RestaurantDataService.findPhoto(restaurant.business_id)
                //     .then(response => {
                //         if (response.data.address) {
                //             restaurant = {
                //                 ...restaurant,
                //                 photo: response.data.address
                //             }
                //         } else {
                //             restaurant = {
                //                 ...restaurant,
                //                 photo: '/images/RestaurantSample.jpg'
                //             }
                //         }
                        
                //         // console.log(restaurant.photo);
                //     })
                //     .catch(e => {
                //         restaurant['photo'] = "./images/RestaurantSample.jpg";
                //     })
                // })
            })
            .catch(e => {
                console.log("sasy hi");
                // console.log(e);
            });
    }, [currentPage]); // dependency currentPage which determines which set of 20 movies it will retrieve

    const find = useCallback((query, by) => {
        console.log(query);
        RestaurantDataService.find(query, by, currentPage)
            .then(response => {
                setRestaurants(response.data.restaurants);
            })
            .catch(e => {
                console.log(e);
            });
    }, [currentPage]);

    const findByName = useCallback(() => {
        setCurrentSearchMode("findByName");
        find(searchName, "name");
    }, [find, searchName]);

    // const findByRating = useCallback(() => {
    //     setCurrentSearchMode("findByRating");
    //     if (searchRating === "All Ratings") {
    //         retrieveRestaurants();
    //     } else {
    //         find(searchRating, "stars");
    //     }
    // }, [find, searchRating, retrieveRestaurants]);

    const retrieveNextPage = useCallback(() => {
        if (currentSearchMode === "findByName") {
            findByName();
        } else {
        // } else if (currentSearchMode === "findByRating") {
        //     findByRating();
        // } else {
            retrieveRestaurants();
        }
    }, [currentSearchMode, findByName, retrieveRestaurants]);


    // use effect to carry out side effect functionality
    // useEffect(() => {
    //     retrieveRatings();
    // }, [retrieveRatings]);

    useEffect(() => {
        setCurrentPage(0);
    }, [currentSearchMode]);

    // Retrieve the next page if the currentPage value changes
    useEffect(() => {
        retrieveNextPage();
    }, [currentPage, retrieveNextPage]);


    // other functions that are not depended on by useEffect
    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    }

    // const onChangeSearchRating = e => {
    //     const searchRating = e.target.value;
    //     setSearchRating(searchRating);
    // }

    // const findPhotoById = (id) => {
    //     RestaurantDataService.findPhoto(id)
    //     .then(response => {
    //         setPhoto(response.data);
    //         console.log(photo.address);
            
    //     })
    //     .catch(e =>{
    //        console.log(e);
    //     })
    // }

    const handleFilterChange = event => {
        setFilter(event.target.value);
        console.log(x, y);
        RestaurantDataService.getByDistance(x, y, filter, currentPage)
                            .then(response => {
                                setRestaurants(response.data.restaurants);
                                })
                            .catch(e => {
                                    console.log(e);
                                })
    };

    const resetRadioState = () => {
        setFilter(10);
        retrieveRestaurants();
    };



    return (
        <div className="App">
            <Container className="main-container">
                <Form>
                    <Row>
                        <Col>
                        <Form.Group className="mb-3">
                            <Form.Control
                            type="text"
                            placeholder="Search by name"
                            value={searchName}
                            onChange={onChangeSearchName}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </Button>
                        </Col>
                    </Row>
                </Form> 
            
                <Row> 
                    <Col>
                        <div className="filters" aria-labelledby="filters-header">
                            <h4 id="filters-header">
                                Distance
                            </h4>
                            
                            <ul>
                                {distance.map(dis => {
                                    return (
                                        <label>
                                        <input key={dis}
                                            onChange={handleFilterChange}
                                            type="radio"
                                            value={dis} 
                                            checked={ parseInt(filter) === parseInt(dis) }
                                            />
                                        {"< " + dis + " miles"}
                                        </label>
                                    )
                                })}
                            
                            </ul>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={resetRadioState}
                                >
                                    reset
                            </Button>
                            </div>
                        </Col>
                
                </Row>
               
                
                <Row className="movieRow">
                    { restaurants.map((restaurant) => {
                        // const starList = Array.apply(1, Array(restaurant.stars));
                        return(
                            <Col key={restaurant.business_id}>
                                <Card className="moviesListCard">
                                    {/* user && (
                                        favorites.includes(restaurant.business_id) ?
                                        <BsStarFill style={{ position: 'absolute', top: 0, left: 0}} className="star starFill" onClick={() => {
                                        deleteFavorite(restaurant.business_id);
                                        }} />
                                        :
                                        <BsStar style={{ position: 'absolute', top: 0, left: 0}} className="star starEmpty" onClick={() => {
                                            addFavorite(restaurant.business_id);
                                        }} />
                                    )*/}
                                    <Card.Img
                                    className="smallPoster"
                                    src={restaurant.poster ? restaurant.poster : "/images/RestaurantSample.jpg"}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src="/images/RestaurantSample.jpg";
                                    }}
                                    />
                                    <Card.Body>
                                        <Card.Title> {restaurant.name} </Card.Title>
                                        <Card.Text>
                                            <ReactStars
                                                size={30}
                                                value={restaurant.stars}
                                                isHalf={true}
                                                edit={false}
                                                />
                                        </Card.Text>
                                        <Link to={"/restaurants/"+restaurant.business_id}>
                                            View Restaurant Detail
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
                <br />
                Showing page: { currentPage + 1 }.
                <Button
                variant="link"
                onClick={() => { setCurrentPage(currentPage + 1)}}
                >
                    Get next { entriesPerPage} results
                </Button>
            </Container>
        </div>
    )
}


export default RestaurantsList;