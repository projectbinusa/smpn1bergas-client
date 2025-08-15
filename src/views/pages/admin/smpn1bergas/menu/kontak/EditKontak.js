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

function EditKontak() {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState(null);
  const [fax, setFax] = useState("");
  const [phone, setPhone] = useState("");
  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/kontak/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setEmail(response.email);
        setAddress(response.address);
        setFax(response.fax);
        setPhone(response.phone);
        console.log("kontak : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const update = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      address: address,
      fax: fax,
      phone: phone,
    };

    await axios
      .put(`${API_DUMMY}/api/kontak/put/` + param.id, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Kontak",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-kontak");
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
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow">
                <div className="card-body">
                  <h1 className="fs-4">Form Edit Kontak</h1>
                  <hr />
                  <form onSubmit={update}>
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
                    <button type="button" className="btn-danger mt-3 mr-3">
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="/admin-kontak">
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
    // </div>
  );
}

export default EditKontak;
