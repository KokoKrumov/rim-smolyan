import React from 'react';
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row"


function NewsAndEventsListHorizontal({listOfNewsAndEvents}) {

    if (listOfNewsAndEvents) {
        return (
            listOfNewsAndEvents.map((event, index) => {
                return (
                    <div className='nae-item nae-item__horizontal' key={event.id}>

                        <Row>
                            <Col lg={5}>
                                <a className="link link-img" href={`/news/${index}`} itemProp="url" target=""
                                   rel="noopener nofollow noreferrer">
                                    <div className='nae-item__img__wrap'>
                                        {event.dateD && event.type === 'event' ?
                                            <div className='nae-item__date__wrap'>
                                                <p className='nae-item__date-day'>{event.dateD}</p>
                                                <p className='nae-item__date-month'>{event.dateM}</p>
                                            </div>
                                            :
                                            null
                                        }
                                        <div className='nae-item__img'>
                                            <img className="img-fluid" src={event.image} alt="" itemProp="image"/>
                                        </div>
                                    </div>
                                </a>
                            </Col>

                            <Col lg={7}>
                                <div>
                                    {event.dateM && event.type === 'article' ?
                                        <div className='nae-item__article-date__wrap'>
                                            <p className='nae-item__article-date'>{event.dateD} {event.dateM}</p>
                                        </div>
                                        :
                                        null
                                    }

                                    <h3 className='h3'>
                                        <a className="link a-title" href={`/news/${index}`} itemProp="url" target=""
                                           rel="noopener nofollow noreferrer">
                                            {event.title}
                                        </a>
                                    </h3>

                                    <p className='paragraph-3'>
                                        {event.description}
                                    </p>
                                    <a
                                        style={{marginTop: '2rem'}}
                                        className="a cta_outline cta_outline__dark hvr-underline-from-left"
                                        href={`/news/${index}`}
                                        itemProp="url"
                                        target=""
                                        rel="noopener nofollow noreferrer">
                                        вижте повече
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </div>
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

export default NewsAndEventsListHorizontal;
