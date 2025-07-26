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
        `${API_DUMMY}/api/berita/by-category?category=Berita%20Sekolah&order=desc&page=${
          page - 1
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
              <h5 className="sidebar-title">KATEGORI</h5>
              <div className="title-underline"></div>
              <ul className="category-berita">
                <li className="active-category">
                  <a href="/news">
                    <i className="fas fa-newspaper fa-fw"></i> Berita Terbaru
                  </a>
                </li>
                <li>
                  <a href="/info">
                    <i className="fas fa-info-circle fa-fw"></i> Info Sekolah
                  </a>
                </li>
                <li>
                  <a href="/agenda">
                    <i className="fas fa-calendar-alt fa-fw"></i> Agenda
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="sidebar-card" data-aos="fade-right">
              <h5 className="sidebar-title">IKUTI KAMI</h5>
              <div className="title-underline"></div>
              <div className="medsos-container">
                <a
                  href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="medsos-icon"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/osisspensagas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="medsos-icon"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="medsos-icon"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            
            <div className="sidebar-card" data-aos="fade-up">
              <h5 className="sidebar-title">BERITA TERPOPULER</h5>
              <div className="title-underline"></div>
              <div className="popular-news">
                {berita.slice(0, 3).map((item) => (
                  <div key={`popular-${item.id}`} className="popular-item">
                    <a href={`/news/${item.id}`} className="popular-title">
                      {item.judulBerita}
                    </a>
                  </div>
                ))}
              </div>
            </div>
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
            ) : (
              <>
                {berita.length > 0 ? (
                  berita.map((newsItem) => (
                    <CardBerita
                      key={newsItem.id}
                      image={newsItem.image}
                      id={newsItem.id}
                      title={newsItem.judulBerita}
                      link={"news"}
                      content={newsItem.isiBerita}
                      date={newsItem.createdDate}
                    />
                  ))
                ) : (
                  <div className="no-news">
                    <img src="/images/no-data.svg" alt="No news" />
                    <h5>Tidak ada berita tersedia</h5>
                  </div>
                )}
                
                {totalPages > 1 && (
                  <div className="pagination-container">
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      variant="outlined"
                      shape="rounded"
                      showFirstButton
                      showLastButton
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <FooterSekolah />
    </section>
  );
};

export default News;