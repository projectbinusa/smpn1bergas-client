import React, { useEffect, useState } from "react";
import "../css/navbarSekolah.css";
import logo from "../aset/smpn1bergas/logo.png";

const NavbarSekolah2 = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState("");

  const handleMenuClick = (event, menu) => {
    event.preventDefault();
    setOpenSubmenu(prev => prev === menu ? "" : menu);
    setActiveMenu(menu);
  };

  const handleScrollToSection = (id) => {
    const isHomePage = window.location.pathname === "/";
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem('scrollToId', id);
      window.location.href = `/`;
    }
  };

  return (
    <nav className="navbars2">
      <div className="navbars-container">
        <a href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img src={logo} alt="Logo" className="navbars-logo"
            style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
        </a>

        <ul className={`navbars-menu ${isMenuOpen ? "active" : ""}`} style={{ fontSize: "13.8px" }}>

          <li className="navbars-item">
            <a href="#profil-sekolah" className="has-submenu"
              onClick={(e) => handleMenuClick(e, "profil-sekolah")}>
              Profil Sekolah <i className="fa-solid fa-caret-down"></i>
            </a>
            <ul className="submenu"
              style={{ display: openSubmenu === "profil-sekolah" ? "block" : "none" }}>
              <li><a href="/sambutan">SAMBUTAN KEPALA SEKOLAH</a></li>
              <li><a href="/sejarah">SEJARAH</a></li>
              <li><a href="/visi-misi">VISI & MISI</a></li>
              <li><a href="/struktur-organisasi">STRUKTUR ORGANISASI</a></li>
              <li><a href="/kondisi-sekolah-view">KONDISI SEKOLAH</a></li>
              <li><a href="/staff">STAFF</a></li>
            </ul>
          </li>

          <li className="navbars-item">
            <a href="#berita" className="has-submenu"
              onClick={(e) => handleMenuClick(e, "berita")}>
              Berita <i className="fa-solid fa-caret-down"></i>
            </a>
            <ul className="submenu"
              style={{ display: openSubmenu === "berita" ? "block" : "none" }}>
              <li><a href="/news">BERITA TERBARU</a></li>
              <li><a href="/info">INFO SEKOLAH</a></li>
              <li><a href="/agenda">AGENDA</a></li>
              <li><a href="/galery">GALERI</a></li>
            </ul>
          </li>

          <li className="navbars-item">
            <a href="#kesiswaan" className="has-submenu"
              onClick={(e) => handleMenuClick(e, "kesiswaan")}>
              KESISWAAN <i className="fa-solid fa-caret-down"></i>
            </a>
            <ul className="submenu"
              style={{ display: openSubmenu === "kesiswaan" ? "block" : "none" }}>
              <li><a href="/materi_ajar">MATERI AJAR</a></li>
              <li><a href="/osis">OSIS</a></li>
              <li><a href="/ekstrakurikuler">EKSTRAKURIKULER</a></li>
            </ul>
          </li>

          <li className="navbars-item">
            <a href="#sapras" className="has-submenu"
              onClick={(e) => handleMenuClick(e, "sapras")}>
              Sarana Prasarana <i className="fa-solid fa-caret-down"></i>
            </a>
            <ul className="submenu"
              style={{ display: openSubmenu === "sapras" ? "block" : "none" }}>
              <li><a href="/sarana-prasarana">SARANA</a></li>
              <li><a href="/program">PROGRAM</a></li>
              <li><a href="/kegiatan">KEGIATAN</a></li>
            </ul>
          </li>

          <li className="navbars-item">
            <a href="/perpustakaan" style={{ textTransform: "uppercase", fontWeight: "600" }}>
              PERPUSTAKAAN
            </a>
          </li>
          <li className="navbars-item">
            <a href="/all-prestasi" style={{ textTransform: "uppercase", fontWeight: "600" }}>
              PRESTASI
            </a>
          </li>
          <li className="navbars-item">
            <a href="/kontak" style={{ textTransform: "uppercase", fontWeight: "600" }}>
              KONTAK
            </a>
          </li>
        </ul>

        <div className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "✖" : "☰"}
        </div>
      </div>
    </nav>
  );
};

export default NavbarSekolah2;