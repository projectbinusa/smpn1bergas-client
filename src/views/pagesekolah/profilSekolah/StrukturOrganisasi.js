import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../component/FooterSekolah";
import "../../../css/alumni/struktur.css";
import { API_DUMMY } from "../../../utils/base_URL";
import axios from "axios";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import user from "../../../aset/smpn1bergas/user_df.jpg";
import Aos from "aos";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";

function StrukturOrganisasi() {
  const [currentPage, setCurrentPage] = useState(1);
  const [struktur, setStruktur] = useState([]);
  const [totalPages, setTotalPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });

  const getAllStruktur = async (page = 1) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/struktur/all?page=${page - 1}&size=10`
      );
      setStruktur(response.data.data.content);
      setPaginationInfo({
        totalPages: response.data.data.totalPages,
        totalElements: response.data.data.totalElements,
      });
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    getAllStruktur(currentPage);
    Aos.init();
  }, [currentPage]);

  const download = () => {
    const link = document.createElement("a");
    link.href = user;
    link.download = "STRUKTUR_ORG_SMPN1BERGAS.jpeg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section style={{ backgroundColor: "#f8f9fa" }}>
      <NavbarSekolah2 />
      <div className="team-area pd-top-115 pd-bottom-90">
        <div className="container">
          <div className="header-struktur" data-aos="fade-down">
            <ul>
              <li>
                <Link to="/">
                  <i className="fas fa-home"></i> Beranda
                </Link>
              </li>
              <li>
                <a href="/">
                  <i className="fas fa-angle-right"></i> Struktur Organisasi
                </a>
              </li>
            </ul>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8" data-aos="fade-up">
              <div className="section-title style-white text-center">
                <h5 className="sub-title double-line">Organisasi</h5>
                <h2 className="title" style={{ color: "black" }}>
                  Struktur Dan Anggota Organisasi
                </h2>
              </div>
              {/* {struktur.length > 0 && (
                <div className="mb-5">
                  <button
                    onClick={download}
                    style={{
                      border: "none",
                      backgroundColor: "#003366",
                      color: "white",
                      display: "flex",
                      marginLeft: "auto",
                      marginRight: "auto",
                      padding: 10,
                      borderRadius: "10px",
                      fontWeight: "600",
                    }}
                  >
                    Download lengkap struktur di sini
                  </button>
                </div>
              )} */}
            </div>
          </div>

          <div className="row" data-aos="fade-up">
            {struktur.length > 0 ? (
              struktur.map((item) => (
                <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                  <div className="struktur-card text-center">
                    <div className="struktur-img">
                      <img
                        src={item.foto || user}
                        alt={item.nama}
                        onError={(e) => (e.target.src = user)}
                      />
                    </div>

                    <div className="struktur-badge">{item.nama}</div>

                    <p className="struktur-jabatan">{item.jabatan}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Struktur Dan Anggota Organisasi Tidak Tersedia</p>
              </div>
            )}
          </div>
          {struktur.length > 0 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination
                count={paginationInfo.totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                showFirstButton
                showLastButton
                color="primary"
              />
            </div>
          )}
        </div>
      </div>
      <FooterSekolah />
    </section>
  );
}

export default StrukturOrganisasi;