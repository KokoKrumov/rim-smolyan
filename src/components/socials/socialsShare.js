import React from 'react';
import SocialButton from "./socialsButton";

function SocialsShare({articleID, articleTitle, page , url}) {
    const article = {articleID, articleTitle, page , url}
    return (
        <div className='socials'>
            <div className='socials-item'>
                <SocialButton buttonType={`facebook-share__${article.page}`} {...url} {...article}/>
            </div>
            <div className='socials-item'>
                <SocialButton buttonType={`twitter-share__${article.page}`} {...url} {...article}/>
            </div>
        </div>
    )
}

export default SocialsShare;
