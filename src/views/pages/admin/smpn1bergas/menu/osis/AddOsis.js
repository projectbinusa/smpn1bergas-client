import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import AOS from "aos";
import axios from "axios";
import Sidebar1 from "../../../../../../component/Sidebar1";

function AddOsis() {
  const [nama, setNama] = useState("");
  const [image, setImage] = useState(null);
  const [kelas, setKelas] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tahunJabat, setTahunJabat] = useState("");
  const [tahunTuntas, setTahunTuntas] = useState("");
  const [show, setShow] = useState(false);
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
  const param = useParams();
  const history = useHistory();

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 3;
  const maxYear = currentYear + 5;

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("jabatan", jabatan);
    formData.append("kelas", kelas);
    formData.append("tahunJabat", tahunJabat);
    formData.append("tahunTuntas", tahunTuntas);
    // formData.append("file", image);

    try {
      await axios.post(
        `${API_DUMMY}/api/osis/add`,
        {
          nama: nama,
          kelas: kelas,
          jabatan: jabatan,
          tahunJabat: tahunJabat,
          tahunTuntas: tahunTuntas,
          kelas: kelas,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/admin-osis");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
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

  const maxTahunTuntas = tahunJabat ? parseInt(tahunJabat) + 5 : maxYear;
  const minTahunTuntas = tahunJabat ? parseInt(tahunJabat) + 1 : minYear;

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
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="container mt-3 app-main__outer" data-aos="fade-left">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Tambah Data</h1>
              <hr />
              <form onSubmit={add}>
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
                  <div className="mb-3 col-lg-6">
                    <label className="form-label font-weight-bold">
                      Jabatan
                    </label>
                    <input
                      value={jabatan}
                      onChange={(e) => setJabatan(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Jabatan"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label font-weight-bold">
                      Tahun Jabat
                    </label>
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
                    <label className="form-label font-weight-bold">
                      Tahun Tuntas
                    </label>
                    <input
                      value={tahunTuntas}
                      onChange={(e) => setTahunTuntas(e.target.value)}
                      type="number"
                      className="form-control"
                      placeholder="Masukkan Tahun Tuntas"
                      min={minTahunTuntas}
                      max={maxTahunTuntas}
                      disabled={!tahunJabat}
                    />
                  </div>
                </div>
                <button type="button" className="btn-danger mt-3">
                  <a
                    style={{ color: "white", textDecoration: "none" }}
                    href="/admin-osis">
                    Batal
                  </a>
                </button>
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

export default AddOsis;
