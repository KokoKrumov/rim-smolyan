import React from 'react';
import {
    FacebookShareButton,
    InstapaperShareButton,
    TwitterShareButton,
} from "react-share";

function SocialsShare({articleID, articleTitle}) {

    return (
        <div className='socials'>
            <div className='socials-item'>
                <FacebookShareButton
                    // process.env.REACT_APP_DOMAIN
                    url={`${process.env.REACT_APP_API_URL}/news/${articleID}`}
                    quote={articleTitle}
                    hashtag={'#museumsmolyan'}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M15.1172 0H0.882759C0.395224 0 0 0.395224 0 0.882759V15.1172C0 15.6048 0.395224 16 0.882759 16H8.55172V9.81241H6.46897V7.39034H8.55172V5.60828C8.55172 3.54207 9.81517 2.41655 11.6579 2.41655C12.2789 2.4152 12.8995 2.44651 13.5172 2.51034V4.67034H12.2483C11.2441 4.67034 11.0483 5.14483 11.0483 5.84552V7.38759H13.4483L13.1366 9.80966H11.0345V16H15.1172C15.6048 16 16 15.6048 16 15.1172V0.882759C16 0.395224 15.6048 0 15.1172 0Z"/>
                        </g>
                    </svg>
                </FacebookShareButton>
            </div>
            <div className='socials-item'>
                <TwitterShareButton
                    windowWidth='800px'
                    windowHeight='600px'
                    url={`${process.env.REACT_APP_API_URL}/news/${articleID}`}
                    title={articleTitle}
                >
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M2.5 16H14.5C15.604 16 16.5 15.104 16.5 14V2C16.5 0.896 15.604 0 14.5 0H2.5C1.396 0 0.5 0.896 0.5 2V14C0.5 15.104 1.396 16 2.5 16ZM12.48 6.228C12.48 8.936 10.416 12.064 6.644 12.064C5.488 12.064 4.408 11.724 3.504 11.148C3.664 11.168 3.828 11.176 3.992 11.176C4.952 11.176 5.836 10.848 6.54 10.296C5.644 10.28 4.884 9.688 4.624 8.872C4.748 8.896 4.876 8.908 5.008 8.908C5.196 8.908 5.376 8.884 5.548 8.836C4.612 8.648 3.904 7.816 3.904 6.824V6.796C4.18 6.948 4.496 7.04 4.832 7.052C4.284 6.684 3.92 6.056 3.92 5.344C3.92 4.968 4.02 4.616 4.196 4.312C5.208 5.552 6.72 6.372 8.424 6.456C8.392 6.304 8.372 6.148 8.372 5.988C8.372 4.856 9.292 3.936 10.424 3.936C11.012 3.936 11.544 4.184 11.92 4.584C12.388 4.492 12.828 4.324 13.224 4.088C13.068 4.568 12.744 4.972 12.32 5.224C12.736 5.172 13.132 5.064 13.5 4.9C13.224 5.312 12.876 5.676 12.476 5.964C12.48 6.05198 12.48 6.13996 12.48 6.22794V6.228Z"/>
                        </g>
                    </svg>
                </TwitterShareButton>
            </div>
        </div>
    )
}

export default SocialsShare;
