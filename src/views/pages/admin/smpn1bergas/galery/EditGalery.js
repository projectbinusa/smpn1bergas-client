import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Sidebar1 from "../../../../../component/Sidebar1";

function EditGalery() {
  const { id } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/api/galeri/get/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = response.data.data;
        setFormData({
          judul: data.judul,
          deskripsi: data.deskripsi
        });

        if (data.foto) {
          try {
            const parsedImages = JSON.parse(data.foto);
            setExistingImages(Array.isArray(parsedImages) ? parsedImages : []);
          } catch (e) {
            console.error("Error parsing images:", e);
            setExistingImages([]);
          }
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal memuat data galeri",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNewFileChange = (e, index) => {
    const files = e.target.files;
    if (files && files[0]) {
      const updatedImages = [...newImages];
      updatedImages[index] = files[0];
      setNewImages(updatedImages);
    }
  };

  const addNewImageInput = () => {
    setNewImages([...newImages, null]);
  };

  const removeNewImageInput = (index) => {
    const updatedImages = newImages.filter((_, i) => i !== index);
    setNewImages(updatedImages);
  };

  const removeExistingImage = (index, imageUrl) => {
    const updatedImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(updatedImages);
    setImagesToDelete([...imagesToDelete, imageUrl]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();

      data.append("galeri", new Blob([JSON.stringify(formData)], {
        type: "application/json"
      }));

      newImages.forEach((file) => {
        if (file) {
          data.append("files", file);
        }
      });

      data.append("imagesToDelete", JSON.stringify(imagesToDelete));

      const response = await axios.put(
        `${API_DUMMY}/api/galeri/put/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengupdate Data galery",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-galery");
      }
    } catch (error) {
      console.error("Error updating gallery:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Mengupdate Data",
        text: error.response?.data?.message || "Terjadi kesalahan",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsSubmitting(false);
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
                  <h1 className="fs-4">Form Edit Galeri</h1>
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
                          required
                        />
                      </div>
                      <div className="mb-3 col-lg-12">
                        <label className="form-label font-weight-bold">
                          Kategori
                        </label>
                        <input
                          name="judul"
                          value={formData.judul}
                          onChange={handleInputChange}
                          type="text"
                          className="form-control"
                          required
                        />
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
                          rows="4"
                        ></textarea>
                      </div>

                      {/* Existing Images */}
                      <div className="mb-3 col-lg-12">
                        <label className="form-label font-weight-bold">
                          Gambar Galeri
                        </label>
                        {existingImages.length > 0 ? (
                          <div className="row">
                            {existingImages.map((imageUrl, index) => (
                              <div className="col-md-3 mb-3" key={index}>
                                <div className="card">
                                  <img
                                    src={imageUrl}
                                    className="card-img-top"
                                    alt={`Galeri ${index}`}
                                    style={{ height: "150px", objectFit: "cover" }}
                                  />
                                  <div className="card-body p-2">
                                    <button
                                      type="button"
                                      className="btn-danger btn-sm w-100"
                                      onClick={() => removeExistingImage(index, imageUrl)}
                                    >
                                      Hapus
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted">Tidak ada gambar</p>
                        )}
                      </div>

                      {/* New Images */}
                      <div className="mb-3 col-lg-12">
                        <label className="form-label font-weight-bold">
                          Tambah Gambar Baru
                        </label>
                        <div className="mb-3">
                          <button
                            type="button"
                            className="btn-primary mt-2"
                            onClick={addNewImageInput}
                            disabled={isSubmitting}
                          >
                            Tambah Gambar Baru
                          </button>
                        </div>
                        {newImages.map((file, index) => (
                          <div className="mb-3" key={`new-${index}`}>
                            <div className="d-flex align-items-center gap-2">
                              <input
                                className="form-control"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleNewFileChange(e, index)}
                              />
                              <button
                                type="button"
                                className="btn-danger"
                                onClick={() => removeNewImageInput(index)}
                                disabled={isSubmitting}
                              >
                                Hapus
                              </button>
                            </div>
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
                              </div>)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={() => history.push("/admin-galery")}
                        disabled={isSubmitting}
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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

export default EditGalery;