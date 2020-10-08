import React from 'react';
import Col from "react-bootstrap/cjs/Col";
import {Link} from "react-router-dom";
import Row from "react-bootstrap/cjs/Row"


function NewsAndEventsListHorizontal({listOfNewsAndEvents}) {

    if (listOfNewsAndEvents) {
        return (
            listOfNewsAndEvents.map(event => {
                return (
                    <div className='nae-item nae-item__horizontal' key={event.id}>

                        <Row>
                            <Col lg={5}>
                                <Link className="link link-img" to={`/news/${event.id}`} itemProp="url" target=""
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
                                </Link>
                            </Col>

                            <Col lg={7}>
                                <div>
                                    {event.dateD && event.type === 'news' ?
                                        <div className='nae-item__date__wrap'>
                                            <p className='nae-item__date-day'>{event.dateD}</p>
                                            <p className='nae-item__date-month'>{event.dateM}</p>
                                        </div>
                                        :
                                        null
                                    }
                                    <Link className="link-title"  to={`/news/${event.id}`} itemProp="url" target=""
                                       rel="noopener nofollow noreferrer">
                                        <h3 className='h3'>
                                            {event.title}
                                        </h3>
                                    </Link>
                                    <p className='paragraph-3'>
                                        {event.description}
                                    </p>
                                    <Link
                                        style={{marginTop: '2rem'}}
                                        className="link cta_outline cta_outline__dark hvr-underline-from-left"
                                        to={`/news/${event.id}`}
                                        itemProp="url"
                                        target=""
                                        rel="noopener nofollow noreferrer">
                                        вижте повече
                                    </Link>
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
