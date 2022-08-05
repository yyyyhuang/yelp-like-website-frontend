import React, { useState, useEffect, useCallback} from "react";
import RestaurantDataService from "../services/restaurants";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import { BsStar, BsStarFill } from "react-icons/bs";


import "./MoviesList.css";


const MoviesList = ({
    user,
    favorites,
    addFavorite,
    deleteFavorite
}) => {
    // useState to set state values
    const [movies, setMovies] = useState([]); // syntax const [<state_name>, <setter_name>] = useState(<initial state_value>)
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRating, setSearchRating] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] = useState("");

    // useCallback to define functions which should
    // only be created once and will be dependencies for
    // useEffect
    const retrieveRatings = useCallback(() => {
        RestaurantDataService.getRatings() // calls getRatings to get a l ist of possible ratings
            .then(response => {
                setRatings(["All Ratings"].concat(response.data))
            })
            .catch(e => {
                console.log(e);
            });
    }, []); // empty array passed as the second argument of useCallback indicates that this function does not have any dependencies

    const retrieveMovies = useCallback(() => {
        setCurrentSearchMode("");
        RestaurantDataService.getAll(currentPage)
            .then(response => {
                setMovies(response.data.movies);
                setCurrentPage(response.data.page);
                setEntriesPerPage(response.data.entries_per_page);
            })
            .catch(e => {
                console.log(e);
            });
    }, [currentPage]); // dependency currentPage which determines which set of 20 movies it will retrieve

    const find = useCallback((query, by) => {
        RestaurantDataService.find(query, by, currentPage)
            .then(response => {
                setMovies(response.data.movies);
            })
            .catch(e => {
                console.log(e);
            });
    }, [currentPage]);

    const findByTitle = useCallback(() => {
        setCurrentSearchMode("findByTitle");
        find(searchTitle, "title");
    }, [find, searchTitle]);

    const findByRating = useCallback(() => {
        setCurrentSearchMode("findByRating");
        if (searchRating === "All Ratings") {
            retrieveMovies();
        } else {
            find(searchRating, "rated");
        }
    }, [find, searchRating, retrieveMovies]);

    const retrieveNextPage = useCallback(() => {
        if (currentSearchMode === "findByTitle") {
            findByTitle();
        } else if (currentSearchMode === "findByRating") {
            findByRating();
        } else {
            retrieveMovies();
        }
    }, [currentSearchMode, findByTitle, findByRating, retrieveMovies]);


    // use effect to carry out side effect functionality
    useEffect(() => {
        retrieveRatings();
    }, [retrieveRatings]);

    useEffect(() => {
        setCurrentPage(0);
    }, [currentSearchMode]);

    // Retrieve the next page if the currentPage value changes
    useEffect(() => {
        retrieveNextPage();
    }, [currentPage, retrieveNextPage]);


    // other functions that are not depended on by useEffect
    const onChangeSearchTtitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

    const onChangeSearchRating = e => {
        const searchRating = e.target.value;
        setSearchRating(searchRating);
    }



    return (
        <div className="App">
            <Container className="main-container">
                <Form>
                    <Row>
                        <Col>
                        <Form.Group className="mb-3">
                            <Form.Control
                            type="text"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={onChangeSearchTtitle}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </Button>
                        </Col>
                        <Col>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="select"
                                onChange={onChangeSearchRating}
                            >
                                { ratings.map((rating, i) => {
                                    return (
                                        <option value={rating}
                                        key={i}>
                                            {rating}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="button"
                            onClick={findByRating}
                        >
                            Search
                        </Button>
                        </Col>
                    </Row>
                </Form> 
                
                <Row className="movieRow">
                    { movies.map((movie) => {
                        return(
                            <Col key={movie._id}>
                                <Card className="moviesListCard">
                                    { user && (
                                        favorites.includes(movie._id) ?
                                        <BsStarFill style={{ position: 'absolute', top: 0, left: 0}} className="star starFill" onClick={() => {
                                        deleteFavorite(movie._id);
                                        }} />
                                        :
                                        <BsStar style={{ position: 'absolute', top: 0, left: 0}} className="star starEmpty" onClick={() => {
                                            addFavorite(movie._id);
                                        }} />
                                    )}
                                    <Card.Img
                                    className="smallPoster"
                                    src={movie.poster+"/100px180"}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src="/images/NoPosterAvailable-crop.jpg";
                                    }}
                                    />
                                    <Card.Body>
                                        <Card.Title> {movie.title} </Card.Title>
                                        <Card.Text>
                                            Rating: {movie.rated}
                                        </Card.Text>
                                        <Card.Text>
                                            {movie.plot}
                                        </Card.Text>
                                        <Link to={"/movies/"+movie._id}>
                                            View Reviews
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


export default MoviesList;