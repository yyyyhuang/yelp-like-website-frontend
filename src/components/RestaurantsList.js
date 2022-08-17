import React, { useState, useEffect, useCallback} from "react";
import RestaurantDataService from "../services/restaurants";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
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
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState("");
    const distance = [1, 2, 5];
    const [filter, setFilter] = useState(10);



    const retrieveRestaurants = useCallback(() => {
        setCurrentSearchMode("");
        RestaurantDataService.getAll(currentPage)
            .then(response => {
                setRestaurants(response.data.restaurants);
                setCurrentPage(response.data.page);
                setEntriesPerPage(response.data.entries_per_page);
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
                <div className="searchContainer">
                        <Form>
                        <Form.Group className="mb-3 searchBar">
                            <Form.Control
                            type="text"
                            placeholder="Search by name"
                            value={searchName}
                            onChange={onChangeSearchName}
                            />
                        </Form.Group>
                        </Form> 
                    <div>
                        <Button
                            variant="primary"
                            type="button"
                            onClick={findByName}
                            className="searchButton"
                        >
                            Search
                        </Button>
                    </div>
                
                </div>
                    <div className="mainPage">
                        <div className="filters" aria-labelledby="filters-header">
                            <h4 className="filter-header">
                                Distance
                            </h4>
                            
                            <ul className="choices">
                                {distance.map(dis => {
                                    return (
                                        <label>
                                        <input key={dis}
                                            onChange={handleFilterChange}
                                            type="radio"
                                            value={dis} 
                                            checked={ parseInt(filter) === parseInt(dis) }
                                            />
                                        {" < " + dis + " miles"}
                                        </label>
                                    )
                                })}
                            
                            </ul>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={resetRadioState}
                                className="resetButton"
                                >
                                    reset
                            </Button>
                        </div>
               
                <div>
                <Row xs={1} md={4} className="resRow">
                    { restaurants.map((restaurant) => {
                        return(
                            <Col key={restaurant.business_id}>
                                <Card className="resListCard">
                                    <Card.Img
                                    className="smallPoster"
                                    src={restaurant.poster ? restaurant.poster : "/images/RestaurantSample.jpg"}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src="/images/RestaurantSample.jpg";
                                    }}
                                    />
                                    <Card.Body className="resContent">
                                        <div>
                                        <Card.Title className="cardTitle"> {restaurant.name} </Card.Title>
                                        <Card.Text>
                                            <ReactStars
                                                size={20}
                                                value={restaurant.stars}
                                                isHalf={true}
                                                edit={false}
                                                />
                                        </Card.Text>
                                        </div>
                                        <div>
                                        <Link to={"/restaurants/"+restaurant.business_id} className="detailLink">
                                            Show More
                                        </Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
                </div>
                </div>
                <br />
                <div className="footer">
                    <div className="showingpage">
                        Showing page: { currentPage + 1 }
                    </div>
                    <div>
                        <Button
                        variant="link"
                        onClick={() => { setCurrentPage(currentPage + 1)}}
                        className="next"
                        >
                            Next Page
                        </Button>
                </div>
                </div>
            </Container>
        </div>
    )
}


export default RestaurantsList;