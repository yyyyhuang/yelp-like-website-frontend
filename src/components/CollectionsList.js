import Button from 'react-bootstrap/Button';
import React, { useState, useEffect, useCallback } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import NewCollection from './NewCollection';
import RestaurantDataService from "../services/restaurants";

import CollectionDataService from "../services/collections";
import "./CollectionsList.css";


const CollectionsList = ({
    user,
    collections,
    handleSave,
}) => {

    return (
        <div>
            <Container className='collectionsContainer'>
                <div className="collectionsNav">
                    <div className="collectionsTitle">
                        <span>
                            My Collections
                        </span>
                    </div>
                    <div>
                        <NewCollection 
                        user = { user }
                        handleSave = { handleSave }
                        />
                    </div>
                </div>

                <div className='collectionsPanel'>
                {
                    collections && collections.length > 0 ?
                    <div></div>:
                    <span className="info">You haven't create any collections yet</span>
                }    
                </div>

                {
                collections.length > 0 ?
                <div>
                    <Row xs={1} md={3} className="grid">
                    { collections.map((collection, index) => {
                        return (
                            
                                <Col>
                                    <div>
                                        <Card as="a" href={"/collections/"+collection._id} className="collectionCard">
                                            <Card.Img
                                            className="cardPoster"
                                            src={"/images/RestaurantSample.jpg"}
                                            />
                                            <Card.Body className="cardContent">
                                            <Card.Title className="cardTitle">{collection.name}</Card.Title>
                                            <Card.Text className="cardInfo">{collection.favorites.length} {collection.favorites.length > 0 ? "Places" : "Place"}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                            </Col>
                            
                        )
                    })}
                    </Row>
                </div>
                :
                <div></div>
                }
            </Container>
        </div>
    )
}

export default CollectionsList;