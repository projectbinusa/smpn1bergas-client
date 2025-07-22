import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../component/FooterSekolah";
import "../../../css/alumni/struktur.css";
import { API_DUMMY } from "../../../utils/base_URL";
import axios from "axios";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import bg from "../../../aset/bg-img.webp";
import excelstruktur from "../../../aset/smpn1bergas/STRUKTUR_ORG_SMP_NEGERI_1_BERGAS_2023.xlsx";
import Aos from "aos";

function StrukturOrganisasi() {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    getAllStruktur(pageNumber);
  };

  // GET ALL STRUKTUR
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
    <section style={{ backgroundImage: " url('../../../aset/bg-img.webp')" }}>
      <NavbarSekolah2 />
      {/* <main className="container-struktur container">
        <div className="header-struktur">
          <ul>
            <li>
              <a href="/">
                <i class="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <a href="/">
                <i class="fas fa-angle-right"></i> Struktur Organisasi{" "}
              </a>
            </li>
          </ul>
        </div>
        {struktur.length > 0 ? (
          struktur.map((item) => (
            <div className="struktur" key={item.id}>
              <div>
                <h4>{item.jabatan}</h4>
                {item.foto !== null ? (
                  <>
                    <img src={item.foto} />
                  </>
                ) : (
                  <></>
                )}
                <p style={{ textAlign: "left" }}>{item.nama}</p>
              </div>
              <div>
                <h4>DESKRIPSI TUGAS</h4>
                <p style={{ textAlign: "left" }}>{item.tugas}</p>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </main> */}
      <div class="team-area pd-top-115 pd-bottom-90">
        <div class="container">
          <div className="header-struktur" data-aos="fade-down">
            <ul>
              <li>
                <a href="/">
                  <i class="fas fa-home"></i> Beranda
                </a>
              </li>
              <li>
                <a href="/">
                  <i class="fas fa-angle-right"></i> Struktur Organisasi{" "}
                </a>
              </li>
            </ul>
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-6" data-aos="fade-up">
              <div class="section-title style-white text-center">
                <h5 class="sub-title double-line">Organisasi</h5>
                <h2 class="title" style={{ color: "black" }}>
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
                    }}>
                    Download lengkap struktur disini
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="row" data-aos="fade-up">
            {struktur.length > 0 ? (
              struktur.map((item) => (
                <div className="col-lg-4 col-md-6" key={item.id}>
                  <div className="single-team-inner style-2 text-center">
                    <div className="thumb">
                      <img src={item.foto} alt={item.nama} />
                    </div>
                    <div className="details-wrap">
                      <div className="details-inner">
                        <h4>
                          <a>{item.nama}</a>
                        </h4>
                        <p>{item.jabatan}</p>
                        {/* <ul class="social-media mt-3 mb-2">
                          <li>
                            <a class="facebook" href="#">
                              <i class="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a class="twitter" href="#">
                              <i class="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a class="instagram" href="#">
                              <i class="fab fa-instagram"></i>
                            </a>
                          </li>
                          <li>
                            <a class="youtube" href="#">
                              <i class="fab fa-youtube"></i>
                            </a>
                          </li>
                        </ul> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Struktur Dan Anggota Organisasi Tidak Tersedia</p>
              </div>
            )}

            {/* <div class="col-lg-3 col-md-6">
            <div class="single-team-inner style-2 text-center">
              <div class="thumb">
                <img src="assets/img/team/2.webp" alt="img" />
              </div>
              <div class="details-wrap">
                <div class="details-inner">
                  <h4><a href="team-details.html">Karshin Kumar</a></h4>
                  <p>Founder</p>
                  <ul class="social-media mt-3 mb-2">
                    <li>
                      <a class="facebook" href="#">
                        <i class="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a class="twitter" href="#">
                        <i class="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a class="instagram" href="#">
                        <i class="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a class="youtube" href="#">
                        <i class="fab fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="single-team-inner style-2 text-center">
              <div class="thumb">
                <img src="assets/img/team/3.webp" alt="img" />
              </div>
              <div class="details-wrap">
                <div class="details-inner">
                  <h4><a href="team-details.html">Karshin Kumar</a></h4>
                  <p>Founder</p>
                  <ul class="social-media mt-3 mb-2">
                    <li>
                      <a class="facebook" href="#">
                        <i class="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a class="twitter" href="#">
                        <i class="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a class="instagram" href="#">
                        <i class="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a class="youtube" href="#">
                        <i class="fab fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="single-team-inner style-2 text-center">
              <div class="thumb">
                <img src="assets/img/team/4.webp" alt="img" />
              </div>
              <div class="details-wrap">
                <div class="details-inner">
                  <h4><a href="team-details.html">Karshin Kumar</a></h4>
                  <p>Founder</p>
                  <ul class="social-media mt-3 mb-2">
                    <li>
                      <a class="facebook" href="#">
                        <i class="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a class="twitter" href="#">
                        <i class="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a class="instagram" href="#">
                        <i class="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a class="youtube" href="#">
                        <i class="fab fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </div>
      <FooterSekolah />
    </section>
  );
}

export default StrukturOrganisasi;
