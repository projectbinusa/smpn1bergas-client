import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../utils/base_URL";

import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import {
  IconButton,
  InputAdornment,
  Pagination,
  TextField,
} from "@mui/material";
import FotoKegiatan from "./fotoKegiatan/FotoKegiatan";
import Sidebar1 from "../../../../../component/Sidebar1";
import kegiatan from "../../../../../aset/smpn1bergas/kegiatan.png";

function Kegiatan() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarToggled, setSidebarToggled] = useState(true);

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  const handleResize = () => {
    if (window.innerWidth < 800) {
      setSidebarToggled(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/kegiatan/admin/all?page=${page - 1
        }&size=${rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setList(response.data.data.content);
      console.log(response.data.data.content);
      setPaginationInfo({
        totalPages: response.data.data.totalPages,
        totalElements: response.data.data.totalElements,
      });
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  const deleteData = async (id) => {
    Swal.fire({
      title: "Apakah Anda Ingin Menghapus?",
      text: "Perubahan data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_DUMMY}/api/kegiatan/` + id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Dihapus!",
              showConfirmButton: false,
              timer: 1500,
            });
            getAll();
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Hapus Data Gagal!",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(err);
          });
      }
    });
  };

  useEffect(() => {
    getAll(currentPage);
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
    setCurrentPage(1);
  };

  const filteredList = list.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

  return (
    <div
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
        }`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}>
        <i className="fas fa-bars"></i>
      </a>
      <Sidebar1 toggleSidebar={toggleSidebar} />
      <main className="page-content1" style={{ marginTop: "20px" }}>
        <div className="container" data-aos="fade-left">
          <div
            className="d-lg-none"
            style={{
              padding: "12px 16px",
              background: "#fff",
              borderBottom: "1px solid #eee",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <select
                className="form-select"
                onChange={handleRowsPerPageChange}
                value={rowsPerPage}
                style={{
                  width: "80px",
                  flexShrink: 0,
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>

              <input
                type="search"
                className="form-control"
                placeholder="Cari kegiatan..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="main-card box-tabel mb-3 card">
            <div
              className="card-header"
              style={{
                background: "#FFF7F7",
                padding: "12px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <h6
                  style={{
                    margin: 0,
                    fontWeight: "600",
                  }}
                >
                  Kegiatan
                </h6>

                <div className="d-none d-lg-flex align-items-center gap-2">
                  <select
                    className="form-select form-select-sm"
                    onChange={handleRowsPerPageChange}
                    value={rowsPerPage}
                    style={{ width: "80px" }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>

                  <input
                    type="search"
                    className="form-control"
                    placeholder="Cari kegiatan..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ width: "280px" }}
                  />
                </div>
              </div>

              <Link
                to="/add-kegiatan"
                style={{
                  background: "#0d6efd",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                <i className="fa-solid fa-plus"></i>
                Tambah Kegiatan
              </Link>
            </div>
            <div
              className="table-responsive-3"
              style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table className="align-middle mb-0 table table-hover">
                <thead>
                  <tr>
                    <th scope="col">
                      No
                    </th>
                    <th>Kegiatan</th>
                    <th
                      scope="col"
                      style={{ minWidth: "150px" }}>
                      Penulis Kegiatan
                    </th>
                    <th>Gambar</th>
                    <th>Tanggal Dibuat</th>
                    <th>Tanggal Update</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ?
                    filteredList.map((berita, no) => {
                      return (
                        <tr key={no}>
                          <td data-label="No" className="">
                            {no + 1 + (currentPage - 1) * rowsPerPage}
                          </td>
                          <td data-label="Kegiatan">
                            {berita.judul}
                          </td>
                          <td data-label="Penulis Kegiatan">
                            {berita.penulis}
                          </td>
                          <td data-label="Image" className="">
                            <img
                              src={berita.foto ? berita.foto : kegiatan}
                              alt={berita.judul}
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                display: "block",
                                margin: "0 auto",
                              }}
                            />
                          </td>
                          <td data-label="Tanggal Dibuat">
                            {berita.createdDate}
                          </td>
                          <td data-label="Tanggal Update">
                            {berita.updatedDate}
                          </td>
                          <td data-label="Aksi" className="action">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "8px",
                              }}
                            >
                              <Link
                                to={`/edit-kegiatan/${berita.id}`}
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "#0d6efd",
                                  color: "#fff",
                                  borderRadius: "8px",
                                  textDecoration: "none",
                                }}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </Link>

                              <Link
                                to={`/admin-detail-kegiatan/${berita.id}`}
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "#f59e0b",
                                  color: "#fff",
                                  borderRadius: "8px",
                                  textDecoration: "none",
                                }}
                              >
                                <i className="fas fa-info-circle"></i>
                              </Link>

                              <button
                                onClick={() => deleteData(berita.id)}
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "#dc3545",
                                  color: "#fff",
                                  borderRadius: "8px",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }) : <tr>
                      <td colSpan="7" className="text-center my-3">
                        <div style={{ padding: "10px", color: "#555" }}>
                          Tidak ada data yang tersedia.
                        </div>
                      </td>
                    </tr>}
                </tbody>
              </table>
            </div>
            <div className="card-header mt-3 d-flex justify-content-center">
              <Pagination
                count={paginationInfo.totalPages}
                page={currentPage}
                onChange={(event, value) => {
                  setCurrentPage(value);
                  setPage(value);
                }}
                showFirstButton
                showLastButton
                color="primary"
              />
            </div>
          </div>
          <FotoKegiatan></FotoKegiatan>
        </div>
      </main>
    </div >
  );
}

export default Kegiatan;
