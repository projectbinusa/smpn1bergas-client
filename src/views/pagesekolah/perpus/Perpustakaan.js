import React, { useEffect, useState } from "react";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import HeaderPerpus from "./HeaderPerpus";
import "../../../css/perpustakaan/perpustakaan.css";
import CardPerpustakaan from "./CardPerpustakaan";
import FooterSekolah from "../../../component/FooterSekolah";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import { Pagination } from "@mui/material";
import Aos from "aos";

function Perpustakaan() {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    getAllPerpus(pageNumber);
  };

  // GET ALL PERPUSTAKAAN
  const [bukus, setBuku] = useState([]);
  const [totalPages, setTotalPage] = useState(1);

  const getAllPerpus = async (page = 1) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/perpustakaan/all/terbaru?page=${
          page - 1
        }&size=18`
      );
      setBuku(response.data.data.content);
      setTotalPage(response.data.data.totalPages);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllPerpus(currentPage);
    Aos.init();
  }, [currentPage]);

  return (
    <>
      <NavbarSekolah2 />
      <main className="perpustakaan-container container">
        <HeaderPerpus />
        <div data-aos="fade-up">
        {bukus.length > 0 ? (
          <main className="perpus-container">
            {bukus.map((item) => (
              <CardPerpustakaan
                key={item.id}
                image={item.foto}
                id={item.id}
                title={item.nama_buku}
                content={item.sinopsis}
                pengarang={item.pengarang}
                tahun={item.tahun}
              />
            ))}
          </main>
        ) : (
          <p style={{ textAlign: "center", fontSize: "1.2em", color: "#666" }}>
            Buku Tidak Tersedia.
          </p>
        )}
        <div className="d-flex justify-content-center align-items-center mt-5">
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
      </main>
      <FooterSekolah />
    </>
  );
}

export default Perpustakaan;
