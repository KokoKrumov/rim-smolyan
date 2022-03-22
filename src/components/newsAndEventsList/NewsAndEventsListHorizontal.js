import React from 'react';
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import {FormattedMessage} from 'react-intl';

function NewsAndEventsListHorizontal({listOfNewsAndEvents, exhibitions}) {

    function order(a, b) {
        return b.id - a.id;
    }
    console.log('listOfNewsAndEvents', listOfNewsAndEvents);

    if (listOfNewsAndEvents) {
        return (
            listOfNewsAndEvents.map((event, index) => {
                return (
                    <div className='nae-item nae-item__horizontal container' key={event.id}>

                        <Row>
                            <Col lg={5}>
                                {/*IMAGE AND DATE*/}
                                <a className="link link-img" 
                                    href={`${process.env.REACT_APP_API_URL}/posts/${event.id}?_fields=id,modified_gmt,slug,title,content,excerpt,event_date,event_place,_links,_embedded&_embed`}
                                    itemProp="url" target=""
                                    rel="noopener nofollow noreferrer">
                                    <div className='nae-item__img__wrap'>
                                        {event.event_date ?
                                            <div className='nae-item__date__wrap'>
                                                <p className='nae-item__date-day'>{event.event_date}</p>
                                                {/* <p className='nae-item__date-month'>{event.dateM}</p> */}
                                            </div>
                                            :
                                            null
                                        }
                                        <div className='nae-item__img'>
                                            <img className="img" src={event._embedded['wp:featuredmedia'][0].source_url} alt="" itemProp="image"/>
                                        </div>
                                    </div>
                                </a>
                                {/*!IMAGE AND DATE*/}
                            </Col>

                            <Col lg={7}>
                                <div>
                                    {/*DATE*/}
                                    {event.daevent_dateteM  ?
                                        <div className='nae-item__article-date__wrap'>
                                            {/* <p className='nae-item__article-date'>{event.dateD} {event.dateM}</p> */}
                                            <p className='nae-item__article-date'>{event.event_date}</p>
                                        </div>
                                        :
                                        null
                                    }
                                    {/* {event.type === 'exhibition' ?
                                        <div className='nae-item__article-date__wrap'>
                                            <p className='nae-item__article-date'>{event.dateStart} - {event.dateEnd} | {event.place}</p>
                                        </div>
                                        :
                                        null
                                    } */}
                                    {/*!DATE*/}

                                    {/*TITLE*/}
                                    <h3 className='h3'>
                                        <a className="link a-title"  href={event._links.self[0].href} itemProp="url" target=""
                                           rel="noopener nofollow noreferrer">
                                            {event.title.rendered}
                                        </a>
                                    </h3>
                                    {/*!TITLE*/}

                                    <p className='paragraph-3'>
                                        {event.description}
                                    </p>
                                    {/*LINK TO SEE MORE*/}
                                    <a
                                        className="a cta_outline cta_outline__dark hvr-underline-from-left"
                                         href={event._links.self[0].href}
                                        itemProp="url"
                                        target=""
                                        rel="noopener nofollow noreferrer">
                                        <FormattedMessage id="see-more"/>
                                    </a>
                                    {/*!LINK TO SEE MORE*/}
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
