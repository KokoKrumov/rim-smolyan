import React from "react";
import {
  getDateDayForArticleCard,
  getDateMonthForArticleCard,
  getDateYearForArticleCard,
} from "../../utilities/browser";
import { isEqual } from "lodash";

function ExhibitionDate({ date }) {
  const dateToArr = date.replace(/ /g, "").split("-");
  const date1 = dateToArr[0];
  const date2 = dateToArr[1];
  const setYears = isEqual(
    getDateYearForArticleCard(date1),
    getDateYearForArticleCard(date2)
  );
  return (
    <>
      {`${getDateDayForArticleCard(date1)} ${getDateMonthForArticleCard(
        date1
      )} ${setYears ? getDateYearForArticleCard(date1) : ""} - 
        ${getDateDayForArticleCard(date2)} ${getDateMonthForArticleCard(
        date2
      )} ${setYears ? getDateYearForArticleCard(date2) : ""}`}
    </>
  );
}

export default ExhibitionDate;
