import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY } from "../../../../../utils/base_URL";

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
    <div className={`page-wrapper chiller-theme ${
      sidebarToggled ? "toggled" : ""
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
                  <div className="form-control" style={{ height:"auto", background: "#e9ecef" }} dangerouslySetInnerHTML={{ __html: tujuan }} />
                </div>
              </div>
              <button
                type="submit"
                className="btn-kembali btn-danger mt-3 mr-3">
                <a
                  href="/admin-program"
                  style={{ color: "white", textDecoration: "none" }}>
                  Kembali
                </a>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProgram;
