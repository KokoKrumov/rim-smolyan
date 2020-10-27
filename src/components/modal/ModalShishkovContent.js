import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {closeModal} from "../../actions";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StShishkovBarelef from '../../assets/images/St_Shishkov_barelef.png'

class ModalShishkovContent extends Component {

    handleCloseModal = (e, data) => {
        e.preventDefault();
        this.props.closeModal(data);
    }

    render() {
        return (
            <React.Fragment>
                <Row  className="modal-body__default modal__barelef__wrap">
                    <Col lg={3}>
                        <div>
                            <figure className='modal__barelef modal__barelef-figure'>
                                <div className="img__wrap">
                                    <img className="img-fluid" src={StShishkovBarelef} alt="StShishkovBarelef" itemProp="image"/>
                                </div>
                                <figcaption className='modal__barelef__text'>
                                    <p className="paragraph-sm">
                                        Паметен знак с барелеф пред входа на музея в Смолян.
                                    </p>
                                    <p className="paragraph-sm">
                                        Дарение от Фондация „Българска памет – братя Диневи”
                                    </p>
                                    <p className="paragraph-sm">
                                        Автор: Иван Томанов (2007 г.)
                                    </p>
                                </figcaption>
                            </figure>
                        </div>
                    </Col>
                    <Col lg={9}>
                        <div className='title__wrap'>
                            <h3 className='h3'>
                                Стою Неделчев Шишков
                            </h3>
                            <div className='modal__close'>
                                <button
                                    className='link cta_outline cta_outline__dark hvr-underline-from-center m-0'
                                    variant="primary"
                                    onClick={(e) => {
                                        this.handleCloseModal(e, 'modal-nedelov');
                                    }}
                                >
                                    <FormattedMessage id="text.cancel"/>
                                    <div className="icon-close">
                                        <svg width="10" height="11" viewBox="0 0 10 11" fill="inherit" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.91603 5.50007L9.80991 1.60608C10.0633 1.35279 10.0633 0.943255 9.80991 0.689966C9.55662 0.436678 9.14709 0.436678 8.8938 0.689966L4.9998 4.58396L1.10592 0.689966C0.852513 0.436678 0.4431 0.436678 0.189811 0.689966C-0.0635959 0.943255 -0.0635959 1.35279 0.189811 1.60608L4.08369 5.50007L0.189811 9.39407C-0.0635959 9.64736 -0.0635959 10.0569 0.189811 10.3102C0.31604 10.4365 0.482012 10.5 0.647866 10.5C0.813719 10.5 0.979573 10.4365 1.10592 10.3102L4.9998 6.41618L8.8938 10.3102C9.02015 10.4365 9.186 10.5 9.35185 10.5C9.51771 10.5 9.68356 10.4365 9.80991 10.3102C10.0633 10.0569 10.0633 9.64736 9.80991 9.39407L5.91603 5.50007Z" fill="inherit"/>
                                        </svg>
                                    </div>
                                    {/*<img className="icon-close" src={} alt="" itemProp="image"/>*/}
                                </button>
                            </div>
                        </div>
                        <Row>
                            <Col lg={6}>
                                <p className='paragraph-2'>
                                    е роден на 27 юли 1865 г. в Устово в семейството на дребен занаятчия и търговец.
                                    Едва четиринадесет годишен (1879) започва учителската си дейност в училището при
                                    църквата “Св. Богородица” – Устово. Занимава се с такава дейност до 1927 г., като
                                    през годините учителства на различни места - освен в Устово, в Орехово, в Чепеларе,
                                    в. Асеновград, в Пловдив.
                                    <br/>
                                    <br/>
                                    Едновременно Стою Шишков активно се занимава с научно-просветна, стопанска,
                                    публицистична, издателска дейност. Той е основоположник и редактор на най-ранните
                                    родопски периодични издания: сп.“Родопски старини” (1887-1892 г.), сп. “Славееви
                                    гори” (1894 г.), сп.”Родопски напредък” (1903-1912 г.). Посвещава на Родопите и
                                    редица самостоятелни издания, като повечето от тях финансира сам.
                                </p>
                            </Col>
                            <Col lg={6}>
                                <p className='paragraph-2'>
                                    Неоценим е приносът му като изследовател на Родопите и Тракия. Оставя за поколенията
                                    огромно наследство в областта на етнографията, фолклора, езикознанието,
                                    демографията, историята и в частност стопанската, музейното дело.
                                    <br/>
                                    <br/>
                                    С цялата си обществена, културна и просветна дейност, с активната си гражданска
                                    позиция и със своите задълбочени проучвания върху миналото на Родопския край, Стою
                                    Шишков по блестящ начин защитава българската национална кауза. На 26 май 1935 г. по
                                    време на тържеството в чест на 70-години от рождението му и полувековната му
                                    културна дейност, проведено в Пловдив, Стою Шишков дарява 50 000 лева за създаване
                                    на Етнографски музей в родното му Устово. Две години по-късно Министерството на
                                    просвещението утвърждава изработения от Шишков музеен правилник.
                                    <br/>
                                    <br/>
                                    Умира на 27 декември 1937 г. в Пловдив.
                                </p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    closeModal: data => dispatch(closeModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalShishkovContent);
