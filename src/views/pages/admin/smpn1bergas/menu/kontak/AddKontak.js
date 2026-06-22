import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Sidebar1 from "../../../../../../component/Sidebar1";
import { Link } from "react-router-dom";

function AddKontak() {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState(null);
  const [fax, setFax] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();

  //add
  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      email: email,
      address: address,
      fax: fax,
      phone: phone,
    };
    try {
      await axios.post(`${API_DUMMY}/api/kontak/add`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/admin-kontak");
    } catch (error) {
      if (error.ressponse && error.response.status === 401) {
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
                    <h1 className="fs-4">Form Tambah Kontak</h1>
                    <hr />
                    <form onSubmit={add}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Email
                          </label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            required
                            placeholder="Masukkan Email"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Fax
                          </label>
                          <input
                            value={fax}
                            onChange={(e) => setFax(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Fax"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Alamat
                          </label>
                          <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Alamat Sekolah Lengkap"></textarea>
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            No Handphone / Telephone
                          </label>
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="number"
                            className="form-control"
                            required
                            placeholder="Masukkan Nomor Handphone / Telephone"
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "20px",
                        }}>
                        <button
                          type="button"
                          onClick={() =>
                            (window.location.href = "/admin-kontak")
                          }
                          style={{
                            background: "#dc3545",
                            color: "#fff",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none",
                            fontWeight: "500",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}>
                          <i
                            className="fa-solid fa-arrow-left"
                            style={{ marginRight: "8px" }}
                          />
                          Batal
                        </button>
                        <button
                          type="submit"
                          style={{
                            background: "#0d6efd",
                            color: "#fff",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none",
                            fontWeight: "500",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            minWidth: "120px",
                          }}>
                          <>
                            <i
                              className="fa-solid fa-paper-plane"
                              style={{ marginRight: "8px" }}
                            />
                            Submit
                          </>
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
    </div>
  );
}

export default AddKontak;
