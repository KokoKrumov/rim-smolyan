import React from 'react';
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/Row";
import Socials from "../socials/socials";


function ArticleDetail({article}) {

    if (article) {
        return (
            <article>

                <Row>
                    <Col lg={8}>
                        <header>
                            <h2 className='h2'>{article.title}</h2>
                            <p className='h-sup'>{article.place}</p>
                            {
                                article.dateD && article.type === 'article'
                                    ?
                                    <p className='h-sup'>{article.dateD} {article.dateM} {article.dateY}</p>
                                    :
                                    null
                            }

                        </header>
                    </Col>
                </Row>

                <Row>
                    <Col lg={8}>
                        <figure className='nae-item__img__wrap image__article-detail'>
                            {
                                article.dateD && article.type === 'event'
                                    ?
                                    <div className="nae-item__date__wrap">
                                        <p className="nae-item__date-day">{article.dateD}</p>
                                        <p className="nae-item__date-month">{article.dateM}</p>
                                    </div>
                                    :
                                    null

                            }

                            <img className="img-fluid" src={article.imageDetail} alt="" itemProp="image"/>
                        </figure>
                        <div>
                            <p className='paragraph-2'>
                                {article.text}
                            </p>
                        </div>
                    </Col>
                    <Col lg={2}>
                        <div className="socials__wrap socials__top-indent">
                            <p className='socials-label'>Споделете страницата</p>
                            <Socials/>
                        </div>
                    </Col>
                </Row>
            </article>
        )
    } else {
        return (
            <div>
                <p>
                    Loading ...
                </p>
            </div>
        )
    }
}

export default ArticleDetail;
