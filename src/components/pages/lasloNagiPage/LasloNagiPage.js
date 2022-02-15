import React from 'react';
import aboutUsBg from "../../../assets/images/about-us-page_bg.jpg";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import AboutInfoLine from "../../infoLine/aboutInfoLine";
import InfoColumn from "../../infoColumn/InfoColumn";
import CarouselImages from "../../carousel/carouselImages";
import CardMediaHorizontal from "../../cards/cardMediaHorizontal";
import CardInfoLine from "../../infoLine/CardInfoLine";
import {FormattedMessage} from "react-intl";
import CardTeamHeadmaster from "../../cards/cardTeamHeadmaster";
import CardTeamMember from "../../cards/cardTeamMember";

function LasloNagiPage(props) {
	return (
		<div className='about-us-page'>
			<div className='hero__wrap hero2cols'>
				<div
					className='hero hero-bg'
					style={{
						backgroundImage: `url(${aboutUsBg})`
					}}
				>
					<Container>
						<Row>
							<Col>
								<h1 className='h1'>
									КЪЩА МУЗЕЙ <br/>
									„ЛАСЛО НАГИ“ – СМОЛЯН
								</h1>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
			<main>
				<Container className='container position-relative'>
					<Col>
						<div className='about-us__info-line__wrap'>
							{/*<AboutInfoLine/>*/}
						</div>
					</Col>
				</Container>
				{/*<InfoColumn*/}
				{/*	title={this.state.infoColumn.history.title}*/}
				{/*	text={this.state.infoColumn.history.text}*/}
				{/*	backgroundImage={this.state.infoColumn.history.aboutUsHistoryBg}*/}
				{/*	showRulesForActivity={this.state.infoColumn.history.showRulesForActivity}*/}
				{/*	columns={this.state.infoColumn.history.columns}*/}
				{/*/>*/}

				<section className='section-building'>
					<Container>
						<Row className='justify-content-between'>
							<Col lg={5}>
								<Row>
									{/*<InfoColumn*/}
									{/*	title={this.state.infoColumn.building.title}*/}
									{/*	text={this.state.infoColumn.building.text}*/}
									{/*	columns={this.state.infoColumn.building.columns}*/}
									{/*/>*/}
								</Row>
							</Col>
							<Col lg={6}>
								<Row>
									<Col className='pr-0 pl-0'>
										{/*<div className="about-us-page__building-carousel nae-container">*/}
										{/*	<CarouselImages*/}
										{/*		listImages={this.state.listBuildingImagesCarousel}*/}
										{/*	/>*/}
										{/*</div>*/}
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col>
								{/*<CardMediaHorizontal*/}
								{/*	icon={this.state.cardsAccessibility.accessibility.icon}*/}
								{/*	text={this.state.cardsAccessibility.accessibility.text}*/}
								{/*/>*/}
							</Col>
							<Col>
								{/*<CardMediaHorizontal*/}
								{/*	icon={this.state.cardsAccessibility.braille.icon}*/}
								{/*	text={this.state.cardsAccessibility.braille.text}*/}
								{/*/>*/}
							</Col>
						</Row>
						<CardInfoLine title={"regular-programs"} link={'/about-us/regular-programs'}/>
					</Container>
				</section>
				<section className='section-team'>
					{/*<div className='section-team__container-wrap'>*/}
					{/*	<Container>*/}
					{/*		<div className="section-team__title__wrap">*/}
					{/*			<h1*/}
					{/*				className='h1'*/}
					{/*			>*/}
					{/*				<FormattedMessage id="team"/>*/}
					{/*			</h1>*/}
					{/*		</div>*/}
					{/*		<div className='section-team__headmaster-wrap'>*/}
					{/*			/!*{*!/*/}
					{/*			/!*	this.props.team.headmaster && this.props.team.headmaster.length !== 0*!/*/}
					{/*			/!*		?*!/*/}
					{/*			/!*		this.props.team.headmaster.map(headmaster => {*!/*/}
					{/*			/!*			return (*!/*/}
					{/*			/!*				<CardTeamHeadmaster*!/*/}
					{/*			/!*					key={headmaster.id}*!/*/}
					{/*			/!*					user={headmaster}*!/*/}
					{/*			/!*				/>*!/*/}
					{/*			/!*			)*!/*/}
					{/*			/!*		})*!/*/}
					{/*			/!*		:*!/*/}
					{/*			/!*		<h3 className='h3 loading'>*!/*/}
					{/*			/!*			...*!/*/}
					{/*			/!*		</h3>*!/*/}
					{/*			/!*}*!/*/}

					{/*		</div>*/}
					{/*	</Container>*/}
					{/*</div>*/}
					{/*<div className='section-team__container-wrap'>*/}
					{/*	<Container>*/}
					{/*		<div className="section-team__title__wrap">*/}
					{/*			<h2*/}
					{/*				className='h2'*/}
					{/*			>*/}
					{/*				<FormattedMessage id="department"/>*/}
					{/*				"<FormattedMessage id="archeology"/>"*/}
					{/*			</h2>*/}
					{/*		</div>*/}
					{/*		<div className='section-team__headmaster-wrap'>*/}
					{/*			<Row>*/}
					{/*				{*/}
					{/*					this.props.team.archeology && this.props.team.archeology.length !== 0*/}
					{/*						?*/}
					{/*						this.props.team.archeology.map(user => {*/}
					{/*							return (*/}
					{/*								<Col md={6} lg={4} key={user.id} className="section-team__col">*/}
					{/*									<CardTeamMember*/}
					{/*										user={user}*/}
					{/*									/>*/}
					{/*								</Col>*/}
					{/*							)*/}
					{/*						})*/}
					{/*						:*/}
					{/*						<h3 className='h3 loading'>*/}
					{/*							...*/}
					{/*						</h3>*/}
					{/*				}*/}


					{/*			</Row>*/}
					{/*		</div>*/}
					{/*	</Container>*/}
					{/*</div>*/}
					{/*<div className='section-team__container-wrap'>*/}
					{/*	<Container>*/}
					{/*		<div className="section-team__title__wrap">*/}
					{/*			<h2*/}
					{/*				className='h2'*/}
					{/*			>*/}
					{/*				<FormattedMessage id="department"/>*/}
					{/*				"<FormattedMessage id="funds-and-scientific-archives"/>"*/}
					{/*			</h2>*/}
					{/*		</div>*/}
					{/*		<div className='section-team__headmaster-wrap'>*/}
					{/*			<Row>*/}
					{/*				{*/}
					{/*					this.props.team.fundsAndScientificArchives && this.props.team.fundsAndScientificArchives.length !== 0*/}
					{/*						?*/}
					{/*						this.props.team.fundsAndScientificArchives.map(user => {*/}
					{/*							return (*/}
					{/*								<Col md={6} lg={4} key={user.id} className="section-team__col">*/}
					{/*									<CardTeamMember*/}
					{/*										user={user}*/}
					{/*									/>*/}
					{/*								</Col>*/}
					{/*							)*/}
					{/*						})*/}
					{/*						:*/}
					{/*						<h3 className='h3 loading'>*/}
					{/*							...*/}
					{/*						</h3>*/}
					{/*				}*/}


					{/*			</Row>*/}
					{/*		</div>*/}
					{/*	</Container>*/}
					{/*</div>*/}


					{/*{*/}
					{/*	this.props.team.history && this.props.team.history.length !== 0*/}
					{/*		?*/}
					{/*		<div className='section-team__container-wrap'>*/}
					{/*			<Container>*/}
					{/*				<div className="section-team__title__wrap">*/}
					{/*					<h2*/}
					{/*						className='h2'*/}
					{/*					>*/}
					{/*						<FormattedMessage id="department"/>*/}
					{/*						"<FormattedMessage id="history"/>"*/}
					{/*					</h2>*/}
					{/*				</div>*/}
					{/*				<div className='section-team__headmaster-wrap'>*/}
					{/*					<Row>*/}
					{/*						{this.props.team.history.map(user => {*/}
					{/*							return (*/}
					{/*								<Col md={6} lg={4} key={user.id} className="section-team__col">*/}
					{/*									<CardTeamMember*/}
					{/*										user={user}*/}
					{/*									/>*/}
					{/*								</Col>*/}
					{/*							)*/}
					{/*						})}*/}


					{/*					</Row>*/}
					{/*				</div>*/}
					{/*			</Container>*/}
					{/*		</div>*/}
					{/*		:*/}
					{/*		null*/}
					{/*}*/}

					{/*{*/}
					{/*	this.props.team.ethnography && this.props.team.ethnography.length !== 0*/}
					{/*		?*/}
					{/*		<div className='section-team__container-wrap'>*/}
					{/*			<Container>*/}
					{/*				<div className="section-team__title__wrap">*/}
					{/*					<h2*/}
					{/*						className='h2'*/}
					{/*					>*/}
					{/*						<FormattedMessage id="department"/>*/}
					{/*						"<FormattedMessage id="ethnography"/>"*/}
					{/*					</h2>*/}
					{/*				</div>*/}
					{/*				<div className='section-team__headmaster-wrap'>*/}
					{/*					<Row>*/}
					{/*						{*/}
					{/*							this.props.team.ethnography.map(user => {*/}
					{/*								return (*/}
					{/*									<Col md={6} lg={4} key={user.id}*/}
					{/*										 className="section-team__col">*/}
					{/*										<CardTeamMember*/}
					{/*											user={user}*/}
					{/*										/>*/}
					{/*									</Col>*/}
					{/*								)*/}
					{/*							})*/}
					{/*						}*/}


					{/*					</Row>*/}
					{/*				</div>*/}
					{/*			</Container>*/}
					{/*		</div>*/}
					{/*		:*/}
					{/*		null*/}
					{/*}*/}

					{/*<div className='section-team__container-wrap'>*/}
					{/*	<Container>*/}
					{/*		<div className="section-team__title__wrap">*/}
					{/*			<h2*/}
					{/*				className='h2'*/}
					{/*			>*/}
					{/*				<FormattedMessage id="department"/>*/}
					{/*				"<FormattedMessage id="public-relations"/>"*/}
					{/*			</h2>*/}
					{/*		</div>*/}
					{/*		<div className='section-team__headmaster-wrap'>*/}
					{/*			<Row>*/}
					{/*				{*/}
					{/*					this.props.team.publicRelations && this.props.team.publicRelations.length !== 0*/}
					{/*						?*/}
					{/*						this.props.team.publicRelations.map(user => {*/}
					{/*							return (*/}
					{/*								<Col md={6} lg={4} key={user.id} className="section-team__col">*/}
					{/*									<CardTeamMember*/}
					{/*										user={user}*/}
					{/*									/>*/}
					{/*								</Col>*/}
					{/*							)*/}
					{/*						})*/}
					{/*						:*/}
					{/*						<h3 className='h3 loading'>*/}
					{/*							...*/}
					{/*						</h3>*/}
					{/*				}*/}


					{/*			</Row>*/}
					{/*		</div>*/}
					{/*	</Container>*/}
					{/*</div>*/}
					{/*<div className='section-team__container-wrap'>*/}
					{/*	<Container>*/}
					{/*		<div className="section-team__title__wrap">*/}
					{/*			<h2*/}
					{/*				className='h2'*/}
					{/*			>*/}
					{/*				<FormattedMessage id="department"/>*/}
					{/*				"<FormattedMessage id="administration-and-financial"/>"*/}
					{/*			</h2>*/}
					{/*		</div>*/}
					{/*		<div className='section-team__headmaster-wrap'>*/}
					{/*			<Row>*/}
					{/*				{*/}
					{/*					this.props.team.administration && this.props.team.administration.length !== 0*/}
					{/*						?*/}
					{/*						this.props.team.administration.map(user => {*/}
					{/*							return (*/}
					{/*								<Col md={6} lg={4} key={user.id} className="section-team__col">*/}
					{/*									<CardTeamMember*/}
					{/*										user={user}*/}
					{/*									/>*/}
					{/*								</Col>*/}
					{/*							)*/}
					{/*						})*/}
					{/*						:*/}
					{/*						<h3 className='h3 loading'>*/}
					{/*							...*/}
					{/*						</h3>*/}
					{/*				}*/}


					{/*			</Row>*/}
					{/*		</div>*/}
					{/*	</Container>*/}
					{/*</div>*/}
				</section>
			</main>
		</div>
	)
}

export default LasloNagiPage;
