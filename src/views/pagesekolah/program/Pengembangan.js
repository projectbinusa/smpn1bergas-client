import React, { useEffect, useState } from "react";
import "../../../css/alumni/sapras.css";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import FooterSekolah from "../../../component/FooterSekolah";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import { Pagination } from "@mui/material";
import Aos from "aos";

function Pengembangan() {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [id_category, setIdCategory] = useState("");
  const [category, setCategory] = useState("");
  const [datas, setDatas] = useState([]);
  const [categoryProgram, setCategoryProgram] = useState([]);

  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/category_program/all/terbaru?page=${page - 1
        }&size=${rowsPerPage}`
      );
      setCategoryProgram(response.data.data.content);
      setPaginationInfo({
        totalPages: response.data.data.totalPages,
        totalElements: response.data.data.totalElements,
      });
    } catch (error) {
      console.log("get all", error);
    }
  };

  const getAll = async () => {
    if (!id_category) return; // Ensure a category is selected before fetching data
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/program/all/category?id_category=${id_category}&page=${page - 1
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

  const getByIdCategory = (id) => {
    axios
      .get(`${API_DUMMY}/api/category_program/get/` + id)
      .then((ress) => {
        const response = ress.data.data;
        setCategory(response.category);
        console.log("category : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setIdCategory(id);
  };

  useEffect(() => {
    getAllCategory();
    Aos.init();
  }, []);

  useEffect(() => {
    getAll();
  }, [id_category, page, rowsPerPage]);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
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
                <i className="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <a href="/">
                <i className="fas fa-angle-right"></i> Program
              </a>
            </li>
            <li>
              <i className="fas fa-angle-right"></i>
              {category ? ` ${category}` : " Kategori"}
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
                {categoryProgram.map((data, index) => (
                  <li key={index}>
                    <button
                      onClick={() => getByIdCategory(data.id)}
                      style={{ border: "none", background: "none", fontWeight: 600 }}>
                      {data.category}
                    </button>
                    <hr
                      style={{
                        width: "100%",
                        border: "0",
                        borderTop: "2px dotted #002147",
                        color: "#002147",
                      }}
                    />
                  </li>
                ))}
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
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/osisspensagas"
                    target="_blank">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                    target="_blank">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="container-all" data-aos="fade-left">
            <div style={{ textAlign: "center" }}>
              {category ? (
                <>
                  <h4 style={{ textTransform: "uppercase" }}>{category}</h4>
                  <p>Program unggulan {category} sekolah antara lain sbb : </p>
                </>
              ) : (
                <>
                  <h4 style={{ textTransform: "uppercase" }}>PROGRAM</h4>
                  <p>Program unggulan {category} sekolah antara lain sbb : </p>
                </>
              )}
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
                        textAlign: "center",
                        color: "white",
                        width: "5%",
                      }}>
                      No
                    </th>
                    <th
                      style={{
                        background: "#003366",
                        textAlign: "center",
                        color: "white",
                      }}>
                      Nama Program
                    </th>
                    <th
                      style={{
                        background: "#003366",
                        textAlign: "center",
                        color: "white",
                      }}>
                      Tujuan
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
                        <td style={{ textAlign: "center" }}>
                          {item.namaProgram}
                        </td>
                        <td style={{ textAlign: "center" }}>
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
                variant="outlined"
                shape="rounded"
                size="large"
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

export default Pengembangan;
