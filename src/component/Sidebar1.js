import React, { useEffect, useRef } from "react";
import "../../src/component/sidebar.css";
import Swal from "sweetalert2";
import { NavLink, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

function Sidebar1({ toggleSidebar }) {
  const history = useHistory();
  const location = useLocation();
  const menuRefs = useRef([]);
  const ProfileRefs = useRef([]);
  const SiswaRefs = useRef([]);
  const saprasRefs = useRef([]);

  const menuItems = [
    { title: "Berita", icon: "fa-regular fa-rectangle-list", action: ["/add-berita-admin", "/edit-berita", "/detail-berita"], path: "/admin-berita" },
    { title: "Laporan", icon: "fa-regular fa-rectangle-list", action: ["/add-berita-admin", "/edit-berita", "/detail-berita"], path: "/admin/laporanbosp" },
    { title: "Kontak", icon: "fa-solid fa-id-card", path: "/admin-kontak", action: ["/add-kontak", "/edit-kontak"] },
    { title: "Galeri", icon: "fa-solid fa-images", path: "/admin-galery", action: ["/add-galery", "/edit-galery"] },
    { title: "Jenjang", icon: "fa-regular fa-rectangle-list", path: "/admin-jenjang", action: ["/add-jenjang", "/edit-jenjang", "/detail-jenjang"] },
    { title: "Kategori Galeri", icon: "fa-solid fa-list", path: "/admin-category-galery", action: ["/add-category-galery", "/edit-category-galery"] },
  ];

  const profileItem = [
    { title: "Sejarah", icon: "fas fa-comment-dots", path: "/admin-sejarah", action: ["/add-sejarah", "/edit-sejarah", "/detail-sejarah"] },
    { title: "Visi Misi", icon: "fa-solid fa-list", path: "/admin-visimisi", action: ["/add-visimisi", "/edit-visimisi", "/detail-visimisi"] },
    { title: "Prestasi", icon: "fa-solid fa-medal metismenu-icon", path: "/admin-prestasi", action: ["/add-prestasi", "/edit-prestasi", "/detail-prestasi"] },
    { title: "Guru", icon: "fa-solid fa-chalkboard-user", path: "/admin-guru", action: ["/add-guru", "/edit-guru", "/detail-guru"] },
    { title: "Struktur Organisasi", icon: "fa-solid fa-sitemap", path: "/admin-struktur", action: ["/add-struktur"] },
  ];

  const saprasItem = [
    { title: "Program", icon: "fas fa-tasks", path: "/admin-program", action: ["/add-program", "/edit-program", "/detail-program"] },
  ];

  useEffect(() => {
    const scrollToActive = (items, refs) => {
      const activeIndex = items.findIndex(item => location.pathname === item.path);
      if (activeIndex !== -1 && refs.current[activeIndex]) {
        refs.current[activeIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    };
    scrollToActive(menuItems, menuRefs);
    scrollToActive(profileItem, ProfileRefs);
    scrollToActive(saprasItem, saprasRefs);
  }, [location.pathname]);

  const logout = () => {
    Swal.fire({
      title: "Keluar Dari Akun Anda ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Success Logout",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.clear();
        history.push("/login"); // pindah halaman tanpa reload
      }
    });
  };

  return (
    <nav id="sidebar" className="sidebar-wrapper">
      <div className="sidebar-content">
        <div className="sidebar-brand">
          <NavLink to="/" style={{ textAlign: "center" }}>
            SLBC PELITA ILMU
          </NavLink>
          <div id="close-sidebar" onClick={toggleSidebar}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="sidebar-menu1">
          <ul>
            <li className="header-menu1"><span>Sekolah</span></li>
            {profileItem.map((data, index) => (
              <li key={index} ref={(el) => (ProfileRefs.current[index] = el)}>
                <NavLink to={data.path} style={{ background: "none" }}>
                  <i className={`${data.icon} ${location.pathname === data.path || data.action.includes(location.pathname) ? "active" : ""}`}></i>
                  <span>{data.title}</span>
                </NavLink>
              </li>
            ))}
            <li className="header-menu1"><span>Menu</span></li>
            {menuItems.map((data, index) => (
              <li key={index} ref={(el) => (menuRefs.current[index] = el)}>
                <NavLink to={data.path} style={{ background: "none" }}>
                  <i className={`${data.icon} ${location.pathname === data.path || data.action.includes(location.pathname) ? "active" : ""}`}></i>
                  <span>{data.title}</span>
                </NavLink>
              </li>
            ))}
            <li className="header-menu1"><span>Sarana Prasana</span></li>
            {saprasItem.map((data, index) => (
              <li key={index} ref={(el) => (saprasRefs.current[index] = el)}>
                <NavLink to={data.path} style={{ background: "none" }}>
                  <i className={`${data.icon} ${location.pathname === data.path || data.action.includes(location.pathname) ? "active" : ""}`}></i>
                  <span>{data.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sidebar-footer">
        <button type="button" onClick={logout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span> Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Sidebar1;
