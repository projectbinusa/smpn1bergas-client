import React, { useEffect, useRef, useState } from "react";
import "../../src/component/sidebar.css"; // Assuming you have the CSS in this file
import Swal from "sweetalert2";
import {
  NavLink,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

function Sidebar1({ toggleSidebar }) {
  // const [activeDropdown, setActiveDropdown] = useState(null);
  // const [sidebarToggled, setSidebarToggled] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const menuRefs = useRef([]);
  const ProfileRefs = useRef([]);
  const SiswaRefs = useRef([]);
  const saprasRefs = useRef([]);

  useEffect(() => {
    const activeIndex = menuItems.findIndex(
      (item) => location.pathname === item.path
    );
    if (activeIndex !== -1 && menuRefs.current[activeIndex]) {
      menuRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
    const activeIndexProfile = profileItem.findIndex(
      (item) => location.pathname === item.path
    );
    if (activeIndexProfile !== -1 && ProfileRefs.current[activeIndexProfile]) {
      ProfileRefs.current[activeIndexProfile].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
    // const activeIndexSiswa = siswaItem.findIndex(
    //   (item) => location.pathname === item.path
    // );
    // if (activeIndexSiswa !== -1 && SiswaRefs.current[activeIndexSiswa]) {
    //   SiswaRefs.current[activeIndexSiswa].scrollIntoView({
    //     behavior: "smooth",
    //     block: "nearest",
    //   });
    // }
    const activeIndexsapras = saprasItem.findIndex(
      (item) => location.pathname === item.path
    );
    if (activeIndexsapras !== -1 && saprasRefs.current[activeIndexsapras]) {
      saprasRefs.current[activeIndexsapras].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
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
        history.push("/login");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        localStorage.clear();
      }
    });
  };

  const menuItems = [
    {
      title: "Berita",
      icon: "fa-regular fa-rectangle-list",
      action: ["/add-berita-admin", "/edit-berita", "/detail-berita"],
      path: "/admin-berita",
      //   badge: { text: "New", type: "warning" },
      //   submenu: ["Dashboard 1", "Dashboard 2", "Dashboard 3"],
    },
    {
      title: "Laporan",
      icon: "fa-regular fa-rectangle-list",
      action: ["/add-berita-admin", "/edit-berita", "/detail-berita"],
      path: "/admin/laporanbosp",
      //   badge: { text: "New", type: "warning" },
      //   submenu: ["Dashboard 1", "Dashboard 2", "Dashboard 3"],
    },
    {
      title: "Kontak",
      icon: "fa-solid fa-id-card",
      path: "/admin-kontak",
      action: ["/add-kontak", "/edit-kontak"],
    },
    // {
    //   title: "Sambutan",
    //   icon: "fa-solid fa-book-open",
    //   path: "/admin-sambutan",
    //   action: ["/add-sambutan", "/edit-sambutan"],
    // },
    // {
    //   title: "Alumni",
    //   icon: "fa-solid fa-users",
    //   path: "/admin-alumni",
    //   action: ["/add-alumni", "/edit-alumni", "/detail-alumni"],
    // },
    // {
    //   title: "Perpustakaan",
    //   icon: "fa-solid fa-book",
    //   path: "/admin-perpustakaan",
    //   action: ["/add-perpustakaan", "/edit-perpustakaan"],
    // },
//     {
//   title: "Kotak Saran",
//   icon: "fas fa-comment-dots",
//   path: "/admin-kotak-saran",
//   action: ["/add-kotak-saran", "/edit-kotak-saran"],
//   hidden: true,
// },

    // {
    //   title: "Materi Ajar",
    //   icon: "fas fa-file-alt",
    //   path: "/admin-materi-ajar",
    //   action: ["/add-materi-ajar", "/edit-materi-ajar", "/detail-materi-ajar"],
    // },
    {
      title: "Galeri",
      icon: "fa-solid fa-images",
      path: "/admin-galery",
      action: ["/add-galery", "/edit-galery"],
    },
    {
      title: "Jenjang",
      icon: "fa-regular fa-rectangle-list",
      path: "/admin-jenjang",
      action: ["/add-jenjang", "/edit-jenjang", "/detail-jenjang"]
    },
    // {
    //   title: "Keuangan",
    //   icon: "fa-solid fa-circle-dollar-to-slot",
    //   path: "/admin-keuangan",
    //   action: ["/add-keuangan", "/edit-keuangan", "/detail-keuangan"],
    //    hidden: true,
    // },
  ];

  const profileItem = [
    {
      title: "Sejarah",
      icon: "fas fa-comment-dots",
      path: "/admin-sejarah",
      action: ["/add-sejarah", "/edit-sejarah", "/detail-sejarah"],
    },
    {
      title: "Visi Misi",
      icon: "fa-solid fa-list",
      path: "/admin-visimisi",
      action: ["/add-visimisi", "/edit-visimisi", "/detail-visimisi"],
    },
    {
      title: "Prestasi",
      icon: "fa-solid fa-medal metismenu-icon",
      path: "/admin-prestasi",
      action: ["/add-prestasi", "/edit-prestasi", "/detail-prestasi"],
    },
    {
      title: "Guru",
      icon: "fa-solid fa-chalkboard-user",
      path: "/admin-guru",
      action: ["/add-guru", "/edit-guru", "/detail-guru"],
    },
    {
      title: "Struktur Organisasi",
      icon: "fa-solid fa-sitemap",
      path: "/admin-struktur",
      action: ["/add-struktur"],
    },
    // {
    //   title: "Tenaga Kependidikan",
    //   icon: "fa-solid fa-users-viewfinder",
    //   path: "/admin-tenaga-kependidikan",
    //   action: [
    //     "/add-tenaga-kependidikan",
    //     "/edit-tenaga-kependidikan",
    //     "/detail-tenaga-kependidikan",
    //   ],
    // },
    // {
    //   title: "Kondisi Sekolah",
    //   icon: "fa-solid fa-school",
    //   path: "/admin-kondisi-sekolah",
    //   action: [
    //     "/add-kondisi-sekolah",
    //     "/edit-kondisi-sekolah",
    //     "/detail-kondisi-sekolah",
    //   ],
    // },
  ];

  // const siswaItem = [
  //   // {
  //   //   title: "Osis",
  //   //   icon: "fa-solid fa-users",
  //   //   path: "/admin-osis",
  //   //   action: ["/add-osis", "/edit-osis", "/detail-osis"],
  //   //    hidden: true,
  //   // },
  //   {
  //     title: "Ekstrakurikuler",
  //     icon: "fa-solid fa-people-robbery",
  //     path: "/admin-ekstrakulikuler",
  //     action: [
  //       "/add-ekstrakulikuler",
  //       "/detail-ekstrakulikuler",
  //       "/edit-ekstrakulikuler",
  //       "/detail-ekstrakulikuler",
  //     ],
  //   },
  // ];

  const saprasItem = [
    // {
    //   title: "Sarana",
    //   icon: "fas fa-tools",
    //   path: "/admin-sarana",
    //   action: ["/add-sarana", "/edit-sarana", "/detail-sarana"],
    //    hidden: true,
    // },
    // {
    //   title: "Kegiatan",
    //   icon: "fas fa-calendar-alt",
    //   path: "/admin-kegiatan",
    //   action: ["/add-kegiatan", "/edit-kegiatan", "/detail-kegiatan"],
    // },
    // {
    //   title: "Struktur",
    //   icon: " fas fa-sitemap",
    //   path: "/admin-struktur",
    //   action: [
    //     "/add-struktur",
    //     "/detail-struktur",
    //     "/edit-struktur",
    //     "/detail-struktur",
    //   ],
    // },
    {
      title: "Program",
      icon: "fas fa-tasks",
      path: "/admin-program",
      action: ["/add-program", "/edit-program", "/detail-program"],
    },
  ];

  useEffect(() => {
    console.log(
      "data: ",
      menuItems.map((dt) => dt.badge)
    );
  }, []);

  return (
    <>
      <nav id="sidebar" className="sidebar-wrapper">
        <div className="sidebar-content">
          <div className="sidebar-brand">
            <a href="#" style={{ textAlign: "center" }}>
              SLBC PELITA ILMU
            </a>
            <div id="close-sidebar" onClick={toggleSidebar}>
              <i className="fas fa-times"></i>
            </div>
          </div>
          <div className="sidebar-menu1">
            <ul>
              <li className="header-menu1">
                <span>Sekolah</span>
              </li>
              {profileItem.map((data, index) => (
                <li key={index} ref={(el) => (ProfileRefs.current[index] = el)}>
                  <NavLink to={data.path} style={{ background: "none" }}>
                    <i
                      class={`${data.icon} ${
                        location.pathname === data.path ||
                        data.action.includes(location.pathname)
                          ? "active"
                          : ""
                      }`}></i>
                    <span>{data.title}</span>
                    {/* <span class="badge badge-pill badge-primary">Beta</span> */}
                  </NavLink>
                </li>
              ))}
              <li className="header-menu1">
                <span>Menu</span>
              </li>{" "}
              {menuItems.map((data, index) => (
                <li key={index} ref={(el) => (menuRefs.current[index] = el)}>
                  <NavLink to={data.path} style={{ background: "none" }}>
                    <i
                      className={`${data.icon} ${
                        location.pathname === data.path ||
                        data.action.includes(location.pathname)
                          ? "active"
                          : ""
                      }`}></i>

                    <span>{data.title}</span>
                    {/* <span class="badge badge-pill badge-primary">Beta</span> */}
                  </NavLink>
                </li>
              ))}
              {/* <li className="header-menu1">
                <span>Kesiswaan</span>
              </li>
              {siswaItem.map((data, index) => (
                <li key={index} ref={(el) => (SiswaRefs.current[index] = el)}>
                  <NavLink to={data.path} style={{ background: "none" }}>
                    <i
                      class={`${data.icon} ${
                        location.pathname === data.path ||
                        data.action.includes(location.pathname)
                          ? "active"
                          : ""
                      }`}></i>
                    <span>{data.title}</span>
                  </NavLink>
                </li>
              ))} */}
              <li className="header-menu1">
                <span>Sarana Prasana</span>
              </li>
              {saprasItem.map((data, index) => (
                <li key={index} ref={(el) => (saprasRefs.current[index] = el)}>
                  <NavLink to={data.path} style={{ background: "none" }}>
                    <i
                      class={`${data.icon} ${
                        location.pathname === data.path ||
                        data.action.includes(location.pathname)
                          ? "active"
                          : ""
                      }`}></i>
                    <span>{data.title}</span>
                    {/* <span class="badge badge-pill badge-primary">Beta</span> */}
                  </NavLink>
                </li>
              ))}
              {/* <li>
                <a href="#">
                  <i class="fa fa-calendar"></i>
                  <span>Calendar</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-folder"></i>
                  <span>Examples</span>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="sidebar-footer">
          <button type="button" onClick={logout}>
            <i class="fa-solid fa-right-from-bracket"></i>
            <span> Logout</span>
          </button>
        </div>
      </nav>
      {/* </div> */}
    </>
  );
}

export default Sidebar1;
