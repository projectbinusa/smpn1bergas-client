import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../component/FooterSekolah";
import "../../../css/alumni/struktur.css";
import { API_DUMMY } from "../../../utils/base_URL";
import axios from "axios";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import excelstruktur from "../../../aset/smpn1bergas/STRUKTUR_ORG_SMP_NEGERI_1_BERGAS_2023.xlsx";
import Aos from "aos";

function StrukturOrganisasi() {
  const [currentPage, setCurrentPage] = useState(1);
  const [struktur, setStruktur] = useState([]);
  const [totalPages, setTotalPage] = useState(1);

  const getAllStruktur = async (page = 1) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/struktur/all?page=${page - 1}&size=10`
      );
      setStruktur(response.data.data.content);
      setTotalPage(response.data.data.totalPages);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllStruktur(currentPage);
    Aos.init();
  }, [currentPage]);

  const download = () => {
    const link = document.createElement("a");
    link.href = excelstruktur;
    link.download = "STRUKTUR_ORG_SMP_NEGERI_1_BERGAS_2023.xlsx";
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
                <a href="/">
                  <i className="fas fa-home"></i> Beranda
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="fas fa-angle-right"></i> Struktur Organisasi
                </a>
              </li>
            </ul>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-6" data-aos="fade-up">
              <div className="section-title style-white text-center">
                <h5 className="sub-title double-line">Organisasi</h5>
                <h2 className="title" style={{ color: "black" }}>
                  Struktur Dan Anggota Organisasi
                </h2>
              </div>
              {struktur.length > 0 && (
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
              )}
            </div>
          </div>

          <div className="row" data-aos="fade-up">
            {struktur.length > 0 ? (
              struktur.map((item) => (
                <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                  <div className="card text-center border-0 shadow-sm h-100">
                    <div className="card-body d-flex flex-column align-items-center">
                      <img
                        src={item.foto}
                        alt={item.nama}
                        className="rounded-circle mb-3"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          backgroundColor: "#003366",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontWeight: "bold",
                          marginBottom: "6px",
                        }}
                      >
                        {item.nama}
                      </div>
                      <p className="text-muted m-0">{item.jabatan}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Struktur Dan Anggota Organisasi Tidak Tersedia</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterSekolah />
    </section>
  );
}

export default StrukturOrganisasi;
