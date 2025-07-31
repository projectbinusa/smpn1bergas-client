import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Sidebar1 from "../../../../../component/Sidebar1";

function AddGalery() {
  const history = useHistory();

  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

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
    AOS.init();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    formData.append("kategori_id", kategoriId);
    images.forEach((img) => {
      formData.append("file[]", img);
    });

    try {
      await axios.post(`${API_DUMMY}/api/galeri/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Data Berhasil Ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });

      history.push("/admin-galery");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
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
        console.error(error);
      }
    }
  };

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
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow">
                <div className="card-body">
                  <h1 className="fs-4">Form Tambah Galeri</h1>
                  <hr />
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="mb-3 col-lg-12">
                        <label className="form-label font-weight-bold">Judul</label>
                        <input
                          value={judul}
                          onChange={(e) => setJudul(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Judul"
                        />
                      </div>

                      <div className="mb-3 col-lg-6">
                        <label className="form-label font-weight-bold">Kategori</label>
                        <input
                          type="text"
                          className="form-control"
                          value={kategoriId}
                          onChange={(e) => setKategoriId(e.target.value)}
                          placeholder="Masukkan Kategori"
                        />
                      </div>

                      <div className="mb-3 col-lg-6">
                        <label className="form-label font-weight-bold">Gambar</label>
                        <input
                          onChange={handleImageChange}
                          type="file"
                          className="form-control"
                          multiple
                        />
                        {previewImages.length > 0 && (
                          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
                            {previewImages.map((src, index) => (
                              <img
                                key={index}
                                src={src}
                                alt={`preview-${index}`}
                                height="100px"
                                style={{ borderRadius: "4px", border: "1px solid #ccc" }}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mb-3 col-lg-12">
                        <label className="form-label font-weight-bold">Deskripsi</label>
                        <textarea
                          value={deskripsi}
                          onChange={(e) => setDeskripsi(e.target.value)}
                          className="form-control"
                          placeholder="Masukkan Deskripsi"
                        ></textarea>
                      </div>
                    </div>

                    <button type="button" className="btn btn-danger mt-3 mr-3">
                      <a href="/admin-galery" style={{ color: "white", textDecoration: "none" }}>
                        Batal
                      </a>
                    </button>

                    <button type="submit" className="btn btn-primary mt-3 ml-2">
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
  );
}

export default AddGalery;
