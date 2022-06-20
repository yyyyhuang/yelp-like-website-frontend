import React, { useState, useEffect, useCallback} from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';

import "./MoviesList.css";


const MoviesList = props => {
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
        MovieDataService.getRatings() // calls getRatings to get a l ist of possible ratings
            .then(response => {
                setRatings(["All Ratings"].concat(response.data))
            })
            .catch(e => {
                console.log(e);
            });
    }, []); // empty array passed as the second argument of useCallback indicates that this function does not have any dependencies

    const retrieveMovies = useCallback(() => {
        setCurrentSearchMode("");
        MovieDataService.getAll(currentPage)
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
        MovieDataService.find(query, by, currentPage)
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
}


export default MoviesList;