import React from 'react';
import SocialButton from "./socialsButton";

function Socials({ light = false }) {

    return (
        <div className={`socials ${light ? 'socials--light' : ''}`}>
            <div className='socials-item'>
                <SocialButton buttonType={'facebook-link'} />
            </div>
            <div className='socials-item'>
                <SocialButton buttonType={'twitter-link'} light={light} />
            </div>
            <div className='socials-item'>
                <SocialButton buttonType={'instagram-link'} />
            </div>
            <div className='socials-item'>
                <SocialButton buttonType={'youtube-link'} />
            </div>
        </div>
    )
}

export default Socials;
