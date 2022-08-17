import UserDataService from "../services/users";
import RestaurantDataService from "../services/restaurants";
import moment from 'moment';
import React, { useState, useEffect, useCallback } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';

import "./UserProfile.css";

const UserProfile = ({
    user,
    x,
    y,
    collections
}) => {
    const [reviews, setReviews] = useState([]);
    const [reviewedRes, setReviewedRes] = useState([])
  
    const getReviews = useCallback(() => {
      UserDataService.get(user.googleId)
        .then(response => {
          setReviews(response.data.reviews);
        })
        .catch(e => {
          console.log(e);
        })
    }, [user]);

    // const getRestaurant = useCallback(() => {
    //         const ids = reviews.map(({ business_id }) => business_id);
    //         RestaurantDataService.findIds(ids)
    //             .then(response => {
    //                     let restaurants = response.map(res => res.data);
    //                     console.log(restaurants);
    //                     setReviewedRes(restaurants);

    //             })
    //             .catch(e => {
    //                 console.log(e);
    //             })
    // }, []);

    useEffect(()=> {
        if (user) {
            getReviews();
        }
      },[user]);

    // useEffect(() => {
    //     if(reviews) {
    //         getRestaurant();
    //     }
    // }, [reviews]);


  return (
    <div className="user">
      <MDBContainer className="userContainer py-5 h-100">
        <MDBRow className="banner h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="userInfo rounded-top text-white" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="left-banner ms-4 mt-5">
                  <MDBCardImage src="/images/person.svg" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }}/>
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{user.name}</MDBTypography>
                  <MDBCardText>{user.email}</MDBCardText>
                </div>
                <div>

                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">{collections.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Collections</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{reviews.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Reviews</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent Activities</MDBCardText>
                </div>
                {
                reviews.length>0 ? 
                <div>
                  {reviews.map((review) => {
                    return (
                          <div>
                              <MDBCard>
                                <MDBCardText className="h5">
                                You made reviews on { moment(review.date).format("Do MMMM YYYY") }
                                </MDBCardText>
                                <MDBCardText>
                                {review.text}
                                </MDBCardText>
                              </MDBCard>
                          </div>
                  
                         )
                    })}
                  </div> 
                : 
                <div>
                    <span>You haven't write any reviews.</span>
                </div>
            }
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default UserProfile;