import React from 'react';
import {connect} from "react-redux";
import {showModal} from "../../actions";
import Header from "./Header";

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    showModal:data=>dispatch(showModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
