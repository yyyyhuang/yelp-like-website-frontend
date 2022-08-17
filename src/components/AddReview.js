import React, { useState } from 'react';
import RestaurantDataService from "../services/restaurants";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import ReactStars from "react-rating-stars-component";
import { v4 as uuid } from 'uuid';

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
    const [stars, setStars] = useState(0);

    const onChangeReview = e => {
        const review = e.target.value;
        setReview(review);
    }
    {/* TO: RANDOM REVIEW ID */}
    const saveReview = () => {
        var data = {
            text: review,
            user_id: user.googleId,
            business_id: params.id, // get movie id from url
            stars: stars
        }

        if (editing) {
            // TODO: handle case where an existing
            // review is being updated
            data = {...data, review_id: location.state.currentReview.review_id};
            RestaurantDataService.updateReview(data)
                .then(response => {
                    navigate("/restaurants/"+params.id);
                    console.log(location.state.currentReview);
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            const unique_id = uuid();
            const small_id = unique_id.slice(0,22);
            data = {...data, review_id: small_id};
            RestaurantDataService.createReview(data)
                .then(response => {
                    navigate("/restaurants/"+params.id)
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
            <ReactStars
                    size={50}
                    count={5}
                    color={"grey"}
                    activeColor={"yellow"}
                    value={7.5}
                    a11y={true}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star" />}
                    halfIcon={<i className="fa fa-star-half-alt" />}
                    filledIco={<i className="fa fa-star" />}
                    onChange={ (newValue) => {
                      console.log(`Example 2: new value is ${newValue}`);
                      setStars(newValue);
                    }}
                />
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