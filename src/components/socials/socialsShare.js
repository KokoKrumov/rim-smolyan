import React from 'react';
import SocialButton from "./socialsButton";

function SocialsShare({articleID, articleTitle, page}) {
    const url = window.location.protocol + '//' + window.location.hostname + window.location.pathname
    const hashtag = '#museumsmolyan'
    const data = {articleID, articleTitle, url, hashtag}
    return (
        <div className='socials'>
            <div className='socials-item'>
                <SocialButton buttonType={`facebook-share__${page}`} {...data}/>
            </div>
            <div className='socials-item'>
                <SocialButton buttonType={`twitter-share__${page}`} {...data}/>
            </div>
        </div>
    )
}

export default SocialsShare;
