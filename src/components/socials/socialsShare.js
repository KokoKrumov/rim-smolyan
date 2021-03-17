import React from 'react';
import SocialButton from "./socialsButton";

function SocialsShare({articleID, articleTitle}) {
    const article = {articleID, articleTitle}
    return (
        <div className='socials'>
            <div className='socials-item'>
                <SocialButton buttonType={'facebook-share'} {...article}/>
            </div>
            <div className='socials-item'>
                <SocialButton buttonType={'twitter-share'} {...article}/>
            </div>
        </div>
    )
}

export default SocialsShare;
