import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Sidebar1 from "../../../../../../component/Sidebar1";
import { Link } from "react-router-dom";

function DetailSejarah() {
  const [judul, setJudul] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [isi, setIsi] = useState("");
  const [id, setId] = useState(0);
  const [datas, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/sejarah/admin/all?page=0&size=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const res = response.data.data.content;
      setData(res);
      if (res.length > 0) {
        setCreatedDate(res[0].createdDate);
        setUpdateDate(res[0].updateDate);
        setIsi(res[0].isi);
        setJudul(res[0].judul);
        setId(res[0].id);
      }
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

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
          .delete(`${API_DUMMY}/api/sejarah/` + id, {
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

  const formatTanggal = (date) => {
    try {
      return format(new Date(date || new Date()), "dd MMMM yyyy", {
        locale: idLocale,
      });
    } catch {
      return "-";
    }
  };

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

      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="container-fluid mt-3 mb-4">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10">
              <div className="card shadow-sm border-0 rounded-3">
                {/* Header */}
                <div className="card-header bg-white border-bottom d-flex flex-wrap justify-content-between align-items-center gap-2 py-3">
                  <h1 className="fw-bold fs-4 mb-0 d-flex align-items-center gap-2">
                    <i className="fa-solid fa-book-open text-primary"></i>
                    Sejarah Sekolah
                  </h1>

                  {!isLoading &&
                    (datas.length > 0 ? (
                      <div className="d-flex gap-2">
                        <Link
                          to={`/edit-sejarah/${id}`}
                          style={{
                            background: "transparent",
                            color: "#0d6efd",
                            border: "none",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            display: "flex",
                            alignItems: "center",
                            textDecoration: "none",
                            cursor: "pointer",
                          }}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <button
                          onClick={() => deleteData(id)}
                          type="button"
                          style={{
                            background: "transparent",
                            color: "red",
                            border: "none",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    ) : (
                      <Link
                        to="/add-sejarah"
                        className="btn btn-sm d-flex align-items-center gap-1">
                        <i className="fa-solid fa-plus"></i>
                        <span>Tambah Data</span>
                      </Link>
                    ))}
                </div>

                {/* Body */}
                <div className="card-body p-4">
                  {isLoading ? (
                    <div className="text-center text-muted py-5">
                      <div
                        className="spinner-border text-primary mb-3"
                        role="status">
                        <span className="visually-hidden">Memuat...</span>
                      </div>
                      <p className="mb-0">Memuat data sejarah sekolah...</p>
                    </div>
                  ) : datas.length === 0 ? (
                    <div className="text-center text-muted py-5">
                      <i className="fa-regular fa-folder-open fs-1 mb-3 d-block"></i>
                      <p className="mb-0">Belum ada data sejarah sekolah.</p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label className="form-label fw-semibold text-secondary small text-uppercase">
                          Judul Sejarah
                        </label>
                        <div className="form-control bg-light fw-medium">
                          {judul}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold text-secondary small text-uppercase">
                          Isi Sejarah
                        </label>
                        <div
                          className="border rounded-3 p-3 bg-white"
                          style={{ minHeight: "150px", lineHeight: "1.7" }}
                          dangerouslySetInnerHTML={{ __html: isi }}
                        />
                      </div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-secondary small text-uppercase">
                            <i className="fa-regular fa-calendar-plus me-1"></i>
                            Tanggal Dibuat
                          </label>
                          <div className="form-control bg-light">
                            {formatTanggal(createdDate)}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold text-secondary small text-uppercase">
                            <i className="fa-regular fa-calendar-check me-1"></i>
                            Tanggal Update
                          </label>
                          <div className="form-control bg-light">
                            {formatTanggal(updateDate)}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailSejarah;
