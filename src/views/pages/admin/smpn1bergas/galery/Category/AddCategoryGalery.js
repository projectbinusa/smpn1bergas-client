import React, { useState } from "react";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Sidebar1 from "../../../../../../component/Sidebar1";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";


function AddCategoryGalery() {
  const [kategori, setKategori] = useState("");
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const history = useHistory();


  const toggleSidebar = () => setSidebarToggled(!sidebarToggled);

  const handleAdd = async () => {
    if (!kategori.trim()) {
      Swal.fire("Peringatan", "Kategori tidak boleh kosong!", "warning");
      return;
    }
    try {
      await axios.post(
        `${API_DUMMY}/api/category_galery/add`,
        { category: kategori },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      Swal.fire("Berhasil", "Kategori ditambahkan!", "success");
      history.push("/admin-category-galery");
    } catch (err) {
      Swal.fire("Error", "Gagal menambahkan kategori!", "error");
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
        <div className="container mt-3">
          <div className="card p-3">
            <h4>Tambah Kategori Galery</h4>
            <input
              type="text"
              className="form-control my-3"
              placeholder="Masukkan kategori..."
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
            />
            <div className="d-flex gap-2">
              <button className="btn-primary mt-3" onClick={handleAdd}>
                Simpan
              </button>
              <button className="btn-secondary mt-3" onClick={() => history.push("/admin-category-galery")}>
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryGalery;
