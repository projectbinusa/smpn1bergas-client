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

function DetailPrestasi() {
  const [penyelenggara, setPenyelenggara] = useState("");
  const [namaPeserta, setNamaPeserta] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [image, setImage] = useState(null);
  const [skala, setSkala] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [judul, setJudul] = useState("");
  const param = useParams();

  // get by id berita
  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/prestasi/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const list_data = res.data.data;
        console.log("list_data: ", res.data.data);

        setCreatedDate(list_data.createdDate);
        setUpdatedDate(list_data.updatedDate);
        setTanggal(list_data.tanggal);
        setTanggal(list_data.tanggal);
        setPenyelenggara(list_data.peyelenggara);
        setJudul(list_data.judul);
        setSkala(list_data.skala);
        setNamaPeserta(list_data.nama_peserta);
        setImage(list_data.foto);
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
              <h1 className="title card-header fw-bold fs-3">Detail Prestasi</h1>
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
                  <label class="form-label fw-bold">Judul</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={judul}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Penyelenggara</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={penyelenggara}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal</label>
                  <input type="text" class="form-control" disabled value={format(new Date(tanggal || new Date()), "dd MMMM yyyy", { locale: idLocale })} />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Nama Peserta</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={namaPeserta}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Skala</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={skala}
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
              <Link to="/admin-prestasi">
                <button
                  type="button"
                  className="btn-kembali btn-danger mt-3 mr-3">
                  Kembali
                </button>
              </Link>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPrestasi;
