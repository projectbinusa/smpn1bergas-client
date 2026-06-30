import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";
import { Link } from "react-router-dom";

import Sidebar1 from "../../../../../component/Sidebar1";

function AddStructur() {
  const [image, setImage] = useState(null);
  const [tugas, setTugas] = useState("");
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const history = useHistory();
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [loading, setLoading] = useState(false);

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

  const add = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const strukturData = {
      tugas: tugas,
      nama: nama,
      jabatan: jabatan,
    };

    formData.append(
      "struktur",
      new Blob([JSON.stringify(strukturData)], { type: "application/json" })
    );

    if (image) {
      formData.append("files", image);
    }

    try {
      await axios.post(`${API_DUMMY}/api/struktur/add`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // setShow(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/admin-struktur");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Tambah Data Gagal!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    AOS.init();
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
      {/* <Header toggleSidebar={toggleSidebar} /> */}
      {/* <div className="app-main"> */}
      <Sidebar1 toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div
          className="container mt-3 mb-3 app-main__outer"
          data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Tambah Struktur</h1>
                    <hr />
                    <form onSubmit={add}>
                      <div className="row">
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Nama
                          </label>
                          <input
                            required
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Foto
                          </label>
                          {/* {image && ( */}
                          <input
                            onChange={(e) => {
                              setImage(e.target.files[0]);

                            }}
                            type="file"
                            className="form-control"
                          />
                          {image && (
                            <div className="mt-3">
                              <img
                                src={typeof image === "string" ? image : URL.createObjectURL(image)}
                                alt="Current Image"
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                  border: "1px solid #dee2e6",
                                }}
                              />
                            </div>
                          )}

                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Tugas
                          </label>
                          <input
                            required
                            value={tugas}
                            onChange={(e) => setTugas(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Tugas"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Jabatan
                          </label>
                          <input
                            required
                            value={jabatan}
                            onChange={(e) => setJabatan(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Jabatan"
                          />
                        </div>
                        {/* <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Gambar
                          </label>
                          <input
                            onChange={(e) =>
                              setImage(
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                            type="file"
                            className="form-control"
                          />
                        </div> */}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "20px",
                        }}>
                        <Link
                          to="/admin-struktur"
                          style={{
                            background: "#dc3545",
                            color: "#fff",
                            textDecoration: "none",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            fontWeight: "500",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                          <i
                            className="fa-solid fa-arrow-left"
                            style={{ marginRight: "8px" }}
                          />
                          Batal
                        </Link>

                        <button
                          type="submit"
                          disabled={loading}
                          style={{
                            background: loading ? "#6c757d" : "#0d6efd",
                            color: "#fff",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none",
                            fontWeight: "500",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: loading ? "not-allowed" : "pointer",
                            minWidth: "120px",
                          }}>
                          {loading ? (
                            <>
                              <i
                                className="fa-solid fa-spinner fa-spin"
                                style={{ marginRight: "8px" }}
                              />
                              Loading...
                            </>
                          ) : (
                            <>
                              <i
                                className="fa-solid fa-paper-plane"
                                style={{ marginRight: "8px" }}
                              />
                              Submit
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStructur;
