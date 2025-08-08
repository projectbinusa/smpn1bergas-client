import React, { useEffect, useState } from "react";
import "../css/navbarSekolah.css";
import logo from "../aset/slbcpelita/slbc-white.png";
import axios from "axios";
import { API_DUMMY } from "../utils/base_URL";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NavbarSekolah = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [list, setList] = useState([])
  const history = useHistory()

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

  useEffect(() => {
    getAll()
  }, [])

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
              {list.map((data) => {
                return (
                  <li key={data.id}>
                    <a href={"/jenjang/" + data.link}>{data.nama_jenjang}</a>
                  </li>
                );
              })}

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

export default NavbarSekolah;
