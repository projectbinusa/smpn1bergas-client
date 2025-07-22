import React, { useEffect, useState } from "react";
import "../../../css/alumni/sapras.css";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import FooterSekolah from "../../../component/FooterSekolah";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import { Pagination } from "@mui/material";
import Aos from "aos";

function PerawatanRutin() {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const [datas, setDatas] = useState([]);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/program/get/judul?judul_program=Perawatan%20Rutin&page=${
          page - 1
        }&size=${rowsPerPage}`
      );
      setDatas(response.data.data.content);
      setPaginationInfo({
        totalPages: response.data.data.totalPages,
        totalElements: response.data.data.totalElements,
      });
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
    Aos.init();
  }, []);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
    setCurrentPage(1);
  };

  const filteredList = datas.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <main>
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
                <i class="fas fa-angle-right"></i> Program{" "}
              </a>
            </li>
            <li>
              <i class="fas fa-angle-right"></i> Perawatan Rutin{" "}
            </li>
          </ul>
        </div>
        <div className="container-sapras2">
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
                  <a href="/program">Pengembangan</a>
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
                  <a href="/perawatan-rutin">Perawatan Rutin</a>
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
                  <a href="/sewa-layanan">Sewa Layanan</a>
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
            <div style={{ textAlign: "center" }}>
              <h4 style={{ textTransform: "uppercase" }}>Perawatan Rutin</h4>
              <p>
                Data pemeliharaan / perawatan rutin sarana dan prasarana sekolah
                pendukung pembelajara :{" "}
              </p>
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
              <input
                type="search"
                className="form-control mb-3 mb-md-0"
                placeholder="Pencarian..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ flex: "1" }}
              />
              <select
                className="form-select ms-0 ms-md-3"
                style={{ width: "120px" }}
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="table-responsive">
              <table className="table" style={{ width: "100%" }}>
                <thead style={{ background: "#003366", color: "white" }}>
                  <tr>
                    <th
                      style={{
                        background: "#003366",
                        color: "white",
                        width: "5%",
                      }}>
                      No
                    </th>
                    <th style={{ background: "#003366", color: "white" }}>
                      Nama Perawatan
                    </th>
                    <th style={{ background: "#003366", color: "white" }}>
                      Tujuan{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((item, index) => (
                      <tr key={item.id}>
                        <td style={{ paddingRight: "0" }}>
                          {index + 1 + (currentPage - 1) * rowsPerPage}
                        </td>
                        <td>{item.namaProgram}</td>
                        <td>
                          {" "}
                          <div
                            dangerouslySetInnerHTML={{ __html: item.tujuan }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        Tidak Ada Data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-center align-items-center mt-3 mb-5">
              <Pagination
                count={paginationInfo.totalPages}
                page={currentPage}
                onChange={(event, value) => {
                  setCurrentPage(value);
                  setPage(value);
                }}
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
    </main>
  );
}

export default PerawatanRutin;
