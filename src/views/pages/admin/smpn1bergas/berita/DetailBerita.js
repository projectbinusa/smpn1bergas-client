import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY } from "../../../../../utils/base_URL";
import { Link } from "react-router-dom";

import Sidebar1 from "../../../../../component/Sidebar1";

function DetailBerita() {
  const [judulBerita, setJudulBerita] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [author, setAuthor] = useState("");
  const [isiBerita, setIsiBerita] = useState("");
  const [categoryBerita, setCategoryBerita] = useState("");
  const [image, setImage] = useState("");
  const param = useParams();

  // get by id berita
  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/berita/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const list_data = res.data.data;
        setCreatedDate(list_data.createdDate);
        setUpdateDate(list_data.updatedDate);
        setJudulBerita(list_data.judulBerita);
        setAuthor(list_data.author);
        setIsiBerita(list_data.isiBerita);
        setImage(list_data.image);
        setCategoryBerita(list_data.categoryBerita);
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
      <Sidebar1 toggleSidebar={toggleSidebar} />
      <div style={{ marginTop: "10px" }} className="page-content1 mt-3 mb-3 app-main__outer">
        <div className="container box-tabel">
          <form className="card shadow w-100">
            <h1 className="title card-header fw-bold fs-3">Detail Berita</h1>
            <br />
            <div className="card-body">
              <div style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px"
              }}>
                {image === null ? (
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "400px",
                      borderRadius: "8px",
                      objectFit: "contain"
                    }}
                    src="https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"
                    alt="Default Berita"
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "20px"
                    }}
                  >
                    <img
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        maxHeight: "400px",
                        borderRadius: "8px",
                        objectFit: "cover", // atau "contain" kalau mau full tanpa crop
                      }}
                      src={
                        image
                          ? image
                          : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"
                      }
                      alt="Berita"
                    />
                  </div>

                )}
              </div>
              <br />
              <div class="mb-3">
                <label class="form-label fw-bold">Judul Berita</label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  value={judulBerita}
                />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Author</label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  value={author}
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
              <div class="mb-3">
                <label class="form-label fw-bold">Kategori Berita</label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  value={categoryBerita}
                />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Isi Berita</label>
                <div
                  className="form-control"
                  style={{ height: "fit-content", background: "#e9ecef" }}
                  dangerouslySetInnerHTML={{ __html: isiBerita }}
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
                to="/admin-berita"
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
                Kembali
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DetailBerita;