import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ initialRating, onRatingChange }) => {
    const [rating, setRating] = useState(initialRating);

    const handleStarClick = (starIndex) => {
        const newRating = starIndex + 1;
        setRating(newRating);
        if (onRatingChange) {
            onRatingChange(newRating); // 부모 컴포넌트로 별점을 전달
        }
    };

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const starValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={starValue}
                            onClick={() => handleStarClick(index)}
                            style={{display:'none'}}
                        />
                        <FaStar
                            className="star"
                            color={starValue <= rating ? '#ffc107' : '#e4e5e9'}
                            size={25}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
