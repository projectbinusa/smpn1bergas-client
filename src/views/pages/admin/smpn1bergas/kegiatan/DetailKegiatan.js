import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY } from "../../../../../utils/base_URL";

import Sidebar1 from "../../../../../component/Sidebar1";

function DetailKegiatan() {
    const [image, setFoto] = useState("");
    const [judul, setJudul] = useState("");
    const [penulis, setPenulis] = useState("");
    const [isi, setIsi] = useState("");
    const [createdDate, setCreatedDate] = useState("");
    const [updatedDate, setUpdatedDate] = useState("");
    const param = useParams();

    useEffect(() => {
        axios
          .get(`${API_DUMMY}/api/kegiatan/get/` + param.id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            const response = res.data.data;
            setFoto(response.foto);
            setJudul(response.judul);
            setPenulis(response.penulis);
            setIsi(response.isi);
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
              <h1 className="title card-header fw-bold fs-3">Detail Kegiatan</h1>
              <br />
              <div className="card-body">
                {image === null ? (
                  <img  className="rounded-circle w-75 mr-auto ml-auto d-block"  src="https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png" />
                ) : (
                  <img style={{ maxWidth: "400px", maxHeight: "400px" }} className="w-75 d-block mr-auto ml-auto" src={image} />
                )}
                <br />
                <br />
                <div class="mb-3">
                  <label class="form-label fw-bold">Kegiatan</label>
                  <input type="text" class="form-control" disabled value={judul} />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Jenis</label>
                  <input type="text" class="form-control" disabled value={penulis} />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Isi</label>
                  <div className="form-control" style={{ height:"auto", background: "#e9ecef" }} dangerouslySetInnerHTML={{ __html: isi }} />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal Dibuat</label>
                  <input type="text" class="form-control" disabled value={format(new Date(createdDate || new Date()), "dd MMMM yyyy", { locale: idLocale })} />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal Update</label>
                  <input type="text" class="form-control" disabled value={format(new Date(updatedDate || new Date()), "dd MMMM yyyy", { locale: idLocale })} />
                </div>
              </div>
              <button
                type="submit"
                className="btn-kembali btn-danger mt-3 mr-3">
                <a
                  href="/admin-kegiatan"
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

export default DetailKegiatan;
