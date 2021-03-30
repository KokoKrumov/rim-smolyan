import React from 'react';
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import {FormattedMessage} from 'react-intl';

function NewsAndEventsListHorizontal({listOfNewsAndEvents}) {

    function order(a, b) {
        return b.key - a.key;
    }

    if (listOfNewsAndEvents) {
        return (
            listOfNewsAndEvents.map((event, index) => {
                return (
                    <div className='nae-item nae-item__horizontal container' key={event.id}>

                        <Row>
                            <Col lg={5}>
                                <a className="link link-img" href={`/${event.type}/${index}`} itemProp="url" target=""
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
                                            <img className="img" src={event.image} alt="" itemProp="image"/>
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
                                    {event.type === 'exhibition' ?
                                        <div className='nae-item__article-date__wrap'>
                                            <p className='nae-item__article-date'>{event.dateStart} - {event.dateEnd} | {event.place}</p>
                                        </div>
                                        :
                                        null
                                    }

                                    <h3 className='h3'>
                                        <a className="link a-title" href={`/${event.type}/${index}`} itemProp="url" target=""
                                           rel="noopener nofollow noreferrer">
                                            {event.title}
                                        </a>
                                    </h3>

                                    <p className='paragraph-3'>
                                        {event.description}
                                    </p>
                                    <a
                                        className="a cta_outline cta_outline__dark hvr-underline-from-left"
                                        href={`/${event.type}/${index}`}
                                        itemProp="url"
                                        target=""
                                        rel="noopener nofollow noreferrer">
                                        <FormattedMessage id="see-more"/>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )
            }).sort(order)

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
