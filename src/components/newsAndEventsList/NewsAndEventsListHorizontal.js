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
                                <a className="link link-img" href="#" itemProp="url" target=""
                                   rel="noopener nofollow noreferrer">
                                    <div className='nae-item__img__wrap'>
                                        {event.dateD ?
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
                                    <a className="link-title" href="#" itemProp="url" target=""
                                       rel="noopener nofollow noreferrer">
                                        <h3 className='h3'>
                                            {event.title}
                                        </h3>
                                    </a>
                                    <p className='paragraph-3'>
                                        {event.description}
                                    </p>
                                    <Link
                                        style={{marginTop: '2rem'}}
                                        className="link cta_outline cta_outline__dark hvr-underline-from-left"
                                        to="#"
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
