import React, { useState } from 'react';
import './../../../styles/rate_stars.css';

let stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


const RateStars = ({rateMovie, id, your_rate, setRateVisibleId}) => {

    const [rate, setnumberOfStars] = useState(your_rate ? your_rate : 0);



    return (
        <div className='rate_stars_container border'>
            <div className='rate_star_wrap'>
            <div className='border'>X</div>
                {
                    stars.map((star, index) => {
                        return (
                            <div
                                key={star}
                                className={`rate_star ${index < rate ? 'active' : ''}`}
                                onMouseOver={() => {
                                    setnumberOfStars(star);
                                    // console.log(star);
                                }
                                }
                                onMouseOut={() => {
                                    if(rate <= 1)
                                    setnumberOfStars(0)
                                }}
                                onClick={() => {
                                    rateMovie({id, rate});
                                    setRateVisibleId(null);
                                }}
                               
                            >
                            </div>
                        )
                    })
                }
                <div className='border'>({rate}){your_rate}</div>
            </div>

        </div>
    )
}


export default RateStars;