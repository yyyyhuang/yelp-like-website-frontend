import React, { useState } from 'react';
import MovieDataService from "../services/movies";
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';

const AddReview = ({ user }) => {
    const navigate = useNavigate();
    let params = useParams;

    let editing = false;
    let initialReviewState = "";
    // initialReviewState will have a different value
    // if we are editing an existing review

    const [review,  setReview] = useState(initialReviewState);

    const onChangeReview = e => {
        const review = e.target.value;
        setReview(review);
    }

    const saveReview = () => {
        var data = {
            review: review,
            name: user.name,
            user_id: user.googleId,
            movie_id: params.id
        }

        if (editing) {
            // TODO: handle case where an existing
            // review is being updated
        } else {
            MovieDataService.createReview(data)
                .then(response => {
                    navigate("/movies/"+params.id)
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }

    return ()
}