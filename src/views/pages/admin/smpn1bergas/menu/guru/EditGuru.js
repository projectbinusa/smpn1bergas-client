import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";

import { API_DUMMY } from "../../../../../../utils/base_URL";
import Sidebar1 from "../../../../../../component/Sidebar1";

function EditGuru() {
  const [namaGuru, setNamaGuru] = useState("");
  const [image, setFile] = useState(null);
  const [mapel, setMapel] = useState("");
  const [nip, setNip] = useState("");
  const [riwayat, setRiwayat] = useState("");
  const param = useParams();
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/guru/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setNamaGuru(response.nama_guru);
        setMapel(response.mapel);
        setImageUrl(response.foto);
        setNip(response.nip);
        setRiwayat(response.riwayat);
        console.log("guru : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //edit pengumuman
  const update = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    const data = {
      nama_guru: namaGuru,
      mapel: mapel,
      riwayat: riwayat,
      nip: nip
    }
    try {
      await axios
        .put(`${API_DUMMY}/api/guru/put/` + param.id, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      // .then(() => {
      if (image) {
        axios.put(`${API_DUMMY}/api/guru/put/foto/` + param.id, formData, {
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
        title: "Berhasil Mengedit Data Guru",
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
          title: "Edit Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    } finally {
      setLoading(false);
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
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
      <div style={{ marginTop: "50px" }}
        className="page-content1 mb-3 app-main__outer"
        data-aos="fade-left">
        <div className="container mt-3 app-main__outer" data-aos="fade-left">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Edit Guru</h1>
              <hr />
              <form onSubmit={update}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold">
                      Nama Guru
                    </label>
                    <input
                      value={namaGuru}
                      onChange={(e) => setNamaGuru(e.target.value)}
                      type="text"
                      className="form-control"
                      required
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label font-weight-bold">
                      Foto
                    </label>
                    {/* {image && ( */}
                    <input
                      required
                      onChange={(e) => {
                        if (setFile) {
                          setFile(e.target.files[0]);
                        } else {
                          setImageUrl(e.target.value);
                        }
                      }}
                      type="file"
                      className="form-control"
                    />

                    {/* )} */}

                    {image && (
                      <div className="mt-3">
                        <label className="form-label font-weight-bold">
                          Foto Baru
                        </label>
                        <img
                          src={typeof image === "string" ? image : URL.createObjectURL(image)}
                          alt="Current Image"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      </div>
                    )}

                    {imageUrl && (
                      <div className="mt-3">
                        <label className="form-label font-weight-bold">
                          Foto Lama
                        </label>
                        <img
                          src={imageUrl}
                          alt="Current Image"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold">
                      Mapel
                    </label>
                    <input
                      value={mapel}
                      onChange={(e) => setMapel(e.target.value)}
                      type="text"
                      className="form-control"
                      required
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label font-weight-bold">NIP</label>
                    <input
                      required
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
                      required
                      value={riwayat}
                      onChange={(e) => setRiwayat(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Riwayat Pendidikan"
                    />
                  </div>
                </div>
                <button type="button" className="btn-danger mt-3 mr-3">
                  <a
                    href="/admin-guru"
                    style={{ color: "white", textDecoration: "none" }}>
                    Batal
                  </a>
                </button>
                <button type="submit" className="btn-primary mt-3" disabled={loading}>
                  {loading ? "Loading..." : "Simpan"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditGuru;
