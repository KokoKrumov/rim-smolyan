import React from 'react';
import {connect} from "react-redux";
import ModalComponent from "./ModalComponent";

const mapStateToProps = state => ({
    modal: state.modal
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
