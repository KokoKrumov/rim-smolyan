import React from "react";
import {
  getDateDayForArticleCard,
  getDateMonthForArticleCard,
} from "../../../utilities/browser";

function NewsDate({ date }) {
  return (
    <p className="h-sup mb-10">
      {getDateDayForArticleCard(date, true) +
        " " +
        getDateMonthForArticleCard(date, true)}
    </p>
  );
}

export default NewsDate;
