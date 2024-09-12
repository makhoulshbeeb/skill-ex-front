import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faPlus, faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";

import React, { useRef, useState } from 'react'
import { useGetUserByTokenQuery, usersApi } from '../../api/UsersApi'
import { useSendReviewMutation } from '../../api/ReviewsApi';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

var isFalse = false;
export default function UserProfileReviews({ reviews, me, user }) {
    const [addReview, setAddReview] = useState(false);
    const ref = useRef();
    const dispatch = useDispatch();

    const { data: viewer } = useGetUserByTokenQuery();
    var [submitReview, { data: submittedReview, isLoading, isSuccess, isError, error }] = useSendReviewMutation();
    const [rating, setRating] = useState(0);

    if (isLoading) {
        toast.dismiss(error);
        toast.loading("Loading...", {
            id: "loading"
        });
        isFalse = false;
    }
    if (isSuccess != isFalse) {
        toast.dismiss("loading");
        toast.success("Review submitted!", {
            id: "success"
        });
        dispatch(usersApi.util.invalidateTags(['Information']));
        isFalse = true;
        setTimeout(() => { setAddReview(false) }, 500);
    }
    if (isError != isFalse) {
        toast.dismiss("loading");
        toast.error(error.data.error, {
            id: "error"
        });
        isFalse = true;
    }

    return (
        <div className='user-profile-reviews'>
            <span>
                <h2>Reviews <span>({reviews.length})</span></h2>
                {!me && <div className='add-reviews-button' onClick={() => { setAddReview(true) }}
                >
                    <FontAwesomeIcon
                        icon={faPlus}
                    />Add Review
                </div>}
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
            <dialog open={addReview} className='add-reviews-panel'>
                <div><div className='reviewer-tag'>
                    <img src={viewer.picture} />
                    <div>
                        <h4>{viewer.displayName}</h4>
                        <div className="user-page-rating add-rating">
                            {[5, 4, 3, 2, 1].map((el) => {
                                if (rating - el >= 0) {
                                    return (<FontAwesomeIcon icon={faStar} id={`star${el}`} color="gold" onClick={() => setRating(el)} />)
                                } else if (rating - el <= -1) {
                                    return (<FontAwesomeIcon icon={faStarOutline} id={`star${el}`} color="gold" onClick={() => setRating(el)} />)
                                } else {
                                    return (<FontAwesomeIcon icon={faStarHalfStroke} id={`star${el}`} color="gold" onClick={() => setRating(el)} />)
                                }

                            })}
                        </div>
                    </div>
                </div>
                    <textarea placeholder='Write some feedback...' ref={ref}></textarea>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div className='add-reviews-button' style={{ backgroundColor: "var(--background-light)", color: "var(--primary-color)", scale: "0.9" }} onClick={() => setAddReview(false)}>Cancel</div>
                        <div className='add-reviews-button' style={{ scale: "0.9" }}
                            onClick={() => {
                                rating == 0
                                    ? toast.error("No rating was provided", {
                                        id: "error"
                                    })
                                    : ref.current.value.trim() == ''
                                        ? toast.error("No feedback was provided", {
                                            id: "error"
                                        })
                                        : submitReview({ receiverId: user._id, rating, feedback: ref.current.value });

                            }}
                        >Submit
                        </div>
                    </div>
                </div></dialog>
        </div>
    )
}
