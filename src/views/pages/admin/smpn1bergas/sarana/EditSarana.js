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

function EditSarana() {
  const [namaSarana, setNamaSarana] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [category, setCategory] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const param = useParams();
  const [saranaList, setSaranaList] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/sarana/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setNamaSarana(response.nama_sarana);
        setDeskripsi(response.deskripsi);
        setCategory(response.category);
        console.log("sarana: ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //add
  const put = async (e) => {
    e.preventDefault();
    e.persist();
    const categoryExists = saranaList.some(
      (sarana) => sarana.category === category
    );

    // const saranaExists = saranaList.some(
    //   (sarana) => sarana.nama_sarana === namaSarana
    // );

    if (categoryExists) {
      Swal.fire({
        icon: "error",
        title: "Edit Data Gagal!",
        text: "Kategori Sudah Ada. Silakan Pilih Kategori Lain.",
        showConfirmButton: true,
      });
      return;
     }
    try {
      await axios.put(
        `${API_DUMMY}/api/sarana/put/` + param.id,
        {
          nama_sarana: namaSarana,
          deskripsi: deskripsi,
          category: category,
        },
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil Mengedit Data Sarana",
        showConfirmButton: false,
        timer: 1500,
      });
      // setTimeout(() => {
      history.push("/admin-sarana");
      //   window.location.reload();
      // }, 1500);
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
    }
  };

  useEffect(() => {
    AOS.init();
    axios
      .get(
        `${API_DUMMY}/api/sarana/all/terbaru?page=${
          page - 1
        }&size=${rowsPerPage}&sortBy=id&sortOrder=desc`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSaranaList(res.data.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div
          className="container mt-3 mb-3 app-main__outer"
          data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Update Data</h1>
                    <hr />
                    <form onSubmit={put}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Nama Sarana
                          </label>
                          <input
                            value={namaSarana}
                            onChange={(e) => setNamaSarana(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Sarana"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Deskripsi Sarana
                          </label>
                          <div className="">
                            <textarea
                              value={deskripsi}
                              onChange={(e) => setDeskripsi(e.target.value)}
                              className="form-control"
                              placeholder="Masukkan Deskripsi sarana"
                              id="floatingTextarea2"
                              rows="5"></textarea>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold ">
                            Kategori Sarana
                          </label>
                          <select
                            value={category}
                            className="form-control w-full"
                            aria-label="Small select example"
                            onChange={(e) => setCategory(e.target.value)}>
                            <option selected>Pilih Kategori Sarana</option>
                            <option value="Standar">Standar</option>
                            <option value="Ruang Kantor">Ruang Kantor</option>
                            <option value="Ruang Kelas">Ruang Kelas</option>
                            <option value="Ruang Laboratorium">
                              Ruang Laboratorium
                            </option>
                            <option value="Sarana Olahraga">
                              Sarana Olahraga
                            </option>
                            <option value="Sarana Ibadah">Sarana Ibadah</option>
                            <option value="Sarana Kesehatan">
                              Sarana Kesehatan
                            </option>
                            <option value="Perpustakaan">Perpustakaan</option>
                            <option value="Sarana Protokol Kesehatan">
                              Sarana Protokol Kesehatan
                            </option>
                          </select>
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-sarana">
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
        </div>
      </div>
    </div>
  );
}

export default EditSarana;
