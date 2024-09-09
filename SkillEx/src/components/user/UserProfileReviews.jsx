import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";

import React from 'react'

export default function UserProfileReviews({ reviews }) {
    console.log(reviews)
    return (
        <div className='user-profile-reviews'>
            <h2>Reviews</h2>
            {reviews.map(review => {
                console.log(review.rating)
                return (
                    <div className='review-container' key={review._id}>
                        <div className='reviewer-tag'>
                            <img src="https://avatar.iran.liara.run/public/boy?username=potentialwoo" />
                            <div>
                                <h4>{review.reviewerId}</h4>
                                <div className="user-page-rating">
                                    {[1, 2, 3, 4, 5].map((el) => {
                                        if (review.rating - el >= 0) {
                                            return (<FontAwesomeIcon icon={faStar} color="gold" />)
                                        } else if (review.rating - el <= -1) {
                                            return (<FontAwesomeIcon icon={faStarOutline} color="gold" />)
                                        } else {
                                            return (<FontAwesomeIcon icon={faStarHalfStroke} color="gold" />)
                                        }

                                    })}
                                </div>
                            </div>
                        </div>
                        <p>{review.feedback}</p>
                    </div>
                )
            })}
        </div>
    )
}
