import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faPlus, faStar, faStarHalfStroke, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";

import { useRef, useState } from 'react'
import { useGetUserByTokenQuery, usersApi } from '../../api/UsersApi'
import { useSendReviewMutation } from '../../api/ReviewsApi';
import toast from 'react-hot-toast';
import Searchbar from '../common/Searchbar';

var isFalse = false;
export default function UserAdminReviews({ reviews, setDeletePopup, setReview }) {
    return (
        <div className='user-profile-reviews' style={{ width: '35%' }}>
            <span className='admin-reviews-search'>
                <h2>Reviews <span>({reviews.length})</span></h2>
                <div style={{ width: '60%' }}><Searchbar placeholder={'Search Reviews'} /></div>
            </span>
            <div>
                <div>
                    {reviews.map(review => {
                        return (
                            <div className='review-container' key={review._id}>
                                <div className='reviewer-tag'>
                                    <img src={review.reviewerId.picture} />
                                    <div>
                                        <h4>{review.reviewerId.displayName}</h4>
                                        <div className="user-page-rating">
                                            {[1, 2, 3, 4, 5].map((el) => {
                                                if (review.rating - el >= 0) {
                                                    return (<FontAwesomeIcon icon={faStar} color="gold" key={el} />)
                                                } else if (review.rating - el <= -1) {
                                                    return (<FontAwesomeIcon icon={faStarOutline} color="gold" key={el} />)
                                                } else {
                                                    return (<FontAwesomeIcon icon={faStarHalfStroke} color="gold" key={el} />)
                                                }

                                            })}
                                        </div>
                                    </div>
                                    <div className="svg" style={{ marginLeft: 'auto' }} onClick={() => { setReview(review); setDeletePopup(true) }}>
                                        <FontAwesomeIcon icon={faTrashAlt} color="tomato" />
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
