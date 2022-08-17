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
  
    const getReviews = useCallback(() => {
      UserDataService.get(user.googleId)
        .then(response => {
          setReviews(response.data.reviews);
        })
        .catch(e => {
          console.log(e);
        })
    }, [user]);


    useEffect(()=> {
        if (user) {
            getReviews();
        }
      },[user]);



  return (
    <div className="user">
      <MDBContainer className="userContainer py-5 h-100">
        <MDBRow className="banner h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="userInfo rounded-top text-white" style={{ backgroundColor: '#253b56', height: '200px' }}>
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
                  <MDBCardText className="mbdNav">Recent Activities</MDBCardText>
                </div>
                {
                reviews.length>0 ? 
                <div>
                  {reviews.map((review) => {
                    return (
                          <div>
                              <MDBCard className="reviewCard">
                                <MDBCardBody className="content">
                                <MDBCardText className="mbdTitle">
                                You made reviews on { moment(review.date).format("Do MMMM YYYY") }
                                </MDBCardText>
                                <MDBCardText className="mbdText">
                                {review.text}
                                </MDBCardText>
                                </MDBCardBody>

                              </MDBCard>
                          </div>
                  
                         )
                    })}
                  </div> 
                : 
                <div>
                    <span className="info">You haven't write any reviews.</span>
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