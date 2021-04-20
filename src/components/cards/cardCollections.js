import React from 'react';
import {injectIntl} from 'react-intl';

function CardCollections(props) {
    const {intl} = props;
    console.log(props);
    return (
        <div className='card card-collections__wrap'>
            <div className='card-collections__img'>
                <figure>
                    <a href={`/${props.collectionsType}-collections/intro/${props.item.collectionsType}`}
                       className='card-collections__link'>
                        <img className='card-collections__image img-fluid' src={props.item.image} alt=""/>
                        <figcaption className='card-collections__text'>
                            <h4 className={props.smallCards ? 'h5' : 'h4'}
                                dangerouslySetInnerHTML={{__html: `${props.item.title}`}}
                            />
                            {
                                props.item.galleryLength
                                    ?
                                    <>
                                        (<span dangerouslySetInnerHTML={{__html: `${props.item.galleryLength}`}}/>
                                        <span dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'pics'})}}/>)
                                    </>
                                    :
                                    null
                            }

                        </figcaption>
                    </a>
                </figure>
            </div>
        </div>
    )
}

export default injectIntl(CardCollections);

