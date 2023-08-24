import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineStar } from 'react-icons/ai';
import { FaStarHalfAlt } from 'react-icons/fa';

function Rating(props) {
  const { rating, numReviews, caption } = props;
  return (
    <div className="rating">
      {rating >= 1 ? <span><AiFillStar/></span> : rating >= 0.5 ? <span><FaStarHalfAlt/></span> : <span><AiOutlineStar/></span>}
      {rating >= 2 ? <span><AiFillStar/></span> : rating >= 1.5 ? <span><FaStarHalfAlt/></span> : <span><AiOutlineStar/></span>}
      {rating >= 3 ? <span><AiFillStar/></span> : rating >= 2.5 ? <span><FaStarHalfAlt/></span> : <span><AiOutlineStar/></span>}
      {rating >= 4 ? <span><AiFillStar/></span> : rating >= 3.5 ? <span><FaStarHalfAlt/></span> : <span><AiOutlineStar/></span>}
      {rating >= 5
        ? <span><AiFillStar/></span>
        : rating >= 4.5
        ? <span><FaStarHalfAlt/></span>
        : <span><AiOutlineStar/></span>}{' '}
      <span>{numReviews} reviews</span>
    </div>
  );
}

export default Rating;
