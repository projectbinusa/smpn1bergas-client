import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../utils/base_URL";

import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import AOS from "aos";
import axios from "axios";
import Sidebar1 from "../../../../../component/Sidebar1";

function EditMateriAjar() {
  const [tingkat, setTingkat] = useState("");
  const [mapel, setMapel] = useState("");
  const [file, setFile] = useState(null);
  const [judul, setJudul] = useState("");
  const [penyusun, setPenyusun] = useState("");
  const [jenis, setJenis] = useState("");

  const param = useParams();
  const history = useHistory();

  const updateBerita = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("file", file);

    const data = {
      tingkat: tingkat,
      mapel: mapel,
      penyusun: penyusun,
      judul: judul,
      jenis: jenis
    }

    await axios
      .put(
        `${API_DUMMY}/api/materi_ajar/put/` + param.id, data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        if (file) {
          axios.put(`${API_DUMMY}/api/materi_ajar/put/foto/` + param.id, formData, {
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
          title: "Berhasil Mengedit Data Materi Ajar",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-materi-ajar");
        setTimeout(() => {
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
  };

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/materi_ajar/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setTingkat(response.tingkat);
        setMapel(response.mapel);
        setPenyusun(response.penyusun);
        setJudul(response.judul);
        setJenis(response.jenis);
        setPenyusun(response.penyusun);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
              <h1 className="fs-4">Form Edit Materi Ajar</h1>
              <hr />
              <form onSubmit={updateBerita}>
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
                    <label className="form-label font-weight-bold">
                      Jenis
                    </label>
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
                  }}>
                  <a
                    href="/admin-materi-ajar"
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
  );
}

export default EditMateriAjar;
