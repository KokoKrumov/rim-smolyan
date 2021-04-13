import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import history from "../../../history";
import {connect} from "react-redux";
import {closeModal, fetchCollectionsMain} from "../../../actions";
import CardCollections from "../../cards/cardCollections";

class Collections extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collectionsMain: []
        };
    }

    componentDidMount() {
        this.props.fetchCollectionsMain()
            .then(()=>{
                this.setState({
                    collectionsMain:this.props.collectionsMain
                })
            })
    }

    render() {
        const {intl} = this.props;
        return (
            <div className='collections-page'>
                <HeroInner
                    labelTitle={'collections-main'}
                    subtitleLg={'collections-main-subtitle'}
                    title={'collections'}
                    arrowBottom={true}
                />
                <main className='prices-page__main'>

                    <section>
                        <Container className='position-relative'>
                            <Row>
                                <Col xs={12}>
                                    <div className="card-columns">
                                        {
                                            this.state.collectionsMain
                                                ?
                                                this.state.collectionsMain.map(item =>{
                                                    return <CardCollections key={item.id} item={item}/>
                                                })
                                                :
                                                <p>
                                                    Loading...
                                                </p>
                                        }
                                    </div>

                                </Col>
                            </Row>
                        </Container>
                    </section>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        collectionsMain: state.collections.main
    };
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsMain: () => dispatch(fetchCollectionsMain())
})



export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Collections));
