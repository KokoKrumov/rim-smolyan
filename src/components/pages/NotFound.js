import React, { Component } from "react";
import { selectNews } from "../../store/selectors";
import HeroInner from "../hero/HeroInner";
import { connect } from "react-redux";

class NotFound extends Component {
  render() {
    return (
      <div className="text-center">
        <HeroInner title={"page-not-exist"} subtitle={""} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    news: selectNews(state),
  };
};

export default connect(mapStateToProps)(NotFound);
