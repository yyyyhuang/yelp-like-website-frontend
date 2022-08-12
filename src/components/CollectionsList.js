import React, { useState, useEffect, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';

import CollectionDataService from "../services/collections";
import "./CollectionsList.css";

const CollectionsList = ({
    user,
}) => {
    const [collections, setCollections] = useState([]);

    const getCollectiions = useCallback((id) => {
        if (id) {
            CollectionDataService.get(id)
            .then(response => {
                let curCollections = response.map(res => res.data);
                setCollections(curCollections);
            })
            .catch (e => {
                console.log(e)
            })
        }
    }, [])

    useEffect(() => {
        getCollectiions(user.user_id);
    }, [getCollectiions, user]);

    return (
        <div>
            <Container className='collectionsContainer'>
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