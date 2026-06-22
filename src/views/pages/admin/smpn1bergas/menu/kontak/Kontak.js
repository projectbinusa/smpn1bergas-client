import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Sidebar1 from "../../../../../../component/Sidebar1";
import idLocale from "date-fns/locale/id";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function Kontak() {
  const [list, setList] = useState([]);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState(null);
  const [fax, setFax] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState(0);
  const [createdDate, setCreatedDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/kontak/admin/all?page=0&size=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const res = response.data.data.content;
      console.log(res);
      if (res.length > 0) {
        setEmail(res[0].email);
        setFax(res[0].fax);
        setPhone(res[0].phone);
        setId(res[0].id);
        setAddress(res[0].address);
        setUpdateDate(res[0].updatedDate);
        setCreatedDate(res[0].createdDate);
        setList(res);
      }

    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  const deleteData = async (id) => {
    Swal.fire({
      title: "Apakah Anda Ingin Menghapus?",
      text: "Perubahan data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_DUMMY}/api/kontak/` + id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Dihapus!",
              showConfirmButton: false,
              timer: 1500,
            });

            getAll();

          });
      }
    });
  };

  useEffect(() => {
    getAll();
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
    <div className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
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
        <div className="container mt-3 mb-3 app-main__outer">
          <div className="box-tabel">
            <div className="card shadow w-100">
              <div className="title card-header d-flex justify-content-between">
                <h1 className="fw-bold fs-3">Kontak</h1>
                {list.length > 0 ? (<>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <Link
                      to={`/edit-kontak/${id}`}
                      style={{
                        width: "34px",
                        height: "34px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#0d6efd",
                        color: "#fff",
                        borderRadius: "8px",
                        textDecoration: "none",
                      }}
                      title="Edit"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>

                    <button
                      onClick={() => deleteData(id)}
                      type="button"
                      title="Hapus"
                      style={{
                        width: "34px",
                        height: "34px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#dc3545",
                        color: "#fff",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </>) : (<>
                  <Link
                    to="/add-kontak"
                    style={{
                      background: "#0d6efd",
                      color: "#fff",
                      textDecoration: "none",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <i className="fa-solid fa-plus"></i>
                    Tambah Data
                  </Link>
                </>)}
              </div>
              <br />
              <div className="card-body">
                <div class="mb-3">
                  <label class="form-label fw-bold">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={email}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">No Telephon</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={phone}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">FAX</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={fax}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Alamat</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={address}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal Dibuat</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    // value={format(
                    //   new Date(createdDate || new Date()),
                    //   "dd MMMM yyyy",
                    //   { locale: idLocale }
                    // )}
                    value={createdDate}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal Update</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    // value={format(
                    //   new Date(updateDate || new Date()),
                    //   "dd MMMM yyyy",
                    //   { locale: idLocale }
                    // )}
                    value={updateDate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kontak;
