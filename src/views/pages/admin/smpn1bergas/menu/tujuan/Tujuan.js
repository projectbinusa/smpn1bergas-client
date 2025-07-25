import React, { useState, useEffect } from "react";
import Sidebar1 from "../../../../../../component/Sidebar1";
import AOS from "aos";
import Swal from "sweetalert2";
import axios from "axios";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import { Pagination } from "@mui/material";

function Tujuan() {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });

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
    AOS.init();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAllTujuan = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/tujuan?page=${currentPage - 1}&size=${rowsPerPage}`,
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
    } catch (err) {
      console.error("Gagal mengambil data tujuan", err);
    }
  };

  const deleteData = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin ingin menghapus?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_DUMMY}/api/tujuan/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            Swal.fire("Berhasil!", "Data telah dihapus.", "success");
            getAllTujuan();
          })
          .catch((err) => {
            Swal.fire("Gagal!", "Gagal menghapus data.", "error");
            console.error(err);
          });
      }
    });
  };

  useEffect(() => {
    getAllTujuan();
  }, [currentPage, rowsPerPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredList = list.filter((item) =>
    item.tujuan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""}`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}
      >
        <i className="fas fa-bars"></i>
      </a>
      <Sidebar1 toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="container box-table mt-3 app-main__outer" data-aos="fade-left">
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
            <div className="card-header" style={{ display: "flex" }}>
              <p className="mt-3">Data Tujuan</p>
              <div className="d-flex ml-auto gap-3">
                <input
                  type="search"
                  className="form-control w-75 d-lg-block d-none"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="btn-actions-pane-right">
                  <a
                    href="/add-tujuan"
                    className="btn btn-primary p-2 rounded text-white text-decoration-none"
                  >
                    Tambah Data
                  </a>
                </div>
              </div>
            </div>
            <div className="table-responsive-3" style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-center">No</th>
                    <th className="text-center">Tujuan</th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((item, index) => (
                      <tr key={item.id}>
                        <td className="text-center">{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                        <td>{item.tujuan}</td>
                        <td className="text-center">
                          <a href={`/edit-tujuan/${item.id}`} className="btn btn-primary btn-sm mr-2">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </a>
                          <a
                            href={`/detail-tujuan/${item.id}`}
                            className="btn btn-warning btn-sm text-white mr-2"
                          >
                            <i className="fas fa-info-circle"></i>
                          </a>
                          <button onClick={() => deleteData(item.id)} className="btn btn-danger btn-sm">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        Tidak ada data tujuan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <Pagination
                count={paginationInfo.totalPages}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tujuan;
