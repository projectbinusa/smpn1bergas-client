import React, { useEffect } from 'react';
import "../../../css/berita/cardBerita.css"
import Aos from 'aos';
import { Link } from "react-router-dom";

const HeaderBerita = ({ title }) => {
    useEffect(() => {
        Aos.init();
    }, [])
    return (
        <div data-aos="fade-down" className='header-berita'>
            <ul>
                <li><Link to="/"><i class="fas fa-home"></i> Beranda</Link></li>
                <li><i class="fas fa-angle-right"></i> <span style={{fontWeight: "normal"}}>{title}</span> </li>
            </ul>
        </div>
    );
};

export default HeaderBerita;