import React from "react";
import classes from './Drawer.module.css';
import {Backdrop} from "../../ui/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

const Drawer = props => {
    const cls = [
        classes.Drawer
    ];

    if (!props.isOpen) {
        cls.push(classes.close)
    }

    const clickHandler = () => {
        props.onClouse();
    };

    const renderLinks = (links) => {
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

    const links = [
        {to: '/', label: 'Список', exact: true},
    ];

    if(props.isAuthenticated){
        links.push({to: '/quiz-creator', label: 'Создать тест', exact: false});
        links.push({to: '/logout', label: 'Выйти', exact: false});
    } else{
        links.push({to: '/auth', label: 'Авторизация', exact: false});
    }


    return (
        <React.Fragment>
            {props.isOpen && <Backdrop onClick={props.onClouse}/>}
            <nav className={cls.join(' ')}>
                <ul>
                    { renderLinks(links) }
                </ul>
            </nav>
        </React.Fragment>
    )
};

export default Drawer;