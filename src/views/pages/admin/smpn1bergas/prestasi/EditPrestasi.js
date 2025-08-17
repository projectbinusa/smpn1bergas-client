import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Sidebar1 from "../../../../../component/Sidebar1";
import { Link } from "@mui/material";

function EditPrestasi() {
  const [penyelenggara, setPenyelenggara] = useState("");
  const [namaPeserta, setNamaPeserta] = useState("");
  const [image, setImage] = useState(null); // gambar baru
  const [previewImage, setPreviewImage] = useState(null); // untuk preview baru
  const [oldImage, setOldImage] = useState(null); // gambar lama
  const [skala, setSkala] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [judul, setJudul] = useState("");
  const history = useHistory();
  const param = useParams();
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

  const formatDateToSlash = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  // update data
  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);

    const data = {
      peyelenggara: penyelenggara,
      nama_peserta: namaPeserta,
      tanggal: formatDateToSlash(tanggal),
      skala: skala,
      judul: judul,
    };

    try {
      await axios.put(
        `${API_DUMMY}/api/prestasi/put/${param.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (image) {
        await axios.put(
          `${API_DUMMY}/api/prestasi/put/foto/${param.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      Swal.fire({
        icon: "success",
        title: "Berhasil Mengedit Data Prestasi",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/admin-prestasi");
    } catch (error) {
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
    }
  };

  // get data prestasi
  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/prestasi/get/${param.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const response = res.data.data;
        setPenyelenggara(response.peyelenggara);
        setJudul(response.judul);
        setSkala(response.skala);
        setTanggal(response.tanggal);
        setNamaPeserta(response.nama_peserta);
        setOldImage(response.foto); // pastikan field API sesuai
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.id]);

  // preview gambar baru
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""}`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}
      >
        <i className="fas fa-bars"></i>
      </a>
      <Sidebar1 toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="container mt-3 mb-3 app-main__outer" data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Edit Prestasi</h1>
                    <hr />
                    <form onSubmit={update}>
                      <div className="row">
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
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
                          <label className="form-label font-weight-bold">
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
                          <label className="form-label font-weight-bold">Gambar</label>
                          <input
                            onChange={handleImageChange}
                            type="file"
                            className="form-control"
                          />
                          {/* Preview gambar */}
                          <div style={{ marginTop: "10px" }}>
                            {previewImage ? (
                              <img
                                src={previewImage}
                                alt="Preview Baru"
                                style={{ maxWidth: "200px", borderRadius: "8px" }}
                              />
                            ) : oldImage ? (
                              <img
                                src={oldImage}
                                alt="Gambar Lama"
                                style={{ maxWidth: "200px", borderRadius: "8px" }}
                              />
                            ) : null}
                          </div>
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
                            Tanggal Pelaksanaan
                          </label>
                          <input
                            type="date"
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <button type="button" className="btn btn-danger mt-3 mr-3">
                        <Link
                          style={{ color: "white", textDecoration: "none" }}
                          to="/admin-prestasi"
                        >
                          Batal
                        </Link>
                      </button>
                      <button type="submit" className="btn btn-primary mt-3">
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

export default EditPrestasi;
