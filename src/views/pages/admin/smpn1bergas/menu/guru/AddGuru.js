import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Sidebar1 from "../../../../../../component/Sidebar1";

function AddGuru() {
  const [namaGuru, setNamaGuru] = useState("");
  const [image, setImage] = useState(null);
  const [mapel, setMapel] = useState("");
  const [nip, setNip] = useState("");
  const [riwayat, setRiwayat] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();

  //add
  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("nama_guru", namaGuru);
    formData.append("mapel", mapel);
    formData.append("riwayat", riwayat);
    formData.append("nip", nip);
    formData.append("file", image);

    try {
      await axios.post(`${API_DUMMY}/api/guru/add`, {
        nama_guru: namaGuru,
        mapel: mapel,
        riwayat: riwayat,
        nip: nip,
      }, {
        headers: {
          // "Content-Type": "multipart/form-data",
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
      history.push("/admin-guru");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`page-wrapper chiller-theme ${
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
      <div
        style={{ marginTop: "50px" }}
        className="page-content1 mb-3 app-main__outer"
        data-aos="fade-left">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow">
                <div className="card-body">
                  <h1 className="fs-4">Form Tambah Data</h1>
                  <hr />
                  <form onSubmit={add}>
                    <div className="row">
                      <div className="mb-3 col-lg-6">
                        <label className="form-label font-weight-bold">
                          Nama Guru
                        </label>
                        <input
                          value={namaGuru}
                          onChange={(e) => setNamaGuru(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Nama Guru"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label font-weight-bold">
                          NIP
                        </label>
                        <input
                          value={nip}
                          onChange={(e) => setNip(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan NIP"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label font-weight-bold">
                          Riwayat Pendidikan
                        </label>
                        <input
                          value={riwayat}
                          onChange={(e) => setRiwayat(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Riwayat Pendidikan"
                        />
                      </div>
                      {/* <div className="mb-3 co-lg-6">
                        <label className="form-label font-weight-bold">
                          Gambar
                        </label>
                        <input
                          onChange={(e) =>
                            setImage(e.target.files ? e.target.files[0] : null)
                          }
                          type="file"
                          className="form-control"
                        />
                      </div> */}
                      <div className="mb-3 col-lg-6">
                        <label className="form-label font-weight-bold">
                          Mapel
                        </label>
                        <input
                          value={mapel}
                          onChange={(e) => setMapel(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Mapel"
                        />
                      </div>
                    </div>
                    <button type="button" className="btn-danger mt-3 mr-3">
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="/admin-guru">
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
        {/* </div> */}
      </div>
    </div>
  );
}

export default AddGuru;
