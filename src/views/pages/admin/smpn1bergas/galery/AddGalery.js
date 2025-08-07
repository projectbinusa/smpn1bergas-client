import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Sidebar1 from "../../../../../component/Sidebar1";

function AddGalery() {
  const history = useHistory();

  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    kategori_id: "",
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, index) => {
    const files = e.target.files;
    if (files && files[0]) {
      const newImages = [...images];
      newImages[index] = files[0];
      setImages(newImages);
    }
  };

  const addImageInput = () => {
    setImages([...images, null]);
  };

  const removeImageInput = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validasi form
    if (!formData.judul.trim()) {
      Swal.fire({
        icon: "error",
        title: "Judul tidak boleh kosong",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsSubmitting(false);
      return;
    }

    const validImages = images.filter((img) => img !== null);
    if (validImages.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Minimal upload 1 gambar",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const data = new FormData();

      data.append(
        "galeri",
        new Blob([JSON.stringify(formData)], {
          type: "application/json",
        })
      );

      validImages.forEach((file) => {
        data.append("files", file);
      });

      const response = await axios.post(`${API_DUMMY}/api/galeri/add`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Menambahkan Data galery",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-galery");
      }
    } catch (error) {
      console.error("Error adding gallery:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Menambahkan Data",
        text: error.response?.data?.message || "Terjadi kesalahan",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                        <label className="form-label font-weight-bold">
                          Judul
                        </label>
                        <input
                          name="judul"
                          value={formData.judul}
                          onChange={handleInputChange}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Judul"
                          required
                        />
                      </div>

                      <div className="mb-3 col-lg-12">
                        <label className="form-label font-weight-bold">
                          Kategori
                        </label>
                        <input
                          name="kategori_id"
                          type="text"
                          className="form-control"
                          value={formData.kategori_id}
                          onChange={handleInputChange}
                          placeholder="Masukkan Kategori"
                        />
                      </div>

                      <div className="mb-3 col-lg-12">
                        <label className="form-label font-weight-bold">
                          Gambar
                        </label>
                        {/* {images.map((file, index) => (
                          <div className="mb-3" key={index}>
                            <div className="d-flex align-items-center gap-2">
                              <input
                                className="form-control"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, index)}
                                required={index === 0}
                              />
                              {images.length > 1 && (
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => removeImageInput(index)}
                                  disabled={isSubmitting}>
                                  Hapus
                                </button>
                              )}
                              {index === images.length - 1 && (
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={addImageInput}
                                  disabled={isSubmitting}>
                                  Tambah Gambar
                                </button>
                              )}
                            </div>
                            {file && (
                              <small className="text-muted">
                                {file.name} - {(file.size / 1024).toFixed(2)} KB
                              </small>
                            )}
                          </div>
                        ))} */}
                        {images.map((file, index) => (
                          <div className="mb-3" key={index}>
                            <div className="d-flex align-items-center gap-2">
                              <input
                                className="form-control"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, index)}
                                required={index === 0}
                              />
                              {images.length > 1 && (
                                <button
                                  type="button"
                                  className="btn-danger"
                                  onClick={() => removeImageInput(index)}
                                  disabled={isSubmitting}>
                                  Hapus
                                </button>
                              )}
                              {index === images.length - 1 && (
                                <button
                                  type="button"
                                  className="btn-primary"
                                  onClick={addImageInput}
                                  disabled={isSubmitting}>
                                  Tambah
                                </button>
                              )}
                            </div>

                            {/* Tampilkan nama file dan preview */}
                            {file && (
                              <div className="mt-2">
                                <small className="text-muted d-block mb-1">
                                  {file.name} - {(file.size / 1024).toFixed(2)} KB
                                </small>
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Preview ${index}`}
                                  style={{ maxHeight: '150px', objectFit: 'contain', border: '1px solid #ccc', padding: 4 }}
                                />
                              </div>
                            )}
                          </div>
                        ))}

                        {images.length === 0 && (
                          <div>
                            <button
                              type="button"
                              className="btn-primary"
                              onClick={addImageInput}>
                              Tambah Gambar
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="mb-3 col-lg-12">
                        <label className="form-label font-weight-bold">
                          Deskripsi
                        </label>
                        <textarea
                          name="deskripsi"
                          value={formData.deskripsi}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Masukkan Deskripsi"
                          rows="4"></textarea>
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={() => history.push("/admin-galery")}
                        disabled={isSubmitting}>
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"></span>
                            Menyimpan...
                          </>
                        ) : (
                          "Simpan"
                        )}
                      </button>
                    </div>
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
