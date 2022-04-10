import React from 'react';
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import CardInfoLine from "../../infoLine/CardInfoLine";
import HeroCollections from "../../hero/HeroCollections";
import {FormattedMessage, injectIntl} from 'react-intl';
import {connect} from "react-redux";
import laszloNagyPageBG from '../../../translations/laszloNagyPageBG.json';
import laszloNagyPageEN from '../../../translations/laszloNagyPageEN.json';
import InfoColumn from "../../infoColumn/InfoColumn";
import CarouselImages from "../../carousel/carouselImages";
import HeroInner from "../../hero/HeroInner";
import {OverlayTrigger} from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import Socials from "../../socials/socials";


const LaszloNagyPage = (props) => {

	let laszloNagyPageContent = {
		bgImage: './images/laszloNagy/heroBg.png',
		aboutHouseBgImage: './images/laszloNagy/aboutHouseBgImage.png',
		laszloNagyCarouselImg: [
			{
				id: 1,
				image: "../images/laszloNagy/laszloNagyCarouselImg.png"
			},
			{
				id: 2,
				image: "../images/laszloNagy/laszloNagyCarouselImg.png"
			},
			{
				id: 3,
				image: "../images/laszloNagy/laszloNagyCarouselImg.png"
			},
		]
	}

	const laszloNagyContent = props.intl.locale === 'en' ? laszloNagyPageEN : laszloNagyPageBG;

	return (
		<div className='laszlo-nagy__page'>
			<div className=''>
				<HeroCollections
					bgImage={laszloNagyPageContent.bgImage}
					title={laszloNagyContent.title}
					label={false}
				/>
			</div>
			<main>
				<InfoColumn
					title={laszloNagyContent.aboutHouse}
					text={laszloNagyContent.aboutHouseText}
					backgroundImage={laszloNagyPageContent.aboutHouseBgImage}
					columns={2}
				/>

				<section className='section-building'>
					<Container>
						<Row className='justify-content-between'>
							<Col lg={5}>
								<Row>
									<InfoColumn
										title={laszloNagyContent.permanentExhibitionTitle}
										text={laszloNagyContent.permanentExhibitionText}
										columns={1}
									/>
								</Row>
							</Col>
							<Col lg={6}>
								<Row>
									<Col className='pr-0 pl-0'>
										<div className="about-us-page__building-carousel nae-container">
											<CarouselImages
												listImages={laszloNagyPageContent.laszloNagyCarouselImg}
											/>
										</div>
									</Col>
								</Row>
							</Col>
						</Row>
					</Container>
				</section>
				<section className='section-building'>
					<HeroInner
						title={laszloNagyContent.priceAndWorkingHours}
						subtitle={''}
					/>
					<div className='contacts contacts__wrap laszlo-nagy__page__contact-section'>
						<Container className=''>
							<Row className=''>
								<Col lg={11}>
									<Row className={'contacts__row'}>
										<Col lg={5}>
											<div>
												<p className={'title'}>
													<b>Ценоразпис на входни билети и беседи в
														къща музей „Ласло Наги“</b>
												</p>
												<ul type={'decimal'} className={'list'}>
													<li>
														1. Входни такси:
														<ul className={'list'}>
															<li>
																- възрастни – 3.00 лв.
															</li>
															<li>
																- учащи и пенсионери – 1.00 лв.
															</li>
															<li>
																- деца до 7 години – безплатно
															</li>
															<li>
																- учащи и пенсионери над 10 човека – 1.00 лв.
															</li>
														</ul>
													</li>
													<li>
														2. Беседи:
														<ul className={'list'}>
															<li>
																- на български език – 10.00 лв.
															</li>
															<li>
																- беседи на чужд език се изнасят само след предварителна заявка. Цена - 20.00 лв.
															</li>
														</ul>
													</li>
												</ul>
											</div>
										</Col>
										<Col lg={3}>
											<ul className='address__list'>
												<li className='address__list-item'>
													<h4 className='h4 contacts__address-label'>
														Работно време:
													</h4>
													<p className='contacts__address-text'>
														Вторник - Събота
													</p>
												</li>
												<li className='address__list-item time-period__wrap'>
													<h6 className='time-period__title'>
														Май - Септември
													</h6>
													<p className='time-period__text'>
														<b>10:00 - 18:00</b>
													</p>
													<hr/>
													<h6 className='time-period__title'>
														Октомври - Април
													</h6>
													<p className='time-period__text'>
														<b>10:00 - 17:00</b>
													</p>
												</li>
												<li className='address__list-item'>
													<p className='paragraph-3'>
														Неделя и понеделник са почивни дни.
													</p>
												</li>
											</ul>
										</Col>
									</Row>
								</Col>
							</Row>
						</Container>
					</div>
				</section>
			</main>
		</div>
	)
}

export default injectIntl(LaszloNagyPage);
