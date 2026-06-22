import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import Sidebar1 from "../../../../../component/Sidebar1";
import { formatTanggal } from "../../../../../formatting/Formatting";

function Prestasi() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  const getAll = async (pageNumber = 1, size = rowsPerPage, search = "") => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/prestasi/admin/all?page=${pageNumber - 1}&size=${size}&sortBy=id&sortOrder=desc&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setList(response.data.data.content);
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
          .delete(`${API_DUMMY}/api/prestasi/` + id, {
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
            getAll(currentPage, rowsPerPage, searchTerm);
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
    getAll(currentPage, rowsPerPage, searchTerm);
  }, [currentPage, rowsPerPage, searchTerm]);

  useEffect(() => {
    AOS.init();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""}`}>
      <button
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48", border: "none" }}>
        <i className="fas fa-bars"></i>
      </button>
      <Sidebar1 toggleSidebar={toggleSidebar} />
      <main className="page-content1" style={{ marginTop: "20px" }}>
        <div className="container" data-aos="fade-left">

          {/* Mobile Controls */}
          <div
            className="d-lg-none"
            style={{
              padding: "12px 16px",
              background: "#fff",
              borderBottom: "1px solid #eee",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <select
                className="form-select"
                onChange={handleRowsPerPageChange}
                value={rowsPerPage}
                style={{ width: "80px", flexShrink: 0 }}>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <input
                type="search"
                className="form-control"
                placeholder="Cari prestasi..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="main-card box-tabel mb-3 card">
            {/* Card Header */}
            <div
              className="card-header"
              style={{
                background: "#FFF7F7",
                padding: "12px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <h6 style={{ margin: 0, fontWeight: "600" }}>Prestasi</h6>

                {/* Desktop Controls */}
                <div className="d-none d-lg-flex align-items-center gap-2">
                  <select
                    className="form-select form-select-sm"
                    onChange={handleRowsPerPageChange}
                    value={rowsPerPage}
                    style={{ width: "80px" }}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ width: "280px" }}
                  />
                </div>
              </div>

              <Link
                to="/add-prestasi"
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
                }}>
                <i className="fa-solid fa-plus"></i>
                Tambah Prestasi
              </Link>
            </div>

            {/* Table */}
            <div className="table-responsive-3" style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Prestasi</th>
                    <th>Nama Peserta</th>
                    <th>Tanggal</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {list.length > 0 ? (
                    list.map((berita, no) => (
                      <tr key={no}>
                        <td data-label="No">
                          {no + 1 + (currentPage - 1) * rowsPerPage}
                        </td>
                        <td data-label="Nama Prestasi">{berita.judul}</td>
                        <td data-label="Nama Peserta">{berita.nama_peserta}</td>
                        <td data-label="Tanggal">{formatTanggal(berita.tanggal)}</td>
                        <td data-label="Aksi" className="action">
                          <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                            {/* Edit */}
                            <Link
                              to={`/edit-prestasi/${berita.id}`}
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
                              title="Edit">
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>

                            {/* Detail */}
                            <Link
                              to={`/admin-detail-prestasi/${berita.id}`}
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
                              title="Detail">
                              <i className="fas fa-info-circle"></i>
                            </Link>

                            {/* Hapus */}
                            <button
                              onClick={() => deleteData(berita.id)}
                              type="button"
                              title="Hapus"
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
                              }}>
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center my-3">
                        <div style={{ padding: "10px", color: "#555" }}>
                          Tidak ada data yang tersedia.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="card-header mt-3 d-flex justify-content-center">
              <Pagination
                count={paginationInfo.totalPages}
                page={currentPage}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
                color="primary"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Prestasi;