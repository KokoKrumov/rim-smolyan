import React from 'react';
import Col from "react-bootstrap/cjs/Col";


function NewsAndEventsList({listOfNewsAndEvents}) {


    function order(a, b) {
        if (a && b) {
            return b.key - a.key;
        } else {
            return null
        }

    }

    const iterateOverNumber = 3;

    if (listOfNewsAndEvents) {
        return (
            listOfNewsAndEvents.slice(-3, listOfNewsAndEvents.length).map((article, index) => {
                if (index < iterateOverNumber) {
                    return (
                        <Col md={4} key={article.id} className='nae-item__vertical__wrap'>
                            <div className='nae-item nae-item__vertical'>
                                {/*MINUS 1 BECAUSE THE ARRAY STARTS WITH 0*/}
                                <a href={`/${article.type}/${article.id - 1}`}>
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
                                            <img className="img-fluid img" src={article.image} alt="" itemProp="image"/>
                                        </div>
                                    </div>
                                    <h5 className='h5'>
                                        {article.title}
                                    </h5>
                                </a>
                            </div>
                        </Col>
                    )
                } else {
                    return null
                }
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

export default NewsAndEventsList;
