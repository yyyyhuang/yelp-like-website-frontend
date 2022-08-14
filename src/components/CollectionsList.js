import Button from 'react-bootstrap/Button';
import React, { useState, useEffect, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';

import CollectionDataService from "../services/collections";
import "./CollectionsList.css";

const CollectionsList = ({
    user,
}) => {
    const [collections, setCollections] = useState([]);

    const getCollections = useCallback((id) => {
        if (id) {
            CollectionDataService.get(id)
            .then(response => {
                setCollections(response.data.collections);
            })
            .catch(e => {
                console.log(e);
            })
        }
    }, [])

    useEffect(() => {
        getCollections(user.googleId);
    }, [getCollections, user]);

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
                        <Button variant='light' size='sm'>
                            Create a Collection
                        </Button>
                    </div>
                </div>

                <div className='collectionsPanel'>
                {
                    collections && collections.length > 0 ?
                    <span>My collections</span> :
                    <span>You haven't create any collections yet</span>
                }    
                </div>

                {
                collections.length > 0 ?
                <div>

                </div>
                :
                <div></div>
                }
            </Container>
        </div>
    )
}

export default CollectionsList;