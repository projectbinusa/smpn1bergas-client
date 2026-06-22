import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";
import { Link } from "react-router-dom";

import Sidebar1 from "../../../../../component/Sidebar1";

function AddEkskul() {
  const [name, setName] = useState("");
  const [tempat, setTempat] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [prestasi, setPrestasi] = useState("");
  const [pembimbing, setPembimbing] = useState("");
  const [koordinator, setKoordinator] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  //add
  const add = async (e) => {
    e.preventDefault();
    e.persist();
    setLoading(true);

    try {
      const formData = new FormData();
      await axios.post(
        `${API_DUMMY}/api/ekstrakulikuler/add`,
        {
          koordinator: koordinator,
          pembimbing: pembimbing,
          jadwal: jadwal,
          tempat: tempat,
          name: name,
          deskripsi: deskripsi,
          prestasi: prestasi,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push("/admin-ekstrakulikuler");
        window.location.reload();
      }, 1500);
      console.log("name: ", name);
    } catch (error) {
      if (error.ressponse && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);
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
      {/* <Header toggleSidebar={toggleSidebar} /> */}
      {/* <div className="app-main"> */}
      <Sidebar1 toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="container" data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Tambah Ekstrakurikuler</h1>
                    <hr />
                    <form onSubmit={add}>
                      <div className="row">
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold text-left">
                            Ekstrakurikuler
                          </label>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Ekstrakurikuler"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold text-left">
                            Pembimbing
                          </label>
                          <input
                            value={pembimbing}
                            onChange={(e) => setPembimbing(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Pembimbing"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold text-left">
                            Koordinator
                          </label>
                          <input
                            value={koordinator}
                            onChange={(e) => setKoordinator(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Koordinator"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold text-left">
                            Jadwal
                          </label>
                          <input
                            value={jadwal}
                            onChange={(e) => setJadwal(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Jadwal"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold text-left">
                            Tempat
                          </label>
                          <input
                            value={tempat}
                            onChange={(e) => setTempat(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Tempat"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold text-left">
                            Prestasi
                          </label>
                          <input
                            value={prestasi}
                            onChange={(e) => setPrestasi(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Prestasi"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold text-left">
                            Deskripsi
                          </label>
                          <textarea
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Deskripsi"></textarea>
                        </div>
                      </div>

                      {/* Bagian button dengan gaya yang sama seperti AddBeritaAdmin */}
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "20px",
                        }}>
                        <Link
                          to="/admin-ekstrakulikuler"
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
                            border: "none",
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

export default AddEkskul;