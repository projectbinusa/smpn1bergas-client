import React, { useEffect, useState } from "react";
import NavbarSekolah from "../../../component/NavbarSekolah";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import FooterSekolah from "../../../component/FooterSekolah";
import { Pagination, Typography } from "@mui/material";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import Aos from "aos";

function MateriAjarView() {
  const [materi, setMateri] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/materi_ajar/all/terbaru?page=${page - 1
        }&size=${rowsPerPage}`
      );
      setMateri(response.data.data.content);
      console.log(response.data.data.content);
      setPaginationInfo({
        totalPages: response.data.data.totalPages,
        totalElements: response.data.data.totalElements,
      });
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
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

  const filteredList = materi.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imageStyle = {
    transform: `translateY(${scrollY * 0.5}px)`,
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  };

  const textOverlayStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "55px",
    fontWeight: "800",
    textAlign: "center",
    textTransform: "uppercase",
  };

  const formatDate = (value) => {
    const date = new Date(value);

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  const download = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main>
      <NavbarSekolah2 />
      <main className="container-berita container">
        <div className="header-berita" data-aos="fade-down">
          <ul>
            <li>
              <a href="/">
                <i class="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <i class="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>Materi Ajar</span>
            </li>
          </ul>
        </div>
        <div data-aos="fade-up">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              fontFamily: "'Poppins', sans-serif",
              textTransform: "uppercase",
            }}>
            Materi Ajar
          </Typography>
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
                  <th style={{ background: "#003366", color: "white" }}>
                    Tingkat
                  </th>
                  <th style={{ background: "#003366", color: "white" }}>
                    Mapel
                  </th>
                  <th style={{ background: "#003366", color: "white" }}>
                    Judul
                  </th>
                  <th style={{ background: "#003366", color: "white" }}>
                    Tgl Upload
                  </th>
                  <th style={{ background: "#003366", color: "white" }}>
                    Jenis
                  </th>
                  <th style={{ background: "#003366", color: "white" }}>
                    Penyusun
                  </th>
                  <th style={{ background: "#003366", color: "white" }}>
                    Download
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredList.length > 0 ? (
                  filteredList.map((item, index) => (
                    <tr key={item.id}>
                      <td style={{ paddingRight: "0" }} data-label="Tingkat">{item.tingkat}</td>
                      <td data-label="mapel">{item.mapel}</td>
                      <td data-label="judul">{item.judul}</td>
                      <td data-label="tgl upload">{formatDate(item.createdDate)}</td>
                      <td data-label="jenis">{item.jenis}</td>
                      <td data-label="penyusun">{item.penyusun}</td>
                      <td data-label="download" className="action">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <button
                            onClick={() => download(item.isi, item.judul)}
                            type="button"
                            className="btn-warning btn-sm text-light">
                            <i className="fas fa-info-circle"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
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
      </main>
      <FooterSekolah />
    </main>
  );
}

export default MateriAjarView;
