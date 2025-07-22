import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../../component/FooterSekolah";
import axios from "axios";
import "../../../../css/ekstrakulikuler/ekstra.css";
import { API_DUMMY } from "../../../../utils/base_URL";
import NavbarSekolah2 from "../../../../component/NavbarSekolah2";
import ekskul from "../../../../aset/smpn1bergas/ekstrakurikuler.png";
import { Pagination } from "@mui/material";
import Aos from "aos";

function Ekstrakurikuler() {
  const [ekstrakulikuler, setEkstrakulikuler] = useState([]);
  const [totalPages, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    getAllEkstrakurikuler(pageNumber);
  };

  const getAllEkstrakurikuler = async (page = 1) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/ekstrakulikuler/all/terbaru?page=${
          page - 1
        }&size=12`
      );
      setEkstrakulikuler(response.data.data.content);
      setTotalPage(response.data.data.totalPages);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllEkstrakurikuler(currentPage);
    Aos.init();
  }, [currentPage]);

  return (
    <div>
      <NavbarSekolah2 />
      <main className="container-berita container">
        <div className="header-berita" data-aos="fade-down">
          <ul>
            <li>
              <a href="/">
                <i className="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <i className="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>Ekstrakurikuler</span>
            </li>
          </ul>
        </div>
        <div className="row" data-aos="fade-up">
          {ekstrakulikuler.map((item) => (
            <div className="col-lg-4 col-md-6" key={item.id}>
              <div className="single-team-inner style-4 text-center">
                <div className="thumb">
                  <img src={item.foto ? item.foto : ekskul} alt={item.name} className="team-image" />
                </div>
                <div className="details-wrap">
                  <div className="details-inner">
                    <h4 className="team-name">
                      <p>{item.name}</p>
                    </h4>
                  </div>
                </div>
                <div className="hover-details-wrap">
                  <div className="hover-details-inner">
                    <h4 className="team-name-hover">
                      <p>{item.name}</p>
                    </h4>
                    <p className="team-description">{item.deskripsi}</p>
                    <p className="team-coordinator">
                      <strong>Koordinator:</strong> {item.koordinator}
                    </p>
                    <p className="team-schedule">
                      <strong>Jadwal:</strong> {item.jadwal}
                    </p>
                    <p className="team-location">
                      <strong>Tempat:</strong> {item.tempat}
                    </p>
                    <p className="team-achievements">
                      <strong>Prestasi:</strong> {item.prestasi}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center align-items-center mt-3">
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
      </main>
      <FooterSekolah />
    </div>
  );
}

export default Ekstrakurikuler;
