import React from "react";
import classes from './Drawer.module.css';
import {Backdrop} from "../../ui/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

const links = [
    {to: '/', label: 'Список', exact: true},
    {to: '/auth', label: 'Авторизация', exact: false},
    {to: '/quiz-creator', label: 'Создать тест', exact: false},
];

const Drawer = props => {
    const cls = [
        classes.Drawer
    ];

    if (!props.isOpen) {
        cls.push(classes.close)
    }

    const clickHandler = () => {
        props.onClouse();
    }

    const renderLinks = () => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        });
    };

    return (
        <React.Fragment>
            {props.isOpen && <Backdrop onClick={props.onClouse}/>}
            <nav className={cls.join(' ')}>
                <ul>
                    {renderLinks()}
                </ul>
            </nav>
        </React.Fragment>
    )
};

export default Drawer;