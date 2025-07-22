import React, { useEffect, useState } from "react";
import NavbarSekolah from "../../../../component/NavbarSekolah";
import FooterSekolah from "../../../../component/FooterSekolah";
import HeaderBerita from "../HeaderBerita";
import CardBerita from "../CardBerita";
import "../../../../css/berita/news.css";
import { Pagination } from "@mui/material";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/base_URL";
import NavbarSekolah2 from "../../../../component/NavbarSekolah2";
import Aos from "aos";

const newsData = [
  {
    id: 1,
    title: "Local School Wins Award",
    content:
      "The local school has been recognized for its outstanding achievements in academics and sports.",
    image: "https://via.placeholder.com/300x200?text=Award",
    category: "Berita Sekolah",
    date: "2024-08-10",
  },
  {
    id: 2,
    title: "Community Garden Project Launched",
    content:
      "A new community garden has been established to promote local agriculture and sustainability.",
    image: "https://via.placeholder.com/300x200?text=Garden",
    category: "Info Sekolah",
    date: "2024-08-12",
  },
  {
    id: 3,
    title: "New Library Opens Downtown",
    content:
      "The new library offers a wide range of books and community programs for all ages.",
    image: "https://via.placeholder.com/300x200?text=Library",
    category: "Berita Sekolah",
    date: "2024-08-14",
  },
  {
    id: 4,
    title: "Tech Startup Announces Innovative App",
    content:
      "A local tech startup has announced the release of a new app designed to improve productivity.",
    image: "https://via.placeholder.com/300x200?text=Tech",
    category: "Agenda",
    date: "2024-08-16",
  },
  {
    id: 5,
    title: "Annual Art Fair Returns This Weekend",
    content:
      "The annual art fair will showcase works from local artists and provide interactive workshops.",
    image: "https://via.placeholder.com/300x200?text=Art",
    category: "Berita Sekolah",
    date: "2024-08-18",
  },
  {
    id: 6,
    title: "City Marathon a Huge Success",
    content:
      "The city marathon attracted thousands of participants and raised funds for charity.",
    image: "https://via.placeholder.com/300x200?text=Marathon",
    category: "Agenda",
    date: "2024-08-20",
  },
  {
    id: 7,
    title: "New Health Clinic Opens in Town",
    content:
      "A new health clinic has opened to provide essential medical services to the community.",
    image: "https://via.placeholder.com/300x200?text=Health",
    category: "Info Sekolah",
    date: "2024-08-22",
  },
  {
    id: 8,
    title: "School Science Fair Winners Announced",
    content:
      "Students from various schools presented innovative science projects and won awards.",
    image: "https://via.placeholder.com/300x200?text=Science",
    category: "Berita Sekolah",
    date: "2024-08-24",
  },
  {
    id: 9,
    title: "Local Theatre Group Performs Shakespeare",
    content:
      "The local theatre group is performing Shakespeare’s plays this weekend.",
    image: "https://via.placeholder.com/300x200?text=Theatre",
    category: "Info Sekolah",
    date: "2024-08-26",
  },
  {
    id: 10,
    title: "New Restaurant Opens Downtown",
    content:
      "A new restaurant specializing in international cuisine has opened its doors.",
    image: "https://via.placeholder.com/300x200?text=Restaurant",
    category: "Agenda",
    date: "2024-08-28",
  },
];

const Info = () => {
  // const totalPages = Math.ceil(newsData.length / 5);

  // const currentData = newsData.slice(
  //     (currentPage - 1) * 5,
  //     currentPage * 5
  // );
  // const handlePageChange = (event, pageNumber) => setCurrentPage(pageNumber);

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    getAllInfo(pageNumber);
  };

  // GET ALL INFO
  const [info, setInfo] = useState([]);
  const [totalPages, setTotalPage] = useState(1);

  const getAllInfo = async (page = 1) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/berita/by-category?category=Info%20Sekolah&order=desc&page=${
          page - 1
        }&size=5&sort=created_date`
      );
      setInfo(response.data.data.content);
      setTotalPage(response.data.data.totalPages);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllInfo(currentPage);
    Aos.init();
  }, [currentPage]);

  return (
    <section>
      <NavbarSekolah2 />
      <main className="container-berita container">
        <HeaderBerita title={"Info Sekolah"} />
        <div className="container-apbd">
          <div data-aos="fade-right">
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
                  <a href="/news">Berita Terbaru</a>
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
                  <a href="/info">Info Sekolah</a>
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
                  <a href="/agenda">Agenda</a>
                </li>
              </ul>
            </div>
            <br />
            <div>
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
            </div>
          </div>
          <div className="container-all" data-aos="fade-left">
            {/* {currentData.map(newsItem => (
                            <CardBerita
                                key={newsItem.id}
                                image={newsItem.image}
                                id={newsItem.id}
                                title={newsItem.title}
                                link={"info"}
                                content={newsItem.content}
                            />
                        ))} */}
            {info.map((newsItem) => (
              <CardBerita
                key={newsItem.id}
                image={newsItem.image}
                id={newsItem.id}
                title={newsItem.judulBerita}
                link={"info"}
                content={newsItem.isiBerita}
              />
            ))}
            <div className="d-flex justify-content-center align-items-center mt-3">
              {/* <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                shape="rounded"
                                style={{ marginBottom: "30px" }}
                                showFirstButton
                                showLastButton
                            /> */}
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                style={{ marginBottom: "30px" }}
                showFirstButton
                showLastButton
              />
            </div>
          </div>
        </div>
      </main>
      <FooterSekolah />
    </section>
  );
};

export default Info;
