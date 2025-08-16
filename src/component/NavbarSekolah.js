import React, { useEffect, useState } from "react";
import "../css/navbarSekolah.css";
import logo from "../aset/slbcpelita/slbc-white.png";
import axios from "axios";
import { API_DUMMY } from "../utils/base_URL";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NavbarSekolah = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [list, setList] = useState([]);
  const [listKategori, setListKategori] = useState([]);

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

    const parentLi = event.currentTarget.closest("li");
    const submenu = parentLi.querySelector(".submenu");

    // Tutup semua submenu lain
    document.querySelectorAll(".submenu").forEach((item) => {
      if (item !== submenu) item.style.display = "none";
    });

    // Toggle submenu
    if (submenu) {
      submenu.style.display = submenu.style.display === "block" ? "none" : "block";
    }
  };


  const getAll = async (page) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/jenjang/all`
      );
      setList(response.data.data.content);
      console.log("jenjang: ", response.data.data.content);

    } catch (error) {
      console.error("Terjadi Kesalahan", error);
      // if (error.status === 401) {
      //   localStorage.clear();
      //   history.push("/login");
      // }
    }
  };


  const getAllKategori = async (page) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/category_galery/all`
      );
      setListKategori(response.data.data.content);
      console.log("jenjang: ", response.data.data.content);

    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };


  useEffect(() => {
    getAll()
    getAllKategori()
  }, [])

  return (
    <nav className={`navbars2`}>
      <div className="navbars-container">
        <a href="/">
          <img src={logo} alt="Logo" className="navbars-logo" />
        </a>
        <ul className={`navbars-menu ${isMenuOpen ? "active" : ""}`} style={{ fontSize: "13.8px" }}>
          <li className="navbars-item">
            <Link to="/" style={{ textTransform: "uppercase", fontWeight: "600" }}>Beranda</Link>
          </li>
          <li className={`navbars-item ${activeMenu === "profil-sekolah" ? "active" : ""}`}>
            <span className="has-submenu"
              style={{ color: "#fff" }}
              onClick={(e) => handleMenuClick(e, "profil-sekolah")}
            >
              Sekolah <i className="fa-solid fa-caret-down"></i>
            </span>
            <ul className="submenu">
              {/* <li><a href="/sambutan">SAMBUTAN KEPALA SEKOLAH</a></li> */}
              <li><Link to="/sejarah">SEJARAH</Link></li>
              <li><Link to="/tujuan">TUJUAN</Link></li>
              <li><Link to="/visi-misi">VISI & MISI</Link></li>
              <li><Link to="/struktur-organisasi">STRUKTUR ORGANISASI</Link></li>
              {/* <li><a href="/kondisi-sekolah-view">KONDISI SEKOLAH</a></li>
              <li><a href="/staff">STAFF</a></li> */}
            </ul>
          </li>
          <li className={`navbars-item ${activeMenu === "jenjang" ? "active" : ""}`}>
            <span
              className="has-submenu"
              style={{ color: "#fff" }}
              onClick={(e) => handleMenuClick(e, "jenjang")}
            >
              Jenjang<i className="fa-solid fa-caret-down" style={{ paddingLeft: "5px" }}></i>
            </span>
            <ul className="submenu">
              {listKategori.map((data) => (
                <li key={data.id}>
                  <Link to={`/galery/kategori_galeri/${data.id}`}>{data.category}</Link>
                </li>
              ))}
            </ul>
          </li>
         <li className={`navbars-item ${activeMenu === "guru" ? "active" : ""}`}>
  <a
    href="#guru"
    className="has-submenu"
    onClick={(e) => handleMenuClick(e, "guru")}
  >
    Guru <i className="fa-solid fa-caret-down" style={{ paddingLeft: "5px" }}></i>
  </a>
  <ul className="submenu">
    <li>
      <Link to="/guru-All">Data Guru</Link>
    </li>
  </ul>
</li>

          <li className={`navbars-item ${activeMenu === "guru" ? "active" : ""}`}>
  <span
    className="has-submenu"
    style={{ color: "#fff" }}
    onClick={(e) => handleMenuClick(e, "guru")}
  >
    Guru <i className="fa-solid fa-caret-down" style={{ paddingLeft: "5px" }}></i>
  </span>
  <ul className="submenu">
    <li>
      <Link to="/guru-All">Data Guru</Link>
    </li>
  </ul>
</li>


          <li className="navbars-item">
            <Link to="/all-prestasi" style={{ textTransform: "uppercase", fontWeight: "600" }}>PRESTASI</Link>
          </li>
          <li className="navbars-item">
            <Link to="/news" style={{ textTransform: "uppercase", fontWeight: "600" }}>BERITA</Link>
          </li>
          {/* <li className="navbars-item">
            <a
              href="/perpustakaan"
              style={{ textTransform: "uppercase", fontWeight: "600" }}>
              PERPUSTAKAAN
            </a>
          </li> */}
          <li className="navbars-item">
            <Link to="/kontak" style={{ textTransform: "uppercase", fontWeight: "600" }}>KONTAK</Link>
          </li>
          <li className="navbars-item btn-bos">
            <Link to="/laporanbosp" style={{ textTransform: "uppercase", fontWeight: "600" }}>Laporan BOSP</Link>
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

export default NavbarSekolah;
