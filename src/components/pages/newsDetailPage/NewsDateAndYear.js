import React from "react";
import {
  getDateDayForArticleCard,
  getDateMonthForArticleCard,
  getDateYearForArticleCard,
} from "../../../utilities/browser";

function NewsDateAndYear({ date }) {
  return (
    <p className="h-sup mb-10">
      {getDateDayForArticleCard(date, true) +
        " " +
        getDateMonthForArticleCard(date, true) +
        " " +
        getDateYearForArticleCard(date, true)}
    </p>
  );
}

export default NewsDateAndYear;
