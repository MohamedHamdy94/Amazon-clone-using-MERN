import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'

function Rating(props) {
    const { rating, numReviews } = props
    return (
        <div icon='rating' >
            <spane>
                <FontAwesomeIcon className='star' icon={
                    rating >= 1 ? faStar
                        : rating >= 0.5 ? faStarHalfAlt
                            : ''
                } />
            </spane>
            <spane>
                <FontAwesomeIcon className='star' icon={
                    rating >= 2 ? faStar
                        : rating >= 1.5 ? faStarHalfAlt
                            : ''
                } />
            </spane>
            <spane>
                <FontAwesomeIcon className='star' icon={
                    rating >= 3 ? faStar
                        : rating >= 2.5 ? faStarHalfAlt
                            : ''
                } />
            </spane>
            <spane>
                <FontAwesomeIcon className='star' icon={
                    rating >= 4 ? faStar
                        : rating >= 3.5 ? faStarHalfAlt
                            : ''
                } />
            </spane>
            <spane>
                <FontAwesomeIcon className='star' icon={
                    rating >= 5 ? faStar
                        : rating >= 4.5 ? faStarHalfAlt
                            : ''
                } />
            </spane>
            <span className='star mx-2'>{numReviews} Reviews</span>
        </div>
    )
}

export default Rating