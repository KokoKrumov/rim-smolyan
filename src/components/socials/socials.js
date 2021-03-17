import React from 'react';
import SocialButton from "./socialsButton";

function Socials() {

    return (
        <div className='socials'>
            <div className='socials-item'>
                <SocialButton buttonType={'facebook-link'} />
            </div>
            <div className='socials-item'>
                <SocialButton buttonType={'twitter-link'} />
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
