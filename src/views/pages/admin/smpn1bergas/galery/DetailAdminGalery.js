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

function DetailAdminGalery() {
  const [datas, setDatas] = useState(null);
  const [images, setImages] = useState("");
  const param = useParams();

  // get by id berita
  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/galeri/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const list_data = res.data.data;
        console.log(list_data.foto);
        setDatas(list_data);
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
            <h1 className="title card-header fw-bold fs-3">Detail Galeri</h1>
            <br />
            <div className="card-body">
              <div class="mb-3">
                <label class="form-label fw-bold">Judul Galeri</label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  value={datas?.judul}
                />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Kategori Galeri</label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  value={datas?.categoryGalery?.category}
                />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Tanggal Dibuat</label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  value={format(
                    new Date(datas?.createdDate || new Date()),
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
                    new Date(datas?.updateDate || new Date()),
                    "dd MMMM yyyy",
                    { locale: idLocale }
                  )}
                />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Isi Berita</label>
                <div
                  className="form-control"
                  style={{ height: "fit-content", background: "#e9ecef" }}
                  dangerouslySetInnerHTML={{ __html: datas?.deskripsi }}
                />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Gambar</label>
                {JSON.parse(datas?.foto || "[]").length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px"
                    }}
                  >
                    {JSON.parse(datas?.foto || "[]").map((imageUrl, index) => (
                      <div key={index}>
                        <img
                          src={imageUrl}
                          alt={`Galeri ${index}`}
                          style={{
                            display: "block",
                            maxWidth: "100%",
                            height: "auto"
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">Tidak ada gambar</p>
                )}
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
                to="/admin-galery"
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
      {/* </div> */}
    </div>
  );
}

export default DetailAdminGalery;
