import React, { useEffect, useState } from "react";
import "../css/navbarSekolah.css";
import logo from "../aset/slbcpelita/slbc-white.png";

const NavbarSekolah2 = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollToSection = (id) => {
    const isHomePage = window.location.pathname === "/";

    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Simpan id ke sessionStorage dan navigasi ke halaman beranda
      sessionStorage.setItem('scrollToId', id);
      window.location.href = `/`;
    }
  };


  const handleMenuClick = (event, menu) => {
    event.preventDefault();
    setActiveMenu(menu);

    const submenu = event.target.nextElementSibling;

    document.querySelectorAll(".submenu").forEach((item) => {
      if (item !== submenu) item.style.display = "none";
    });

    if (submenu.style.display === "block") {
      submenu.style.display = "none";
    } else {
      submenu.style.display = "block";
    }
  };

  return (
    <nav className={`navbars2`}>
      <div className="navbars-container">
        <a href="/">
          <img src={logo} alt="Logo" className="navbars-logo" />
        </a>
        <ul className={`navbars-menu ${isMenuOpen ? "active" : ""}`} style={{ fontSize: "13.8px" }}>
          <li className="navbars-item">
            <a href="/" style={{ textTransform: "uppercase", fontWeight: "600" }}>Beranda</a>
          </li>
          <li className={`navbars-item ${activeMenu === "profil-sekolah" ? "active" : ""}`}>
            <a href="#profil-sekolah" className="has-submenu" onClick={(e) => handleMenuClick(e, "profil-sekolah")}>
              Sekolah <i class="fa-solid fa-caret-down"></i>
            </a>
            <ul className="submenu">
              {/* <li><a href="/sambutan">SAMBUTAN KEPALA SEKOLAH</a></li> */}
              <li><a href="/sejarah">SEJARAH</a></li>
              <li><a href="/tujuan">tujuan</a></li>
              <li><a href="/visi-misi">VISI & MISI</a></li>
              <li><a href="/struktur-organisasi">STRUKTUR ORGANISASI</a></li>
              {/* <li><a href="/kondisi-sekolah-view">KONDISI SEKOLAH</a></li>
              <li><a href="/staff">STAFF</a></li> */}
            </ul>
          </li>
          {/* <li className={`navbars-item ${activeMenu === "berita" ? "active" : ""}`}>
            <a href="#berita" className="has-submenu" onClick={(e) => handleMenuClick(e, "berita")}>
              Berita <i class="fa-solid fa-caret-down"></i>
            </a>
            <ul className="submenu">
              <li><a href="/news">BERITA TERBARU</a></li>
              <li><a href="/info">INFO SEKOLAH</a></li>
              <li><a href="/agenda">AGENDA</a></li>
              <li><a href="/galery">GALERI</a></li>
            </ul>
          </li>
          <li className={`navbars-item ${activeMenu === "keuangan" ? "active" : ""}`}>
            <a href="#keuangan" className="has-submenu" onClick={(e) => handleMenuClick(e, "keuangan")}>
              KEUANGAN <i class="fa-solid fa-caret-down"></i>
            </a>
            <ul className="submenu">
              <li><a href="/keuangan-bos">BOS</a></li>
              <li><a href="/keuangan-apbd">APBD</a></li>
              <li><a href="/keuangan-komite">KOMITE</a></li>
            </ul>
          </li>
          <li className={`navbars-item ${activeMenu === "kesiswaan" ? "active" : ""}`}>
            <a href="#kesiswaan" className="has-submenu" onClick={(e) => handleMenuClick(e, "kesiswaan")}>
              KESISWAAN <i class="fa-solid fa-caret-down"></i>
            </a>
            <ul className="submenu">
              <li><a href="/materi_ajar">MATERI AJAR</a></li>
              <li><a href="/osis">OSIS</a></li>
              <li>
                <a href="/ekstrakurikuler" style={{ textTransform: "uppercase", fontWeight: "600" }}>EKSTRAKURIKULER</a>
              </li>
            </ul>
          </li>
          <li className={`navbars-item ${activeMenu === "berita" ? "active" : ""}`}>
            <a href="#sapras" className="has-submenu" onClick={(e) => handleMenuClick(e, "berita")}>
              Sarana prasarana <i class="fa-solid fa-caret-down"></i>
            </a>
            <ul className="submenu">
              <li><a href="/sarana-prasarana">SARANA</a></li>
              <li><a href="/program">PROGRAM</a></li>
              <li><a href="/kegiatan">KEGIATAN</a></li>
            </ul>
          </li>
          <li className="navbars-item">
            <a href="/perpustakaan" style={{ textTransform: "uppercase", fontWeight: "600" }}>PERPUSTAKAAN</a>
          </li>
          <li className="navbars-item">
            <a href="/all-prestasi" style={{ textTransform: "uppercase", fontWeight: "600" }}>PRESTASI</a>
          </li>
          <li className="navbars-item">
            <a href="/kontak" style={{ textTransform: "uppercase", fontWeight: "600" }}>KONTAK</a>
          </li> */}
          <li
            className={`navbars-item ${activeMenu === "jenjang" ? "active" : ""
              }`}>
            <a
              href="#jenjang"
              className="has-submenu"
              onClick={(e) => handleMenuClick(e, "jenjang")}>
              Jenjang<i class="fa-solid fa-caret-down" style={{ paddingLeft: "5px" }}></i>
            </a>
            <ul className="submenu">
              <li>
                <a href="/jenjangsd">SD LB</a>
              </li>
              <li>
                <a href="/jenjangsmp">SMP LB</a>
              </li>
              <li>
                <a href="/jenjangsma">SMA LB</a>
              </li>
            </ul>
          </li>
          <li className={`navbars-item ${activeMenu === "galeri" ? "active" : ""}`}>
            <a href="#galeri" className="has-submenu" onClick={(e) => handleMenuClick(e, "galeri")}>
              Galeri<i class="fa-solid fa-caret-down" style={{ paddingLeft: "5px" }}></i>
            </a>
            <ul className="submenu">
              <li>
                <a href="/news">Pembelajaran</a>
              </li>
              <li>
                <a href="/info">Kegiatan Keterampilan</a>
              </li>
            </ul>
          </li>
          <li className="navbars-item">
            <a href="/all-prestasi" style={{ textTransform: "uppercase", fontWeight: "600" }}>PRESTASI</a>
          </li>
          <li className="navbars-item">
            <a href="/news" style={{ textTransform: "uppercase", fontWeight: "600" }}>berita</a>
          </li>
          {/* <li className="navbars-item">
            <a
              href="/perpustakaan"
              style={{ textTransform: "uppercase", fontWeight: "600" }}>
              PERPUSTAKAAN
            </a>
          </li> */}
          <li className="navbars-item">
            <a href="/kontak" style={{ textTransform: "uppercase", fontWeight: "600" }}>KONTAK</a>
          </li>
          <li className="navbars-item btn-bos">
            <a href="/laporanbosp" style={{ textTransform: "uppercase", fontWeight: "600" }}>Laporan BOSP</a>
          </li>
        </ul>
        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "✖" : "☰"}
        </div>
      </div>
    </nav>
  );
};

export default NavbarSekolah2;
