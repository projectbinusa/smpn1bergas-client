import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY } from "../../../../../utils/base_URL";
import { Link } from "react-router-dom";

import Sidebar1 from "../../../../../component/Sidebar1";

function DetailProgram() {
  const [namaprogram, setNamaProgram] = useState("");
  const [category, setCategory] = useState("");
  const [tujuan, setTujuan] = useState("");
  const param = useParams();
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

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/program/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const response = res.data.data;
        setNamaProgram(response.namaProgram);
        setCategory(response.categoryProgram.category);
        setTujuan(response.tujuan);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  }, [param.id]);

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
              <h1 className="title card-header fw-bold fs-3">Detail Program</h1>
              <br />
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">Nama Program</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={namaprogram}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Judul Program</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={category}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Tujuan</label>
                  <div className="form-control" style={{ height: "auto", background: "#e9ecef" }} dangerouslySetInnerHTML={{ __html: tujuan }} />
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
                  to="/admin-program"
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

export default DetailProgram;
