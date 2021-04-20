import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import CardCollections from "../../cards/cardCollections";


function CollectionsList(props) {
    const {intl} = props;
    return (
        <div className={`card-columns card-columns-${props.cols}`}>
            {
                props.collections
                    ?
                    props.collections.map(item => {
                        return <CardCollections
                            key={item.id}
                            item={item}
                            collectionsType={props.collectionsType}
                            smallCards={props.smallCards}/>
                    })
                    :
                    <p>
                        Loading...
                    </p>
            }
        </div>
    )
}

export default injectIntl(CollectionsList);

