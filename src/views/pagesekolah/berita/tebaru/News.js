import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../../component/FooterSekolah";
import HeaderBerita from "../HeaderBerita";
import CardBerita from "../CardBerita";
import "../../../../css/berita/news.css";
import { Pagination } from "@mui/material";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/base_URL";
import NavbarSekolah2 from "../../../../component/NavbarSekolah2";
import Aos from "aos";
import { Link } from "react-router-dom";

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    getAllBerita(pageNumber);
  };

  // GET ALL BERITA
  const [berita, setBerita] = useState([]);
  const [totalPages, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBerita = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${API_DUMMY}/api/berita/by-category?category=Berita%20Sekolah&order=desc&page=${page - 1
        }&size=5&sort=created_date`
      );
      setBerita(response.data.data.content);
      setTotalPage(response.data.data.totalPages);
    } catch (error) {
      console.log("get all", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBerita(currentPage);
    Aos.init({ duration: 800 });
  }, [currentPage]);

  return (
    <section className="news-page">
      <NavbarSekolah2 />
      <main className="container-berita container">
        <HeaderBerita title={"Berita Terbaru"} />

        <div className="container-apbd">
          {/* Sidebar */}
          <div className="news-sidebar">
            <div className="sidebar-card" data-aos="fade-down">
              <div>
                <h5 style={{ fontWeight: "600", color: "#002147" }}>KATEGORI</h5>
                <hr
                  style={{
                    width: "30%",
                    color: "#0060ff",
                    border: "2px solid #0060ff",
                  }}
                />
                <ul className="category-berita">
                  <li>
                    <Link to="/news">Berita Terbaru</Link>
                  </li>
                  <hr
                    style={{
                      width: "100%",
                      border: "0",
                      borderTop: "2px dotted #002147",
                      color: "#002147",
                    }}
                  />
                  <li>
                    <Link to="/info">Info Sekolah</Link>
                  </li>
                  <hr
                    style={{
                      width: "100%",
                      border: "0",
                      borderTop: "2px dotted #002147",
                      color: "#002147",
                    }}
                  />
                  <li>
                    <Link to="/agenda">Agenda</Link>
                  </li>
                </ul>
              </div>

            </div>

            {/* <div>
              <h5 style={{ fontWeight: "600", color: "#002147" }}>
                IKUTI KAMI
              </h5>
              <hr
                style={{
                  width: "30%",
                  color: "#0060ff",
                  border: "2px solid #0060ff",
                }}
              />
              <ul className="medsos-list">
                <li>
                  <a
                    href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295"
                    target="_blank">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/osisspensagas"
                    target="_blank">
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                    target="_blank">
                    <i class="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div> */}
          </div>

          {/* Main Content */}
          <div className="container-all" data-aos="fade-left">
            {isLoading ? (
              <div className="loading-container">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Memuat berita...</p>
              </div>
            ) : berita.length > 0 ? (
              <>
                {berita.map((newsItem) => (
                  <CardBerita
                    key={newsItem.id}
                    image={newsItem.image}
                    id={newsItem.id}
                    title={newsItem.judulBerita}
                    link={"news"}
                    date={newsItem.createdDate}
                  />
                ))}

                <div className="pagination-container">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                  />
                </div>
              </>
            ) : (
              <div className="no-news">
                <img src="/images/no-data.svg" alt="No news" />
                <h5>Tidak ada berita tersedia</h5>
              </div>
            )}
          </div>
        </div>
      </main>
      <FooterSekolah />
    </section>
  );
};

export default News;