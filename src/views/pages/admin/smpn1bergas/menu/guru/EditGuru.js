import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";

import { API_DUMMY } from "../../../../../../utils/base_URL";
import Sidebar1 from "../../../../../../component/Sidebar1";

function EditGuru() {
  const [namaGuru, setNamaGuru] = useState("");
  const [image, setFile] = useState(null);
  const [mapel, setMapel] = useState("");
  const [riwayat, setRiwayat] = useState("");
  const param = useParams();
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/guru/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setNamaGuru(response.nama_guru);
        setMapel(response.mapel);
        setImageUrl(response.foto);
        setRiwayat(response.riwayat);
        console.log("guru : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //edit pengumuman
  const update = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    const data = {
      nama_guru: namaGuru,
      mapel: mapel,
      riwayat: riwayat,
    }
    try {
      await axios
        .put(`${API_DUMMY}/api/guru/put/` + param.id, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      // .then(() => {
      if (image) {
        axios.put(`${API_DUMMY}/api/guru/put/foto/` + param.id, formData, {
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
        title: "Berhasil Mengedit Data Guru",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/admin-guru");
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
      <div style={{ marginTop: "50px" }}
        className="page-content1 mb-3 app-main__outer"
        data-aos="fade-left">
        <div className="container mt-3 app-main__outer" data-aos="fade-left">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Edit Guru</h1>
              <hr />
              <form onSubmit={update}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold">
                      Nama Guru
                    </label>
                    <input
                      value={namaGuru}
                      onChange={(e) => setNamaGuru(e.target.value)}
                      type="text"
                      className="form-control"
                      required
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label font-weight-bold">
                      Foto
                    </label>
                    {/* {image && ( */}
                    <input
                      onChange={(e) => {
                        if (setFile) {
                          setFile(e.target.files[0]);
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
                        <label
                          className="form-label font-weight-bold"
                          style={{ display: "block", marginBottom: "8px" }}
                        >
                          Foto Baru
                        </label>

                        <img
                          src={typeof image === "string" ? image : URL.createObjectURL(image)}
                          alt="Foto Baru"
                          style={{
                            width: "140px",
                            height: "140px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            border: "1px solid #dee2e6",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        />
                      </div>
                    )}

                    {imageUrl && (
                      <div className="mt-3">
                        <label
                          className="form-label font-weight-bold"
                          style={{ display: "block", marginBottom: "8px" }}
                        >
                          Foto Lama
                        </label>

                        <img
                          src={imageUrl}
                          alt="Foto Lama"
                          style={{
                            width: "140px",
                            height: "140px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            border: "1px solid #dee2e6",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold">
                      Mapel
                    </label>
                    <input
                      value={mapel}
                      onChange={(e) => setMapel(e.target.value)}
                      type="text"
                      className="form-control"
                      required
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label font-weight-bold">
                      Riwayat Pendidikan{" "}
                      <span className="text-muted" style={{ fontWeight: 400, fontSize: "0.85em" }}>
                        (Opsional)
                      </span>
                    </label>
                    <input
                      value={riwayat}
                      onChange={(e) => setRiwayat(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Riwayat Pendidikan"
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
                    to="/admin-guru"
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
  );
}

export default EditGuru;