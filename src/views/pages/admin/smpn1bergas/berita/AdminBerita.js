import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../utils/base_URL";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import news from "../../../../../aset/smpn1bergas/News-rafiki.png";

import { Pagination } from "@mui/material";
import Sidebar1 from "../../../../../component/Sidebar1";

function AdminBerita() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const getAll = async (page) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/berita/all?page=${page - 1
        }&size=${rowsPerPage}&sortBy=id&sortOrder=desc`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setList(response.data.data.content);
      console.log("list berita : ", response.data.data.content);
      setPaginationInfo({
        totalPages: response.data.data.totalPages,
        totalElements: response.data.data.totalElements,
      });
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
      if (error.status === 401) {
        localStorage.clear();
        history.push("/login");
      }
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
          .delete(`${API_DUMMY}/api/berita/delete/` + id, {
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
            history.push("/admin-berita");
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
    setCurrentPage(1);
  };

  const filteredList = list.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  console.log(filteredList);

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

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
          <div className="ml-2 row g-3 align-items-center d-lg-none d-md-flex rows-rspnv">
            <div className="col-auto">
              <label className="form-label mt-2">Rows per page:</label>
            </div>
            <div className="col-auto">
              <select
                className="form-select form-select-xl w-auto"
                onChange={handleRowsPerPageChange}
                value={rowsPerPage}>
                <option value={1}>1</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          <div className="search">
            <input
              type="search"
              className="form-control widget-content-right w-100 mt-2 mb-2 d-lg-none d-md-block"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="main-card box-tabel mb-3 card">
            <div
              className="card-header"
              style={{ display: "flex", background: "#FFF7F7" }}>
              <p className="mt-3">Berita</p>
              <div className="ml-2 row g-3 align-items-center d-lg-flex d-none d-md-none">
                <div className="col-auto">
                  <label className="form-label mt-2">Rows per page:</label>
                </div>
                <div className="col-auto">
                  <select
                    className="form-select form-select-sm"
                    onChange={handleRowsPerPageChange}
                    value={rowsPerPage}>
                    <option value={1}>1</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
              </div>
              <div className="d-flex ml-auto gap-3">
                <input
                  type="search"
                  className="form-control widget-content-right w-75 d-lg-block d-none d-md-none"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="btn-actions-pane-right">
                  <div role="group" className="btn-group-sm btn-group">
                    <button className="active btn-focus p-2 rounded">
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="/add-berita-admin">
                        Tambah Berita
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="table-responsive-3"
              style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th>
                      No
                    </th>
                    <th>Judul Berita</th>
                    <th
                      scope="col" style={{ minWidth: "150px" }}>
                      Penulis Berita
                    </th>
                    <th>Image</th>
                    <th>Kategori Berita</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ?
                    filteredList.map((berita, no) => {
                      return (
                        <tr key={no}  >
                          <td data-label="No" className="">
                            {no + 1 + (currentPage - 1) * rowsPerPage}
                          </td>
                          <td data-label="Judul Berita">
                            {berita.judulBerita}
                          </td>
                          <td data-label="Penulis Berita">
                            {berita.author}
                          </td>
                          <td data-label="Image" style={{ textAlign: "right" }}>
                            <img
                              src={berita.image ? berita.image : news}
                              style={{
                                height: "4.5rem",
                                width: "4.5rem",
                              }}
                            />
                          </td>
                          <td data-label="Kategori Berita">
                            {berita.categoryBerita}
                          </td>
                          <td data-label="Aksi" className="action">
                            <div className="d-flex justify-content-center align-items-center">
                              <button
                                type="button"
                                className="btn-primary btn-sm mr-2"
                                style={{ height: '100%' }}>
                                <a
                                  style={{
                                    color: "white",
                                    textDecoration: "none",
                                  }}
                                  href={`/edit-berita-admin/${berita.id}`}>
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </a>
                              </button>
                              <button
                                type="button"
                                className="btn-warning mr-2 btn-sm">
                                <a
                                  className="text-light"
                                  href={"/detail/berita/" + berita.id}>
                                  <i className="fas fa-info-circle"></i>
                                </a>
                              </button>
                              <button
                                onClick={() => deleteData(berita.id)}
                                type="button"
                                className="btn-danger btn-sm">
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }) :
                    <tr>
                      <td colSpan="6" className="text-center my-3">
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
        </div>
      </main>
    </div>
  );
}

export default AdminBerita;
