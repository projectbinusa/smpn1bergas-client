import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";

import Sidebar1 from "../../../../../component/Sidebar1";

function AddPrestasi() {
  const [penyelenggara, setPenyelenggara] = useState("");
  const [namaPeserta, setNamaPeserta] = useState("");
  const [image, setImage] = useState(null);
  const [skala, setSkala] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [judul, setJudul] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
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

  const formatDateToSlash = (value) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}/${month}/${day}`;
  };

  //add
  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("peyelenggara", penyelenggara);
    formData.append("nama_peserta", namaPeserta);
    formData.append("tanggal", formatDateToSlash(tanggal));
    formData.append("skala", skala);
    formData.append("judul", judul);
    formData.append("file", image);

    try {
      await axios.post(`${API_DUMMY}/api/prestasi/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
        history.push("/admin-prestasi");
    } catch (error) {
      if (error.ressponse && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    }
  };

  useEffect(() => {
    AOS.init();
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
        <div className="container mb-3 mt-3 app-main__outer" data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Tambah Prestasi</h1>
                    <hr />
                    <form onSubmit={add}>
                      <div className="row">
                        <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Nama Prestasi
                          </label>
                          <input
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Prestasi"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Penyelenggara
                          </label>
                          <input
                            value={penyelenggara}
                            onChange={(e) => setPenyelenggara(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Penyelenggara"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Skala
                          </label>
                          <input
                            value={skala}
                            onChange={(e) => setSkala(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Skala Prestasi"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Gambar
                          </label>
                          <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Nama Peserta
                          </label>
                          <input
                            value={namaPeserta}
                            onChange={(e) => setNamaPeserta(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Peserta"
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="form-label font-weight-bold">
                            Tanggal Dilaksanakan
                          </label>
                          <div className="">
                            <input
                              type="date"
                              value={tanggal}
                              onChange={(e) => setTanggal(e.target.value)}
                              className="form-control"
                              placeholder="Masukkan Tanggal"
                              id="floatingTextarea2"
                            />
                          </div>
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-prestasi">
                          Batal
                        </a>
                      </button>{" "}
                      <button type="submit" className="btn-primary mt-3">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPrestasi;
