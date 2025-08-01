import React from "react";
// import Header from "../../../../component/Header";
// import Sidebar from "../../../../component/Sidebar";
// import { API_DUMMY } from "../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Sidebar1 from "../../../../../../component/Sidebar1";


function EditFotoKegiatan() {
  const [image, setImage] = useState(null);
  const [idKegiatan, setIdKegiatan] = useState("");
  const [kegiatan, setKegiatan] = useState([]);
  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const ress = await axios.get(
          `${API_DUMMY}/api/kegiatan/get/` + param.id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const response = ress.data.data;
        if (response) {
          setIdKegiatan(response.id);
          setImage(response.foto || ""); // Menghindari error jika response.foto undefined
          console.log("foto-kegiatan : ", response.id);
        } else {
          console.error("Data kegiatan tidak ditemukan");
        }
      } catch (error) {
        console.log("Error fetching kegiatan:", error);
      }
    };

    fetchKegiatan();
    getKegiatan(); // Memanggil fungsi untuk mendapatkan semua kegiatan
  }, [param.id]); // Tambahkan dependensi param.id

  const getKegiatan = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/kegiatan/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setKegiatan(response.data.data.content);
      console.log(response.data.data.content);
    } catch (error) {
      console.error("Terjadi Kesalahan saat mengambil semua kegiatan", error);
    }
  };

  //edit pengumuman
  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id_kegiatan", idKegiatan);
    formData.append("file", image);

    await axios
      .put(
        `${API_DUMMY}/api/foto_kegiatan/put/` + param.id,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Foto Kegiatan",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-kegiatan");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1500);
      })
      .catch((error) => {
        if (error.ressponse && error.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        } else {
          console.log(error);
        }
      });
  };


  useEffect(() => {
    getKegiatan();
  }, []);

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
    <div style={{marginTop:"50px"}}
      className="page-content1 mb-3 app-main__outer"
      data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Edit Foto Kegiatan</h1>
                    <hr />
                    <form onSubmit={update}>
                      <div className="row">
                        <div className="mb-3 co-lg-6">
                          {/* a */}
                          <label className="form-label font-weight-bold">
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
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label  font-weight-bold ">
                            Kegiatan
                          </label>
                          <select
                            value={idKegiatan}
                            className="form-control"
                            aria-label="Small select example"
                            onChange={(e) => setIdKegiatan(e.target.value)}>
                            <option selected>Pilih Kegiatan</option>
                            {kegiatan.map((down) => {
                              return (
                                <option value={down.id}>{down.judul}</option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-kegiatan">
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

export default EditFotoKegiatan;
