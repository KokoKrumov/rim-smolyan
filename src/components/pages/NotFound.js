import React, {Component} from 'react';
import HeroInner from "../hero/HeroInner";
import {connect} from 'react-redux'
import {fetchNews} from "../../actions";

class NotFound extends Component {

    render() {
        return (
            <div className='text-center'>
                <HeroInner
                    title={'page-not-exist'}
                    subtitle={''}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        news: Object.values(state.news)
    };
}

export default connect(
    mapStateToProps,
    {
        fetchNews
    }
)(NotFound);
