import React, {Component} from 'react';
import imageEvent_1 from '../../assets/images/imageEvent.png'
import imageEvent_2 from '../../assets/images/imageEvent2.png'
import imageEvent_3 from '../../assets/images/imageEvent3.png'
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import dayjs from 'dayjs'

class NewsAndEventsList extends Component {
    listOfNewsAndEvents = [
        {
            id: 1,
            dateM: 'Октомври',
            dateD: '18',
            image: imageEvent_1,
            title: 'На пататнки и песни в музея'
        },
        {
            id: 2,
            dateM: 'декември',
            dateD: '20',
            image: imageEvent_2,
            title: 'Празника на Община Смолян и честване на 107 от освобождението на...'
        },
        {
            id: 3,
            dateM: '',
            dateD: '',
            image: imageEvent_3,
            title: 'РИМ “Стою Шишков” - Смолян се включва в празника Никлуден'
        }
    ]


    returnListOfNewsAndEvents = () => {

        return this.listOfNewsAndEvents.map(event => {
            return (
                <Col lg={4} key={event.id}>
                    <div className='nae-item' >
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
    }

    render() {
        return (
            <Row>
                {this.returnListOfNewsAndEvents()}
            </Row>
        )
    }
}

export default NewsAndEventsList;
