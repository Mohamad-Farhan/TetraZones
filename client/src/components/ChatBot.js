import React from 'react';
import './chat.css'

const Whatsapp = () => {
    return (
        <>
            <a
                href="https://wa.me/+962785836823"
                className="whatsapp_float"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className="fab fa-whatsapp whatsapp-icon"></i>
            </a>
        </>
    )
}

export default Whatsapp;