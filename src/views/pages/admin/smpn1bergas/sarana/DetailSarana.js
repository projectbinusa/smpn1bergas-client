import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY } from "../../../../../utils/base_URL";

import Sidebar1 from "../../../../../component/Sidebar1";

function DetailSarana() {
  const [judul, setJudul] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [isi, setIsi] = useState("");
  const param = useParams();

  // get by id berita
  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/sarana/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const list_data = res.data.data;
        setCreatedDate(list_data.createdDate);
        setUpdateDate(list_data.updatedDate);
        setJudul(list_data.nama_sarana);
        setIsi(list_data.deskripsi);
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
              <h1 className="title card-header fw-bold fs-3">Detail</h1>
              <br />
              <div className="card-body">
                <div class="mb-3">
                  <label class="form-label fw-bold">Nama Sarana</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={judul}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Deskripsi</label>
                  <div
                    className="form-control"
                    style={{ height: "auto", background: "#e9ecef" }}
                    dangerouslySetInnerHTML={{ __html: isi }}
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
                      new Date(updateDate || new Date()),
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
                  to="/admin-sarana"
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

export default DetailSarana;
