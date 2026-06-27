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
import Sidebar1 from "../../../../../component/Sidebar1";
import { Link } from "react-router-dom";

function EditStruktur() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [tugas, setTugas] = useState("");
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const history = useHistory();
  const param = useParams();
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

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/struktur/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setImageUrl(response.foto);
        setTugas(response.tugas);
        setNama(response.nama);
        setJabatan(response.jabatan);
        console.log("stuktur : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //edit pengumuman
  const update = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", image);

      const data = {
        tugas: tugas,
        nama: nama,
        jabatan: jabatan
      }
      setLoading(true);
      await axios
        .put(`${API_DUMMY}/api/struktur/put/` + param.id, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      // .then(() => {
      if (image) {
        axios.put(`${API_DUMMY}/api/struktur/put/foto/` + param.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).catch((err) => {
          console.log(err);
        })
      }
      Swal.fire({
        icon: "success",
        title: "Berhasil Mengedit Data Struktur",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/admin-struktur");
    } catch (error) {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
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
        <div className="container mt-3 mb-3 app-main__outer" data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Edit Struktur</h1>
                    <hr />
                    <form onSubmit={update}>
                      <div className="row">
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
                            Nama Struktur
                          </label>
                          <input
                            required
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Struktur"
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
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Foto
                          </label>
                          {/* {image && ( */}
                          <input
                            onChange={(e) => {
                              if (setImage) {
                                setImage(e.target.files[0]);
                              } else {
                                setImageUrl(e.target.value);
                              }
                            }}
                            type="file"
                            className="form-control"
                          />

                          {/* )} */}

                          {image && (
                            <div className="mt-3">
                              <label className="form-label font-weight-bold">
                                Gambar Baru
                              </label>
                              <img
                                src={typeof image === "string" ? image : URL.createObjectURL(image)}
                                alt="Current Image"
                                style={{ maxWidth: "100%", height: "auto" }}
                              />
                            </div>
                          )}

                          {imageUrl && (
                            <div className="mt-3">
                              <img
                                src={imageUrl}
                                alt="Current Image"
                                style={{ maxWidth: "100%", height: "auto" }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "20px",
                        }}>
                        <a
                          href="/admin-struktur"
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
                        </a>

                        <button
                          type="submit"
                          style={{
                            background: "#0d6efd",
                            color: "#fff",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none",
                            fontWeight: "500",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: "120px",
                          }}>
                          <i
                            className="fa-solid fa-paper-plane"
                            style={{ marginRight: "8px" }}
                          />
                          Simpan
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

export default EditStruktur;
