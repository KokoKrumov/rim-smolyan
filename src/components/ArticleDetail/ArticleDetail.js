import React from 'react';
import Col from "react-bootstrap/cjs/Col";


function ArticleDetail({article}) {

    if (article) {
        return (
            <div>
                <h2 className='h2'>{article.title}</h2>
                <p className='h-sup'>{article.place}</p>
                <div className='nae-item__img__wrap image__article-detail'>
                    {
                        article.dateD && article.type === 'event'
                            ?
                            <div className="nae-item__date__wrap">
                                <p className="nae-item__date-day">{article.dateD}</p>
                                <p className="nae-item__date-month">{article.dateM}</p>
                            </div>
                            :
                            null

                    }

                    <img className="img-fluid" src={article.imageDetail} alt="" itemprop="image"/>
                </div>
                <div>
                    <p className='paragraph-2'>
                        {article.text}
                    </p>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <p>
                    Loading ...
                </p>
            </div>
        )
    }
}

export default ArticleDetail;
