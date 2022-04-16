import React from "react";
import {
  getDateDayForArticleCard,
  getDateMonthForArticleCard,
  getDateYearForArticleCard,
} from "../../utilities/browser";
import { isEqual } from "lodash";

function ArticleDate({ date }) {
  if (date.includes("-")) {
    const dateToArr = date.replace(/ /g, "").split("-");
    const date1 = dateToArr[0];
    const date2 = dateToArr[1];
    if (
      !isEqual(
        getDateMonthForArticleCard(date1),
        getDateMonthForArticleCard(date2)
      )
    ) {
      return (
        <div>
          <div className="nae-item__date__wrap nae-item__date__wrap__two-dates">
            <div>
              <p className="nae-item__date-day">
                {getDateDayForArticleCard(date1)}
              </p>
              <p className="nae-item__date-month">
                {getDateMonthForArticleCard(date1)}
              </p>

              <p className="nae-item__date-month">
                {getDateYearForArticleCard(date1)}
              </p>
            </div>
            <div>
              <p className="nae-item__date-day"> - </p>
            </div>
            <div>
              <p className="nae-item__date-day">
                {getDateDayForArticleCard(date2)}
              </p>
              <p className="nae-item__date-month">
                {getDateMonthForArticleCard(date2)}
              </p>

              <p className="nae-item__date-month">
                {getDateYearForArticleCard(date2)}
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="nae-item__date__wrap">
            <p className="nae-item__date-day">{`${getDateDayForArticleCard(
              date1
            )}-${getDateDayForArticleCard(date2)}`}</p>
            <p className="nae-item__date-month">
              {getDateMonthForArticleCard(date2)}
            </p>
            <p className="nae-item__date-month">
              {getDateYearForArticleCard(date2)}
            </p>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="nae-item__date__wrap">
        <p className="nae-item__date-day">{getDateDayForArticleCard(date)}</p>
        <p className="nae-item__date-month">
          {getDateMonthForArticleCard(date)}
        </p>
        <p className="nae-item__date-month">
          {getDateYearForArticleCard(date)}
        </p>
      </div>
    );
  }
}

export default ArticleDate;
