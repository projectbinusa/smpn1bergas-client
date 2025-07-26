import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../component/FooterSekolah";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import NavbarSekolah2 from '../../../component/NavbarSekolah2';
import { Pagination } from "@mui/material";
import '../../../css/prestasi/prestasiCard.css';

function LaporanBosp() {
  const [laporan, setLaporan] = useState([]);
  const [banner, setBanner] = useState("");
  const [totalPages, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    getAllLaporan(pageNumber);
  };

  const getAllLaporan = async (page = 1) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/laporanbosp/all?page=${page - 1}&size=18`
      );
      console.log(response);      
      setLaporan(response.data.data.content);
      setTotalPage(response.data.data.totalPages);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllLaporan(currentPage);
  }, [currentPage]);

  return (
    <div>
      <NavbarSekolah2 />
      <main className="container-berita container">
        <div className="header-berita">
          <ul>
            <li><a href="/"><i className="fas fa-home"></i> Beranda</a></li>
            <li><i className="fas fa-angle-right"></i><span style={{ fontWeight: "normal" }}> Laporan BOSP</span></li>
          </ul>
        </div>
        <div className="">
        {laporan.length > 0 ? (
          <div className="container-grid">
            {laporan.map((item) => (
              <div className="card item" key={item.id}>
                <div className="single-project-inner style-two">
                  <div className="thumb">
                    {item.files?.length > 0 ? (
                      <img src={item.files[0]} alt="img" />
                    ) : (
                      <img src="https://lh5.googleusercontent.com/p/AF1QipPiTYMPukmrWn57NP0O_90hGlAwYH1dxd-Tv39r=w2048-h2048-k-no" alt="img" />
                    )}
                  </div>
                  <div className="details-wrap">
                    <h3>{item.nama}</h3>
                    <a href={`/laporanbosp/${item.id}`}>
                      SELENGKAPNYA <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#666', marginTop: '20px' }}>
            Laporan BOSP Tidak Tersedia.
          </p>
        )}
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
        </div>
      </main>
      <FooterSekolah />
    </div>
  );
}

export default LaporanBosp;
