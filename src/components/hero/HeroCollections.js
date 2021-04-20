import React from 'react';
import {injectIntl} from "react-intl";
import Container from "react-bootstrap/Container";

function HeroCollections(props) {

    const {intl} = props;
    return (
        <div className='hero-collection'>
            <div
                className='hero hero-bg'
                style={{
                    backgroundImage: `url(${props.bgImage})`
                }}
            >
                <Container>
                    <p className='title-label'
                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'collection'})}}
                    />
                    <h1 className='h1'>
                        {props.title}
                    </h1>
                </Container>
            </div>

        </div>
    );
}

export default injectIntl(HeroCollections);
