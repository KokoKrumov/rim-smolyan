import React, {Component} from 'react';
import HeroInner from "../hero/HeroInner";
import {connect} from 'react-redux'
import {fetchNews} from "../../actions";

class NotFound extends Component {

    state = {
        notFound: "Тази страница не съществува"
    }


    render() {
        return (
            <div className='text-center'>
                <HeroInner
                    title={this.state.notFound}
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
