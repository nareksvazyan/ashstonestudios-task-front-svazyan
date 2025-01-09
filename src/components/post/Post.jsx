import './Post.css'
import React, { useState } from 'react';

export default function Post({ item }) {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <div className="postBlock">
            <div className="img">
                <img src={item.img} srcSet={`${item.img} 1x, ${item.img_2x} 2x`} alt="post img" />
            </div>
            <span className="tags">{item.tags}</span>
            <h1 className='title' onClick={togglePopup}>{item.title}</h1>
            <div className="info">
                <h2 className="autor">{item.autor}</h2>
                <i></i>
                <span className="date">{item.date}</span>
                <i></i>
                <span className="count">{item.views} Views</span>
            </div>
            <p>{item.text}</p>
            {isPopupOpen && (
                <div className="popup">
                    <div className="popupBlock">
                        <h2>{item.title}</h2>
                        <p>{item.text}</p>
                        <button onClick={togglePopup}></button>
                    </div>
                </div>
            )}
        </div>
    );
}
