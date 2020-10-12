import React from 'react';
import Col from "react-bootstrap/cjs/Col";


function NewsAndarticlesList({listOfNewsAndEvents}) {

    if (listOfNewsAndEvents) {
        return (
            listOfNewsAndEvents.map((article, index) => {
                return (
                    <Col lg={4} key={article.id}>
                        <div className='nae-item nae-item__vertical'>
                            <a href={`/news/${index}`}>
                                <div className='nae-item__img__wrap'>
                                    {article.dateD && article.type === 'event' ?
                                        <div className='nae-item__date__wrap'>
                                            <p className='nae-item__date-day'>{article.dateD}</p>
                                            <p className='nae-item__date-month'>{article.dateM}</p>
                                        </div>
                                        :
                                        null
                                    }
                                    <div className='nae-item__img'>
                                        <img className="img-fluid" src={article.image} alt="" itemProp="image"/>
                                    </div>
                                </div>
                                <h5 className='h5'>
                                    {article.title}
                                </h5>
                            </a>
                        </div>
                    </Col>
                )
            })

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

export default NewsAndarticlesList;
