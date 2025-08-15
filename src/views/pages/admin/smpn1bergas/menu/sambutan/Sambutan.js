import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";

import { Pagination } from "@mui/material";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Sidebar1 from "../../../../../../component/Sidebar1";


function AdminSambutan() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paginationInfo1, setPaginationInfo1] = useState({
    totalPages1: 1,
    totalElements1: 0,
  });

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/sambutan/all/terbaru?page=${
          page - 1
        }&size=${rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setList(response.data.data.content);
      console.log("data sambutan: ", response);
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
          .delete(`${API_DUMMY}/api/sambutan/` + id, {
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
     <div
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
      }`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}>
        <i className="fas fa-bars"></i>
      </a>
      <Sidebar1 toggleSidebar={toggleSidebar} />
      <div style={{marginTop:"50px"}}
        className="page-content1 mb-3 app-main__outer"
        data-aos="fade-left">
        <div
          className="container box-table mt-3 app-main__outer"
          data-aos="fade-left">
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
              <p className="mt-3">Data Sambutan</p>
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
                    {list.length > 0 ? (
                      <>
                        <button
                          style={{ cursor: "not-allowed" }}
                          disabled
                          className="active btn-focus p-2 rounded">
                          Tambah Data
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="active btn-focus p-2 rounded">
                          <a
                            style={{ color: "white", textDecoration: "none" }}
                            href="/add-kontak">
                            Tambah Data
                          </a>
                        </button>
                      </>
                    )}
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
                    <th scope="col" className="text-center">No</th>
                    <th className="text-center">Judul Sambutan</th>
                    <th className="text-center">Nama Kepala Sekolah</th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ minWidth: "150px" }}>
                      Isi Sambutan
                    </th>
                    <th className="text-center">NIP</th>
                    <th className="text-center">Gambar</th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((berita, no) => {
                    return (
                      <tr key={no}>
                        <td data-label="No" className="">
                          {no + 1 + (currentPage - 1) * rowsPerPage}
                        </td>
                        <td data-label="Judul Sambutan" className="text-long">
                          {berita.judul}
                        </td>
                        <td data-label="Nama Kepala Sekolah" className="text-long">
                          {berita.nama}
                        </td>
                        <td
                          style={{
                            maxWidth: "150px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          data-label="Isi Sejarah"
                          className="text-long">
                          <div
                            dangerouslySetInnerHTML={{ __html: berita.isi }}
                          />
                        </td>
                        <td data-label="NIP" className="">
                          {berita.nip}
                        </td>
                        <td data-label="Gambar" className="">
                          <img
                            src={berita.foto}
                            style={{ height: "4.5rem", width: "4.5rem", marginLeft:"auto", marginRight:"auto", display:"flex" }}
                          />
                        </td>
                        <td data-label="Aksi">
                          <div className="aksi">
                            <button
                              type="button"
                              className="btn-primary btn-sm mr-2">
                              <a
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                                href={`/edit-sambutan/${berita.id}`}>
                                <i className="fa-solid fa-pen-to-square"></i>
                              </a>
                            </button>
                            <button
                              type="button"
                              class="btn-warning  mr-2 btn-sm">
                              <a
                                className="text-light"
                                href={"/detail-sambutan/" + berita.id}>
                                <i class="fas fa-info-circle"></i>
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
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSambutan;
