import React from 'react';
import Col from "react-bootstrap/cjs/Col";


function NewsAndEventsList({listOfNewsAndEvents}) {

    if (listOfNewsAndEvents) {
        return (
            listOfNewsAndEvents.map(event => {
                return (
                    <Col lg={4} key={event.id}>
                        <div className='nae-item'>
                            <a href=''>
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
                                <h5 className='h5'>
                                    {event.title}
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

export default NewsAndEventsList;
