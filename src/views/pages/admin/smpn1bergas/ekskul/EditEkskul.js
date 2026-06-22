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
import { uploadFileToS3 } from "../../../../../utils/uploadToS3";

function EditEkskul() {
  const [name, setName] = useState("");
  const [tempat, setTempat] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [prestasi, setPrestasi] = useState("");
  const [pembimbing, setPembimbing] = useState("");
  const [koordinator, setKoordinator] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/ekstrakulikuler/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setName(response.name);
        setKoordinator(response.koordinator);
        setPembimbing(response.pembimbing);
        setJadwal(response.jadwal);
        setTempat(response.tempat);
        setDeskripsi(response.deskripsi);
        setPrestasi(response.prestasi);
        setFile(response.file);
        console.log("ekstrakulikuler:  : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const update = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const formData = new FormData();
    // formData.append("file", file);

    let uploadedImageUrl = null;

    if (image) {
      const uploadedUrls = await uploadFileToS3([image]);
      uploadedImageUrl = uploadedUrls[0];
    }

    const dataImage = {
      foto: uploadedImageUrl
    }

    const data = {
      koordinator: koordinator,
      pembimbing: pembimbing,
      jadwal: jadwal,
      tempat: tempat,
      name: name,
      deskripsi: deskripsi,
      prestasi: prestasi,
    };

    try {
      await axios
        .put(`${API_DUMMY}/api/ekstrakulikuler/put/` + param.id, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          if (file) {
            axios
              .put(
                `${API_DUMMY}/api/ekstrakulikuler/put/foto/` + param.id,
                dataImage,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
              .catch((err) => {
                console.log(err);
              });
          }
          Swal.fire({
            icon: "success",
            title: "Berhasil Mengedit Data Ekstrakulikuler",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            history.push("/admin-ekstrakulikuler");
            window.location.reload();
          }, 1500);
        })
        .catch((error) => {
          if (error.ressponse && error.response.status === 401) {
            localStorage.clear();
            history.push("/login");
          } else {
            Swal.fire({
              icon: "error",
              title: "Edit Data Gagal!",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
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
        <div className="app-main__outer" data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Edit Ekstrakulikuler</h1>
                    <hr />
                    <form onSubmit={update}>
                      <div className="row">
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
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
                          <label className="form-label font-weight-bold">
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
                          <label className="form-label font-weight-bold">
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
                          <label className="form-label font-weight-bold">
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
                          <label className="form-label font-weight-bold">
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
                          <label className="form-label font-weight-bold">
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
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
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
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Gambar
                          </label>
                          <input
                            onChange={(e) => setFile(e.target.files[0])}
                            type="file"
                            className="form-control"
                            placeholder="Masukkan Gambar"
                          />
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
                              Update
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

export default EditEkskul;