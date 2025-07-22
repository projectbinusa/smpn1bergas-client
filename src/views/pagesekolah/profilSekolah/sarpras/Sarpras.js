import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../../component/FooterSekolah";
import "../../../../css/alumni/sapras.css";
import NavbarSekolah2 from "../../../../component/NavbarSekolah2";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/base_URL";
import { Pagination } from "@mui/material";
import KategoriSapras from "./KategoriSapras";
import Aos from "aos";

function Sarpras() {
  const [nama, setNamaSarana] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [id, setId] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    getAllSaprasFoto(pageNumber);
  };

  const [fotos, setFoto] = useState([]);
  const [totalPages, setTotalPage] = useState(1);

  const getAllSapras = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/sarana/all/category?category=Standar&page=0&size=1`
      );
      setNamaSarana(response.data.data.content[0].nama_sarana);
      setDeskripsi(response.data.data.content[0].deskripsi);
      setId(response.data.data.content[0].id);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllSapras();
    Aos.init();
    getAllSaprasFoto();
  }, []);

  const getAllSaprasFoto = async (page = 1) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/foto_sarana/all/by_id_sarana?id_sarana=${id}&page=${
          page - 1
        }&size=5`
      );
      setFoto(response.data.data.content);
      setTotalPage(response.data.data.totalPages);
    } catch (error) {
      console.log("get all", error);
    }
  };

  return (
    <section>
      <NavbarSekolah2 />
      <main className="container-sapras container">
        <div className="header-sapras" data-aos="fade-down">
          <ul>
            <li>
              <a href="/">
                <i class="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <a href="/">
                <i class="fas fa-angle-right"></i> Sarana Prasarana{" "}
              </a>
            </li>
            <li>
              <i class="fas fa-angle-right"></i> Standar{" "}
            </li>
          </ul>
        </div>
        <div className="container-sapras2">
          <KategoriSapras />
          <div className="container-all" data-aos="fade-left">
            <div style={{ textAlign: "center" }}>
              <h4 style={{ textTransform: "uppercase" }}>{nama}</h4>
              <p>{deskripsi}</p>
            </div>
            <div style={{ textAlign: "center" }}>
              {fotos.length > 0 ? (
                fotos.map((foto) => (
                  <img
                    src={foto.foto}
                    style={{
                      height: "400px",
                      width: "100%",
                      marginTop: "1.5rem",
                    }}
                  />
                ))
              ) : (
                <></>
              )}
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
            </div>
          </div>
        </div>
      </main>
      <FooterSekolah />
    </section>
  );
}

export default Sarpras;
