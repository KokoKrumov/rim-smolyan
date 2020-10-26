import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {closeModal} from "../../actions";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import St_Shishkov_barelef from '../../assets/images/St_Shishkov_barelef.png'

class ModalNedelovContent extends Component {

    handleCloseModal = (e, data) => {
        e.preventDefault();
        this.props.closeModal(data);
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col lg={3}>
                        <div>
                            <figure>
                                <img className="" src={St_Shishkov_barelef} alt="St_Shishkov_barelef" itemProp="image"/>
                                <figcaption>
                                    Паметен знак с барелеф пред входа на музея в Смолян.
                                    Дарение от Фондация „Българска памет – братя Диневи”
                                    Автор: Иван Томанов (2007 г.)
                                </figcaption>
                            </figure>
                        </div>
                    </Col>
                    <Col lg={9}>
                        <h3 className='h3'>
                            Стою Неделчев Шишков
                        </h3>
                        <Row>
                            <Col lg={6}>
                                <p className='paragraph-2'>
                                    е роден на 27 юли 1865 г. в Устово в семейството на дребен занаятчия и търговец.
                                    Едва четиринадесет годишен (1879) започва учителската си дейност в училището при
                                    църквата “Св. Богородица” – Устово. Занимава се с такава дейност до 1927 г., като
                                    през годините учителства на различни места - освен в Устово, в Орехово, в Чепеларе,
                                    в. Асеновград, в Пловдив.
                                    Едновременно Стою Шишков активно се занимава с научно-просветна, стопанска,
                                    публицистична, издателска дейност. Той е основоположник и редактор на най-ранните
                                    родопски периодични издания: сп.“Родопски старини” (1887-1892 г.), сп. “Славееви
                                    гори” (1894 г.), сп.”Родопски напредък” (1903-1912 г.). Посвещава на Родопите и
                                    редица самостоятелни издания, като повечето от тях финансира сам.
                                </p>
                            </Col>
                            <Col lg={6}>
                                <p className='paragraph-2'>
                                    Неоценим е приносът му като изследовател на Родопите и Тракия. Оставя за поколенията огромно наследство в областта на етнографията, фолклора, езикознанието, демографията, историята и в частност стопанската, музейното дело.
                                    С цялата си обществена, културна и просветна дейност, с активната си гражданска позиция и със своите задълбочени проучвания върху миналото на Родопския край, Стою Шишков по блестящ начин защитава българската национална кауза. На 26 май 1935 г. по време на тържеството в чест на 70-години от рождението му и полувековната му културна дейност, проведено в Пловдив, Стою Шишков дарява 50 000 лева за създаване на Етнографски музей в родното му Устово. Две години по-късно Министерството на просвещението утвърждава изработения от Шишков музеен правилник.
                                    Умира на 27 декември 1937 г. в Пловдив.
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <div className='d-flex justify-content-center align-items-center mt-5'>
                    <div className='mx-4'>
                        <a
                            href='http://old.museumsmolyan.eu/'
                            className='link cta_outline cta_outline__dark hvr-underline-from-center'
                            variant="secondary"
                        >
                            <FormattedMessage id="text.yes"/>
                        </a>
                    </div>
                    <div className='mx-4'>
                        <button
                            className='link cta_outline cta_outline__dark hvr-underline-from-center m-0'
                            variant="primary"
                            onClick={(e) => {
                                this.handleCloseModal(e, 'modal-nedelov');
                            }}
                        >
                            <FormattedMessage id="text.cancel"/>
                        </button>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    closeModal: data => dispatch(closeModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalNedelovContent);
