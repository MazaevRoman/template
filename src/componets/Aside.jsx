/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

class Aside extends React.Component {
    render() {
        return (
            <aside className="accordion">
                <ul className="tags">
                    <li>
                        <a href="">
                            <img className="profile-icon" src="images/profile-user.png" alt="Profile" width="60px" height="60px" />
                        </a>
                    </li>
                    <li className="tag"> <a className="tag-link" href="">Аккаунт</a></li>
                    <li className="tag"> <a className="tag-link" href="">Профиль</a></li>
                    <li className="tag"> <a className="tag-link" href="">Выйти</a></li>
                </ul>
            </aside>
        );
    }
}

export default Aside;