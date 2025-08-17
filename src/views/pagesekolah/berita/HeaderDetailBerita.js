import React from 'react';
import "../../../css/berita/cardBerita.css";
import { Link } from "react-router-dom";

const HeaderDetailBerita = ({ title, header }) => {
    return (
        <div className='header-berita'>
            <ul>
                <li><Link to="/"><i class="fas fa-home"></i> Beranda</Link></li>
                <li><Link to="/news"><i class="fas fa-angle-right"></i> <span style={{fontWeight: "normal"}}>{title}</span> </Link></li>
                <li><i class="fas fa-angle-right"></i> <span style={{fontWeight: "normal"}}>{header}</span> </li>
            </ul>
        </div>
    );
};

export default HeaderDetailBerita;