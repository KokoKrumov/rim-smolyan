import React, { Component } from "react";
import { withIntl } from "../../utilities/withIntl";
import { connect } from "react-redux";

class CardExhibitionArchive extends Component {
  render() {
    const { intl, title, text } = this.props;
    return (
      <div className="card-exhibition-archive">
        <h3 className="h3" dangerouslySetInnerHTML={{ __html: title }} />
        <p
          className="paragraph-3 mt-3"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    );
  }
}

export default withIntl(connect(null)(CardExhibitionArchive));
