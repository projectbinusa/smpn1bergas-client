import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Sidebar1 from "../../../../../../component/Sidebar1";
import { Link } from "react-router-dom";

function AddGuru() {
  const [namaGuru, setNamaGuru] = useState("");
  const [image, setImage] = useState(null);
  const [mapel, setMapel] = useState("");
  const [riwayat, setRiwayat] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  //add
  const add = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const guruData = {
      nama_guru: namaGuru,
      mapel: mapel,
      riwayat: riwayat
    };

    formData.append(
      "guru",
      new Blob([JSON.stringify(guruData)], { type: "application/json" })
    );

    if (image) {
      formData.append("files", image);
    }

    try {
      await axios.post(`${API_DUMMY}/api/guru/add`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      history.push("/admin-guru");
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      // history.push("/admin-guru")
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
      <div
        style={{ marginTop: "50px" }}
        className="page-content1 mb-3 app-main__outer"
        data-aos="fade-left">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow">
                <div className="card-body">
                  <h1 className="fs-4">Form Tambah Guru</h1>
                  <hr />
                  <form onSubmit={add}>
                    <div className="row">
                      <div className="mb-3 col-lg-6">
                        <label className="form-label font-weight-bold">
                          Nama Guru
                        </label>
                        <input
                          required
                          value={namaGuru}
                          onChange={(e) => setNamaGuru(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Nama Guru"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label font-weight-bold">
                          Foto
                        </label>
                        <input
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                          required
                          type="file"
                          className="form-control"
                        />
                        {image && (
                          <div className="mt-3">
                            <img
                              src={typeof image === "string" ? image : URL.createObjectURL(image)}
                              alt="Current Image"
                              style={{ maxWidth: "100%", height: "auto" }}
                            />
                          </div>
                        )}
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
                      <div className="mb-3 col-lg-6">
                        <label className="form-label font-weight-bold">
                          Mapel
                        </label>
                        <input
                          required
                          value={mapel}
                          onChange={(e) => setMapel(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Mapel"
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
        {/* </div> */}
      </div>
    </div>
  );
}

export default AddGuru;