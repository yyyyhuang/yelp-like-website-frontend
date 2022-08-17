import React, {useState, useEffect} from "react";
import RestaurantDataService from "../services/restaurants";
import CollectionDataService from "../services/collections";
import NewCollection from "./NewCollection";
// import UserDataService from "../services/users";
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import Carousel from 'better-react-carousel';

import "./Restaurant.css";

const Restaurant = ({ user, collections, handleSave }) => {

    let params = useParams();


    const [restaurant, setRestaurant] = useState({
        id: null,
        name: "",
        stars: 0,
        reviews: [],
        photos:[]
    });

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
      }
    const handleClose = () => {
    setShow(false);
    }

    const addToCollection = (collection) => {
        const cur = collection.favorites ? collection.favorites : [];
        const newFav = [...cur, params.id];
        var data = {
            _id: collection._id,
            user_id: user.googleId,
            name: collection.name,
            favorites: newFav,
        }
        CollectionDataService.updateCollection(data)
            .catch(e => {
                console.log(e);
            });
    }

    const removeFromCollection = (collection) => {
        const cur = collection.favorites;
        const newFav = cur.filter(f => f !== params.id);
        var data = {
            _id: collection._id,
            user_id: user.googleId,
            name: collection.name,
            favorites: newFav,
        }
        CollectionDataService.updateCollection(data)
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        const getRestaurant = id => {
                RestaurantDataService.findId(id)
                    .then(response => {
                        setRestaurant(response.data);
                        // console.log(response.data.photo);
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
                // console.log("data:"+data)
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
                    <Carousel cols={3} rows={1} gap={10} showDots={true} containerStyle={{height: "500px"}} loop>
                        {restaurant.photos.map((photo)=>{
                            return(
                               <Carousel.Item>
                                    <img width="400px"  src={photo.address} />
                               </Carousel.Item> 
                            )
                        })}
                    </Carousel>
                    </Col>
                    <Col>
                    <Card>
                        <Card.Header as="h5">{restaurant.name}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {restaurant.address + ", "}
                                {restaurant.city + ", "} {restaurant.state} {restaurant.postal_code}
                                <ReactStars
                                        key={restaurant.stars}
                                        size={30}
                                        value={restaurant.stars}
                                        edit={false}
                                        isHalf={true}
                                        />
                            </Card.Text>
                                    

                            

                            {/*TODO: Button onClick function */}
                            <div className="flex-container">
                                <div>
                                    { user &&
                                        <Button href={"/restaurants/" + params.id + "/review"} className="reviewButton">
                                            <b class="bi bi-star"> Write a review </b>
                                        </Button> }
                                </div>
                                <div>
                                    { user && 
                                        <Button className="reviewButton" onClick={handleShow}>
                                            <b class="bi bi-bookmark"> Save </b>
                                        </Button>
                                     }
                                        <Modal
                                            show={show}
                                            aria-labelledby="contained-modal-title-v-center"
                                            centered
                                            onHide={handleClose}
                                        >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Save to Collection</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <NewCollection 
                                            user = { user } 
                                            handleSave = { handleSave }/>
                                            {
                                                collections.length > 0 ?
                                                <div>
                                                    { collections.map((collection) => {
                                                        return (
                                                            <div>
                                                                <Card>
                                                                    <Card.Body className="singleCollectionContainer">
                                                                        <Card.Text>{collection.name}</Card.Text>
                                                                        { collection.favorites.includes(params.id) ?  
                                                                        <div>
                                                                            {/* <Button aria-disabled="true"> Save </Button> */}
                                                                            {/* <p>Saved</p> */}
                                                                            <Button onClick={ () =>{
                                                                                removeFromCollection(collection);
                                                                                handleClose()
                                                                            }  }>Remove</Button>
                                                                        </div>
                                                                        :
                                                                            <Button onClick={ () => {
                                                                                addToCollection(collection);
                                                                                handleClose();
                                                                            }}>Save</Button>
                                                                        }
                                                                    </Card.Body>
                                                                    
                                                                </Card>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                :
                                                <div>
                                                    <p>You do not have any collections yet.</p>
                                                </div>
                                            }
                                        </Modal.Body>
                                        <Modal.Footer>
                                            {/* <NewCollection 
                                            user = { user } 
                                            handleSave = { handleSave }/> */}
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <h2>Reviews</h2>
                    <br></br>
                    { restaurant?.reviews.map((review, index) => {
                        // const reviewUser = UserDataService.get(review.user_id);
                        return (
                            <div className="d-flex">
                                <div className="flex-shrink-0">
                                    <Card className="reviewCard">
                                        <Card.Header as="h5">
                                            {review.user_name} reviewed on { moment(review.date).format("Do MMMM YYYY") }
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text className="reviewsText">
                                                {review.text}
                                            </Card.Text>
                                        </Card.Body>

                                    </Card>
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
                                                    deleteReview(review.review_id, index)
                                                    
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