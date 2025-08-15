import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import AOS from "aos";
import axios from "axios";

import "ckeditor5/ckeditor5.css";
import Sidebar1 from "../../../../../../component/Sidebar1";

function EditOsis() {
  const [nama, setNama] = useState("");
  const [image, setImage] = useState(null);
  const [kelas, setKelas] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tahunJabat, setTahunJabat] = useState("");
  const [tahunTuntas, setTahunTuntas] = useState("");
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
  const param = useParams();
  const history = useHistory();

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 3;
  const maxYear = currentYear + 5;

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/osis/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setKelas(response.kelas);
        setNama(response.nama);
        setJabatan(response.jabatan);
        setTahunJabat(response.tahunJabat);
        setTahunTuntas(response.tahunTuntas);
        setImage(response.foto);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.id]);

  useEffect(() => {
    AOS.init();
  }, []);

  const maxTahunTuntas = tahunJabat ? parseInt(tahunJabat) + 5 : maxYear;

  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);

    const data = {
      nama: nama,
      jabatan: jabatan,
      kelas: kelas,
      tahunJabat: tahunJabat,
      tahunTuntas: tahunTuntas
    }

    await axios
      .put(`${API_DUMMY}/api/osis/put/` + param.id, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
    .then(() => {
        if (image) {
          axios.put(`${API_DUMMY}/api/osis/put/foto/` + param.id, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }).catch((err) => {
            console.log(err);
          })
        }
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Osis",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-osis");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        } else {
          Swal.fire({
            icon: "error",
            title: "Edit Data Gagal!",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(error);
        }
      });
  };

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
        <div className="container mt-3 app-main__outer" data-aos="fade-left">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Edit Data</h1>
              <hr />
              <form onSubmit={update}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label className="form-label font-weight-bold">Nama</label>
                    <input
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Nama"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label font-weight-bold">Kelas</label>
                    <input
                      value={kelas}
                      onChange={(e) => setKelas(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Kelas"
                    />
                  </div>
                  <div className="mb-3 co-lg-6">
                    <label className="form-label font-weight-bold">Gambar</label>
                    <input
                      onChange={(e) =>
                        setImage(e.target.files ? e.target.files[0] : null)
                      }
                      type="file"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label font-weight-bold">Jabatan</label>
                    <input
                      value={jabatan}
                      onChange={(e) => setJabatan(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Jabatan"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label font-weight-bold">Tahun Jabat</label>
                    <input
                      value={tahunJabat}
                      onChange={(e) => setTahunJabat(e.target.value)}
                      type="number"
                      className="form-control"
                      placeholder="Masukkan Tahun Jabat"
                      min={minYear}
                      max={maxYear}
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label font-weight-bold">Tahun Tuntas</label>
                    <input
                      value={tahunTuntas}
                      onChange={(e) => setTahunTuntas(e.target.value)}
                      type="number"
                      className="form-control"
                      placeholder="Masukkan Tahun Tuntas"
                      min={tahunJabat ? parseInt(tahunJabat) + 1 : minYear}
                      max={maxTahunTuntas}
                      disabled={!tahunJabat}
                    />
                  </div>
                </div>
                <button type="button" className="btn-danger mt-3">
                  <a
                    style={{ color: "white", textDecoration: "none" }}
                    href="/admin-osis"
                  >
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
  );
}

export default EditOsis;
