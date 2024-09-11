import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";

import React, { useState } from 'react'

export default function UserProfileReviews({ reviews, me }) {
    const [addReview, setAddReview] = useState(false);
    return (
        <div className='user-profile-reviews'>
            <span>
                <h2>Reviews <span>({reviews.length})</span></h2>
                {!me && <div onClick={() => { setAddReview(true) }}
                >
                    <FontAwesomeIcon
                        icon={faPlus}
                    />Add Review
                </div>}
            </span>
            <div>
                <div>
                    {reviews.map(review => {
                        console.log(review.rating)
                        return (
                            <div className='review-container' key={review._id}>
                                <div className='reviewer-tag'>
                                    <img src={review.reviewerId.picture} />
                                    <div>
                                        <h4>{review.reviewerId.displayName}</h4>
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
            </div>
        </div>
    )
}
