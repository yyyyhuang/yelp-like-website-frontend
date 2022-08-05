import React, { useState } from 'react';
import RestaurantDataService from "../services/restaurants";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';

const AddReview = ({ user }) => {
    const navigate = useNavigate();
    let params = useParams();
    let location = useLocation();

    let editing = false;
    let initialReviewState = "";
    // initialReviewState will have a different value
    // if we are editing an existing review

    if (location.state !== null) {
        editing = true;
        initialReviewState=location.state.currentReview.review;
    }

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
            movie_id: params.id // get movie id from url
        }

        if (editing) {
            // TODO: handle case where an existing
            // review is being updated
            data = {...data, review_id: location.state.currentReview._id};
            RestaurantDataService.updateReview(data)
                .then(response => {
                    navigate("/movies/"+params.id);
                    console.log(location.state.currentReview);
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            RestaurantDataService.createReview(data)
                .then(response => {
                    navigate("/movies/"+params.id)
                    editing = true;
                    console.log(editing)
                })
                .catch(e => {
                    console.log(e)
                });
        }
    }

    return (
        <Container className="main-container">
            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label>{ editing ? "Edit" : "Create" } Review</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        review={ review }
                        onChange={ onChangeReview }
                        defaultValue={ editing ? initialReviewState : ""}
                        />
                </Form.Group>
                <Button variant='primary' onClick={ saveReview }>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AddReview;