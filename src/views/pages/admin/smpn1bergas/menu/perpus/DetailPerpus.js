import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY } from "../../../../../utils/base_URL";

import Sidebar1 from "../../../../../component/Sidebar1";

function DetailPerpus() {
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
    <div className={`page-wrapper chiller-theme ${
      sidebarToggled ? "toggled" : ""
    }`}>
       <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background:"#3a3f48" }}>
        <i className="fas fa-bars"></i>
      </a>
      {/* <Header toggleSidebar={toggleSidebar} /> */}
      {/* <div className="app-main"> */}
      <Sidebar1 toggleSidebar={toggleSidebar} />
        <div style={{marginTop:"10px"}} className="page-content1 mt-3 mb-3 app-main__outer">
          <div className="container box-tabel">
            <form className="card shadow w-100">
              <h1 className="title card-header fw-bold fs-3">Detail Buku</h1>
              <br />
              <div className="card-body">
                {image === null ? (
                  <img
                    className="rounded-circle w-75 mr-auto ml-auto d-block"
                    src="https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"
                  />
                ) : (
                  <img
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="w-75 d-block mr-auto ml-auto"
                    src={image}
                  />
                )}
                <br />
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
              <button
                type="submit"
                className="btn-kembali btn-danger mt-3 mr-3">
                <a
                  href="/admin-berita"
                  style={{ color: "white", textDecoration: "none" }}>
                  Kembali
                </a>
              </button>
            </form>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default DetailPerpus;
