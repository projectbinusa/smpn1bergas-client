import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY } from "../../../../../utils/base_URL";

import Sidebar1 from "../../../../../component/Sidebar1";

function DetailMateriAjar() {
  const [tingkat, setTingkat] = useState("");
  const [mapel, setMapel] = useState("");
  const [file, setFile] = useState(null);
  const [judul, setJudul] = useState("");
  const [penyusun, setPenyusun] = useState("");
  const [jenis, setJenis] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const param = useParams();

  // get by id berita
  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/materi_ajar/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const response = res.data.data;
        setTingkat(response.tingkat);
        setMapel(response.mapel);
        setPenyusun(response.penyusun);
        setJudul(response.judul);
        setJenis(response.jenis);
        setPenyusun(response.penyusun);
        setUpdatedDate(response.updatedDate);
        setCreatedDate(response.createdDate);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  }, [param.id]);

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
        <div className="container mt-3 mb-3 app-main__outer">
          <div className="box-tabel">
            <form className="card shadow w-100">
              <h1 className="title card-header fw-bold fs-3">Detail Materi Ajar</h1>
              <br />
              <div className="card-body">
                <div class="mb-3">
                  <label class="form-label fw-bold">Judul</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={judul}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Jenis</label>
                  <input
                    disabled
                    class="form-control"
                    defaultValue={jenis}
                    rows="5"
                    readOnly
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Penyusun</label>
                  <input
                    disabled
                    class="form-control"
                    defaultValue={penyusun}
                    rows="5"
                    readOnly
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tingkat</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={tingkat}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Mapel</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={mapel}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal Dibuat</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={format(
                      new Date(createdDate || new Date()),
                      "dd MMMM yyyy",
                      { locale: idLocale }
                    )}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal Update</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={format(
                      new Date(updatedDate || new Date()),
                      "dd MMMM yyyy",
                      { locale: idLocale }
                    )}
                  />
                </div>
              </div>
              <div
              className="btn-kembali"
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
              }}>
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
                  }}>
                  Kembali
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailMateriAjar;
