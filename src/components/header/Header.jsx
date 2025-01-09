import React, { useState, useEffect,useRef  } from 'react';
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import './Header.css'

export default function Header({ handleChange, query }) {

    const [menuSticky, setMenuSticky] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isActiveLink, setIsActiveLink] = useState(false);
    const [isActiveNav, setIsActiveNav] = useState(false);
    const subMenuRef = useRef(null);
    const navLinkRef = useRef(null);
    const searchRef = useRef(null);
    const searchBtnRef = useRef(null);

    const navRef = useRef(null);
    const navBtnRef = useRef(null);
    

    useEffect(() => {
        const handleScroll = () => {
            const offset = 200; // Смещение, при котором меню начнет скрываться
            if (window.pageYOffset > offset) {
                setMenuSticky(true);
            } else {
                setMenuSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const toggleSearchBlock = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !subMenuRef.current.contains(event.target) &&
                !navLinkRef.current.contains(event.target)
            ) {
                setIsActiveLink(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [subMenuRef, navLinkRef]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !searchRef.current.contains(event.target) &&
                !searchBtnRef.current.contains(event.target)
            ) {
                setIsActive(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [searchRef, searchBtnRef]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !navRef.current.contains(event.target) &&
                !navBtnRef.current.contains(event.target)
            ) {
                setIsActiveNav(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [navRef, navBtnRef]);


    const toggleLink = () => {
        setIsActiveLink(!isActiveLink);
    };

    const toggleNav = () => {
        setIsActiveNav(!isActiveNav);
    };

    return (
        <header className={` ${menuSticky ? 'sticky' : 'header'}`}>
            <div className='headerContainer'>
                <div className="headerTop">
                    <div className="blockInfo">
                        <button ref={navBtnRef} className='openNav' onClick={toggleNav}></button>
                        <div className="logo"></div>
                        <button ref={searchRef} className='search' onClick={toggleSearchBlock}></button>
                        <div ref={searchBtnRef} className={`searchBlock ${isActive ? 'active' : ''}`}>
                            <input type='text' placeholder='Search...' name='search' value={query} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="headerBottom">
                    <nav ref={navRef} className={`${isActiveNav ? 'active' : ''}`}>
                        <div className="navTop">
                            <div  className="navLogo"></div>
                            <button className='closeNav' onClick={() => setIsActiveNav(false)}></button>
                        </div>

                        <ul className='nav_items'>
                            <li className='nav_item'><NavLink>Demos<IoIosArrowDown /></NavLink></li>
                            <li className='nav_item'>
                                <NavLink ref={navLinkRef} onClick={toggleLink} >Post<IoIosArrowDown /></NavLink>
                                <div ref={subMenuRef} className={`subMenu ${isActiveLink ? 'active' : ''}`}>
                                    <ul>
                                        <li><NavLink>Post Header<IoIosArrowForward /></NavLink></li>
                                        <li><NavLink>Post Layout<IoIosArrowForward /></NavLink></li>
                                        <li><NavLink>Share Buttons<IoIosArrowForward /></NavLink></li>
                                        <li><NavLink>Gallery Post<IoIosArrowForward /></NavLink></li>
                                        <li><NavLink>Video Post<IoIosArrowForward /></NavLink></li>
                                    </ul>
                                </div>
                            </li>
                            <li className='nav_item'><NavLink>Features<IoIosArrowDown /></NavLink></li>
                            <li className='nav_item'><NavLink>Categories<IoIosArrowDown /></NavLink></li>
                            <li className='nav_item'><NavLink>Shop<IoIosArrowDown /></NavLink></li>
                            <li className='nav_item'><NavLink>Buy Now</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
