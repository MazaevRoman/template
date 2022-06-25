/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

class Card extends React.Component {
    render() {
    return (
        <details className="card">
            <summary className="description_card">
                {this.props.name}
            </summary>
            <ul className="list_card">{
                    this.props.artist && <p>Исполнитель: {this.props.artist}</p>
                }
                <p>Слушатели: {this.props.playcount} человек</p>
            </ul>
        </details>
    );
    }
}

export default Card;