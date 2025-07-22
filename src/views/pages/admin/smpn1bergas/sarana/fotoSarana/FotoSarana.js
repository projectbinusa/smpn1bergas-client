import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";

import {
  Pagination,
} from "@mui/material";

function FotoSarana() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const getAll = async (page) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/foto_sarana/all/terbaru?page=${page - 1
        }&size=${rowsPerPage}&sortBy=id&sortOrder=desc`,
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
          .delete(`${API_DUMMY}/api/foto_sarana/` + id, {
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

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }).catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Hapus Data Gagal!",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(err)
          })
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
    setPage(0);
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
    <>
      <div className="ml-2 row g-3 align-items-center d-lg-none d-md-flex rows-rspnv">
        <div className="col-auto">
          <label className="form-label mt-2">Rows per page:</label>
        </div>
        <div className="col-auto">
          <select
            className="form-select form-select-xl w-auto"
            onChange={handleRowsPerPageChange}
            value={rowsPerPage}>
            <option value={5}>5</option>
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
        <div className="card-header" style={{ display: "flex" }}>
          <p className="mt-3">Foto Sarana</p>
          <div className="ml-2 row g-3 align-items-center d-lg-flex d-none d-md-none">
            <div className="col-auto">
              <label className="form-label mt-2">Rows per page:</label>
            </div>
            <div className="col-auto">
              <select
                className="form-select form-select-sm"
                onChange={handleRowsPerPageChange}
                value={rowsPerPage}>
                <option value={5}>5</option>
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
                    href="/add-foto-sarana">
                    Tambah Foto Sarana
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
                <th scope="col">No</th>
                <th>Foto</th>
                <th>Nama Sarana</th>
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
                      <td data-label="No">
                        {no + 1 + (currentPage - 1) * rowsPerPage}
                      </td>
                      <td data-label="Gambar">
                        <img
                          src={berita.foto ? berita.foto : "https://cdn3d.iconscout.com/3d/premium/thumb/profile-3d-icon-download-in-png-blend-fbx-gltf-file-formats--user-avatar-account-man-person-shopping-pack-e-commerce-icons-7190777.png"}
                          style={{ height: "4.5rem", width: "4.5rem", marginLeft: "auto", marginRight: "auto", display: "flex" }}
                        />
                      </td>
                      <td data-label="Nama Sarana">
                        {berita.sarana.nama_sarana}
                      </td>
                      <td data-label="Tanggal Dibuat">
                        {berita.createdDate}
                      </td>
                      <td data-label="Tanggal Update">
                        {berita.updatedDate}
                      </td>
                      <td data-label="Aksi" className="action">
                        <div className="d-flex justify-content-center align-items-center">
                          <button
                            type="button"
                            className="btn-primary btn-sm mr-2">
                            <a
                              style={{
                                color: "white",
                                textDecoration: "none",
                              }}
                              href={`/edit-foto-sarana/${berita.id}`}>
                              <i className="fa-solid fa-pen-to-square"></i>
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
                }) : <tr>
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
            onChange={(event, value) => setCurrentPage(value)}
            showFirstButton
            showLastButton
            color="primary"
          />
        </div>
      </div>
    </>
  );
}

export default FotoSarana;
