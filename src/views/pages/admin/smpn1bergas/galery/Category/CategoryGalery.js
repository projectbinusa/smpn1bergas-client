import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import { Pagination } from "@mui/material";
import Sidebar1 from "../../../../../../component/Sidebar1";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { useHistory, useParams } from "react-router-dom";



function CategoryGalery() {
  const history = useHistory();


  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({ totalPages: 1 });
  const [searchTerm, setSearchTerm] = useState("");
  const [kategori, setKategori] = useState("");
  const [sidebarToggled, setSidebarToggled] = useState(true);

  const toggleSidebar = () => setSidebarToggled(!sidebarToggled);

  const handleResize = () => {
    if (window.innerWidth < 800) setSidebarToggled(false);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAll = async () => {
    try {
      const res = await axios.get(
        `${API_DUMMY}/api/category_galery?page=${page - 1}&size=${rowsPerPage}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setList(res.data.data.content);
      setPaginationInfo({ totalPages: res.data.data.totalPages });
    } catch (err) {
      console.error("Gagal ambil data", err);
    }
  };

  const handleAdd = async () => {
    if (!kategori.trim()) {
      Swal.fire("Peringatan", "Kategori tidak boleh kosong!", "warning");
      return;
    }
    try {
      await axios.post(
        `${API_DUMMY}/api/category_galery`,
        { kategori },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      Swal.fire("Berhasil", "Kategori ditambahkan!", "success");
      setKategori("");
      getAll();
    } catch (err) {
      Swal.fire("Error", "Gagal menambahkan kategori!", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Hapus kategori?",
      text: "Data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_DUMMY}/api/category_galery/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          Swal.fire("Dihapus!", "Kategori berhasil dihapus.", "success");
          getAll();
        } catch (err) {
          Swal.fire("Error", "Gagal menghapus kategori!", "error");
        }
      }
    });
  };

  useEffect(() => {
    getAll();
  }, [page, rowsPerPage]);

  useEffect(() => {
    AOS.init();
  }, []);

  const filteredList = list.filter((item) =>
    item.kategori?.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="container box-table mt-3" data-aos="fade-left">
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header d-flex align-items-center justify-content-between">
  <h5 className="mb-0">Kategori Galery</h5>
  <div className="d-flex gap-2">
    <input
      type="search"
      className="form-control"
      placeholder="Cari kategori..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button
      onClick={() => history.push("/add-category-galery")}
      className="btn"
      style={{
        backgroundColor: "#2E2A47",
        color: "white",
        fontWeight: "500",
        borderRadius: "6px",
      }}
    >
      Tambah Data
    </button>
  </div>
</div>

            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Kategori</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1 + (page - 1) * rowsPerPage}</td>
                        <td>{item.kategori}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => history.push(`/edit-category-galery/${item.id}`)}
                            >
                            <i className="fa fa-edit"></i>
                            </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        Tidak ada data.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="card-footer d-flex justify-content-center">
              <Pagination
                count={paginationInfo.totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                showFirstButton
                showLastButton
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryGalery;
