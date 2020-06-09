import React, { useState } from 'react';
import './../../../styles/rate_stars.css';

let stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


const RateStars = ({rateMovie, id, your_rate, setRateVisibleId, rateMovieRemove}) => {

    const [star, setnumberOfStars] = useState(null);

    return (
        <div className='rate_stars_container border'>
            <div className='rate_star_wrap' onMouseOut={() => setnumberOfStars(null)}>
            
            <div className='remove_rate border' onClick={() => {
                    setRateVisibleId(null);
                    rateMovieRemove({id});
                }
            }></div>
                {
                    stars.map((rate, index) => {
                        return (
                            <div
                                key={rate}
                                className={`rate_star ${index < your_rate ? 'active' : ''}${index == star ? ' red' : ''}`}
                                onMouseOver={() => setnumberOfStars(index)}
                                onMouseOut={() => {
                                    // if(rate <= 1) setnumberOfStars(0);
                                }}
                                onClick={() => {
                                   
                                    rateMovie({id, rate});
                                    // setRateVisibleId(null);
                                    setnumberOfStars(null);
                                }}
                               
                            >
                            </div>
                        )
                    })
                }
                {/* <div className='border'>({rate > 0 ? rate+1 : 0}){your_rate}</div> */}
                <div className='border'>{your_rate}</div>
            </div>

        </div>
    )
}


export default RateStars;