import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../utils/base_URL";

import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import AOS from "aos";
import axios from "axios";
import Sidebar1 from "../../../../../component/Sidebar1";

function AddMateriAjar() {
  const [tingkat, setTingkat] = useState("");
  const [mapel, setMapel] = useState("");
  const [file, setFile] = useState(null);
  const [judul, setJudul] = useState("");
  const [penyusun, setPenyusun] = useState("");
  const [jenis, setJenis] = useState("");
  const history = useHistory();
  const [show, setShow] = useState(false);

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("tingkat", tingkat);
    formData.append("mapel", mapel);
    formData.append("penyusun", penyusun);
    formData.append("judul", judul);
    formData.append("file", file);
    formData.append("jenis", jenis);

    try {
      await axios.post(`${API_DUMMY}/api/materi_ajar/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push("/admin-materi-ajar");
      }, 1500);
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
        <div className="container mt-3 app-main__outer" data-aos="fade-left">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Tambah Materi Ajar</h1>
              <hr />
              <form onSubmit={add}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputEmail1"
                      className="form-label font-weight-bold">
                      Tingkat
                    </label>
                    <input
                      value={tingkat}
                      onChange={(e) => setTingkat(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Tingkat"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputEmail1"
                      className="form-label font-weight-bold">
                      Judul
                    </label>
                    <input
                      value={judul}
                      onChange={(e) => setJudul(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Judul"
                    />
                  </div>
                  <div className="mb-3 co-lg-6">
                    <label className="form-label font-weight-bold">File</label>
                    <input
                      onChange={(e) =>
                        setFile(e.target.files ? e.target.files[0] : null)
                      }
                      type="file"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-lg-12">
                    <label className="form-label font-weight-bold">Mapel</label>
                    <input
                      value={mapel}
                      onChange={(e) => setMapel(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Mapel"
                    />
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label font-weight-bold">
                      Penyusun
                    </label>
                    <div className="">
                      <input
                        value={penyusun}
                        onChange={(e) => setPenyusun(e.target.value)}
                        className="form-control"
                        placeholder="Masukkan Penyusun"
                        id="floatingTextarea2"
                        rows="5"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label font-weight-bold">Jenis</label>
                    <div className="">
                      <input
                        value={jenis}
                        onChange={(e) => setJenis(e.target.value)}
                        className="form-control"
                        placeholder="Masukkan Jenis"
                        id="floatingTextarea2"
                        rows="5"
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "20px",
                  }}
                >
                  <Link
                    to="/admin-materi-ajar"
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
                    }}
                  >
                    <i
                      className="fa-solid fa-arrow-left"
                      style={{ marginRight: "8px" }}
                    />
                    Batal
                  </Link>

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
                    }}
                  >
                    <i
                      className="fa-solid fa-paper-plane"
                      style={{ marginRight: "8px" }}
                    />
                    Submit
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

export default AddMateriAjar;
