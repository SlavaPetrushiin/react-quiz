import React from "react";
import classes from './Drawer.module.css';
import {Backdrop} from "../../ui/Backdrop/Backdrop";

const links  = [1, 2, 3];

const Drawer = props => {
    const cls = [
        classes.Drawer
    ];

    if(!props.isOpen){
        cls.push(classes.close)
    }

    const renderLinks = () => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a>Link {link}</a>
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