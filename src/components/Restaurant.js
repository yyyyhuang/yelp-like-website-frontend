import React, {useState, useEffect} from "react";
import RestaurantDataService from "../services/restaurants";
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import ReactStars from 'react-rating-stars-component';
import Dropdown from 'react-bootstrap/Dropdown';

import "./Restaurant.css";

const Restaurant = ({ user }) => {

    let params = useParams();


    const [restaurant, setRestaurant] = useState({
        id: null,
        name: "",
        stars: 0,
        reviews: []
    });

    useEffect(() => {
        const getRestaurant = id => {
                RestaurantDataService.findId(id)
                    .then(response => {
                        setRestaurant(response.data);
                        // console.log(response.data.stars)
                    })
                    .catch(e => {
                        console.log(e);
                    });
        }
        // console.log(params);
        getRestaurant(params.id)
    }, [params.id]);


    const deleteReview = (reviewId, index) => {

        var data = {
            user_id: user.googleId,
            review_id: reviewId
        }
        
        RestaurantDataService.deleteReview(data)
            .then(response => {
                console.log("data:"+data)
                setRestaurant((prevState) => {
                    prevState.reviews.splice(index, 1);
                    return ({
                      ...prevState
                    })
                  })
            })
            .catch(e => {
                console.log(e)
            })
    }


    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <div className="poster">
                        <Image
                        className="bigPicture"
                        src={restaurant.poster+"/100px250"}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src="/images/RestaurantSample.jpg";
                        }}
                        fluid />
                    </div>
                    </Col>
                    <Col>
                    <Card>
                        <Card.Header as="h5">{restaurant.name}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {restaurant.address + ", "}
                                {restaurant.city + ", "} {restaurant.state} {restaurant.postal_code}
                            </Card.Text>

                            <ReactStars
                                size={30}
                                value={restaurant.stars}
                                isHalf={true}
                                edit={false}
                            />


                            {/*TODO: Button onClick function */}                         
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Save to Collection
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Colelction1</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Colelction2</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Colelction3</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="#/action-3">New Collection</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            { user &&
                                <Link to={"/restaurants/" + params.id + "/review"}>
                                    Add Review
                                    </Link> }
                        </Card.Body>
                    </Card>
                    <h2>Reviews</h2>
                    <br></br>
                    { restaurant?.reviews.map((review, index) => {
                        return (
                            <div className="d-flex">
                                <div className="flex-shrink-0 reviewsText">
                                    <h5>{" reviewed on"} { moment(review.date).format("Do MMMM YYYY") }</h5>
                                    <p className="review">{review.text}</p>
                                    { user && user.googleId === review.user_id &&
                                        <Row>
                                            <Col>
                                            <Link to={{
                                                pathname: "/restaurants/" + params.id + "/review"
                                            }}
                                            state = {{
                                                currentReview: review
                                            }} >
                                                Edit
                                            </Link>
                                            </Col>
                                            <Col>
                                                <Button variant="link" onClick={ () =>
                                                {
                                                    // TODO: IMPLEMENT DELETE BEHAVIOR
                                                    deleteReview(review._id, index)
                                                    
                                                }}>
                                                    Delete
                                                </Button>
                                            </Col>
                                        </Row>
                                    }
                                </div>
                            </div>
                        )
                    })}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export default Restaurant;