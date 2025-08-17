import React from "react";
import { Link } from "react-router-dom";

function HeaderGaleri() {
    return (
        <div className='header-galeri'>
            <ul>
                <li><Link to="/"><i className="fas fa-home"></i> Beranda</Link></li>
                <li><i class="fas fa-angle-right"></i> <span style={{ fontWeight: "normal" }}>Galeri</span> </li>
            </ul>
        </div>
    );
}

export default HeaderGaleri;