import React, {useState, useEffect} from "react";
import RestaurantDataService from "../services/restaurants";
import CollectionDataService from "../services/collections";
import NewCollection from "./NewCollection";
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
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
            <Container className="detailContainer">
                <div className="carouselContainer">
                    <Carousel cols={3} rows={1} gap={40} showDots={true} containerStyle={{height: "500px"}} loop> 
                        {restaurant.photos.length > 0 ? 
                            restaurant.photos.map((photo)=>{
                                return(
                                    <Carousel.Item>
                                        <img width="300px" height="500px" className="galleryImg" 
                                        src={photo.address} />
                                    </Carousel.Item> 
                                )
                            })
                            :
                        <Carousel.Item>
                                    <img width="300px" height="500px" className="galleryImg" src="/images/RestaurantSample.jpg" />
                        </Carousel.Item>
                        }

                    </Carousel>
                </div>


                <div className="busiInfoContainer">
                    <Card>
                        <Card.Header className="head">{restaurant.name}</Card.Header>
                        <Card.Body>
                            <Card.Text className="detailInfo">
                                Address: {restaurant.address + ", "}
                                {restaurant.city + ", "} {restaurant.state} {restaurant.postal_code + "\n"}
                                Categories: {restaurant.categories}
                                <ReactStars
                                        key={restaurant.stars}
                                        size={30}
                                        value={restaurant.stars}
                                        edit={false}
                                        isHalf={true}
                                        />
                            </Card.Text>
                                    

                            
                            <div className="flex-container">
                                <div>
                                    { user &&
                                        <Button href={"/restaurants/" + params.id + "/review"} className="detailButton">
                                            <b className="bi bi-star"> Write a review </b>
                                        </Button> }
                                </div>

                                <div>
                                    { user && 
                                        <Button className="detailButton" onClick={handleShow}>
                                            <b className="bi bi-bookmark"> Save </b>
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
                                            handleSave = { handleSave }
                                            />
                                            
                                            {
                                                collections.length > 0 ?
                                                <div>
                                                    { collections.map((collection) => {
                                                        return (
                                                            <div>
                                                                <Card>
                                                                    <Card.Body className="singleCollectionContainer">
                                                                        <Card.Text className="singleCollectionName">{collection.name}</Card.Text>
                                                                        { collection.favorites.includes(params.id) ?  
                                                                        <div>
                                                                            {/* <Button aria-disabled="true"> Save </Button> */}
                                                                            {/* <p>Saved</p> */}
                                                                            <Button onClick={ () =>{
                                                                                removeFromCollection(collection);
                                                                                handleClose()
                                                                            }} className="detailButton">Remove</Button>
                                                                        </div>
                                                                        :
                                                                            <Button onClick={ () => {
                                                                                addToCollection(collection);
                                                                                handleClose();
                                                                            }} className="detailButton">Save</Button>
                                                                        }
                                                                    </Card.Body>
                                                                    
                                                                </Card>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                :
                                                <div>
                                                    <p className="detailCollectionInfo">You do not have any collections yet.</p>
                                                </div>
                                            }
                                        </Modal.Body>
                                    </Modal>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    </div>
                    <div className="reviewsStart">Reviews</div>
                    <br></br>
                    { restaurant?.reviews.map((review, index) => {
                        
                        return (
                            <Col>
                                <div>
                                    <Card className="reviewDetailCard">
                                        <Card.Header className="reviewHeader">
                                            {review.user_name} reviewed on { moment(review.date).format("Do MMMM YYYY") }
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                {review.text}
                                            </Card.Text>
                                            { user && user.googleId === review.user_id &&
                                        <Row>
                                            <Col>
                                            <Link to={{
                                                pathname: "/restaurants/" + params.id + "/review"
                                            }}
                                            state = {{
                                                currentReview: review
                                            }} className="editDelete">
                                                Edit
                                            </Link>
                                            </Col>
                                            <Col>
                                                <Button variant="link" onClick={ () =>
                                                {
                                                    deleteReview(review.review_id, index)
                                                    
                                                }} className="editDelete">
                                                    Delete
                                                </Button>
                                            </Col>
                                        </Row>
                                    }
                                        </Card.Body>

                                    </Card>
                                </div>
                            </Col>
                        )
                    })}
            </Container>
        </div>
    )
}


export default Restaurant;