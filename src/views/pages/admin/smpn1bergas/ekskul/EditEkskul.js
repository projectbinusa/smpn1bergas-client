import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";

import Sidebar1 from "../../../../../component/Sidebar1";

function EditEkskul() {
  const [name, setName] = useState("");
  const [tempat, setTempat] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [prestasi, setPrestasi] = useState("");
  const [pembimbing, setPembimbing] = useState("");
  const [koordinator, setKoordinator] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/ekstrakulikuler/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setName(response.name);
        setKoordinator(response.koordinator);
        setPembimbing(response.pembimbing);
        setJadwal(response.jadwal);
        setTempat(response.tempat);
        setDeskripsi(response.deskripsi);
        setPrestasi(response.prestasi);
        setFile(response.file);
        console.log("ekstrakulikuler:  : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    const data = {
      koordinator: koordinator,
      pembimbing: pembimbing,
      jadwal: jadwal,
      tempat: tempat,
      name: name,
      deskripsi: deskripsi,
      prestasi: prestasi,
    };

    await axios
      .put(
        `${API_DUMMY}/api/ekstrakulikuler/put/` + param.id, data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        if (file) {
          axios.put(`${API_DUMMY}/api/ekstrakulikuler/put/foto/` + param.id, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }).catch((err) => {
            console.log(err)
          })
        }
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Ekstrakulikuler",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          history.push("/admin-ekstrakulikuler");
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        if (error.ressponse && error.response.status === 401) {
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
        <div className="app-main__outer" data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Edit Data</h1>
                    <hr />
                    <form onSubmit={update}>
                      <div className="row">
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Ekstrakurikuler
                          </label>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Ekstrakurikuler"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Pembimbing
                          </label>
                          <input
                            value={pembimbing}
                            onChange={(e) => setPembimbing(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Pembimbing"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Koordinator
                          </label>
                          <input
                            value={koordinator}
                            onChange={(e) => setKoordinator(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Koordinator"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Jadwal
                          </label>
                          <input
                            value={jadwal}
                            onChange={(e) => setJadwal(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Jadwal"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Tempat
                          </label>
                          <input
                            value={tempat}
                            onChange={(e) => setTempat(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Tempat"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Deskripsi
                          </label>
                          <textarea
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Deskripsi"></textarea>
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Prestasi
                          </label>
                          <input
                            value={prestasi}
                            onChange={(e) => setPrestasi(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Prestasi"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Gambar
                          </label>
                          <input
                            onChange={(e) => setFile(e.target.files[0])}
                            type="file"
                            className="form-control"
                            placeholder="Masukkan Gambar"
                          />
                        </div>
                        {/* <div className="mb-3 co-lg-6">
                        {/* <label className="form-label font-weight-bold">
                            Gambar
                          </label>
                          <input
                            onChange={(e) =>
                              setImage(
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                            type="file"
                            className="form-control"
                            required
                          /> */}
                        {/* </div> */}
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-ekstrakulikuler">
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

export default EditEkskul;
