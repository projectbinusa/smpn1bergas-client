import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Sidebar1 from "../../../../../../component/Sidebar1";

function DetailSejarah() {
  const [judul, setJudul] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [isi, setIsi] = useState("");
  const [id, setId] = useState(0);
  const [datas, setData] = useState([]);
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

  // get by id berita
  // useEffect(() => {
  //   axios
  //     .get(`${API_DUMMY}/api/sejarah/get/` + param.id, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((res) => {
  //       const list_data = res.data.data;
  //       setCreatedDate(list_data.createdDate);
  //       setUpdateDate(list_data.updatedDate);
  //       setJudul(list_data.judul);
  //       setIsi(list_data.isi);
  //     })
  //     .catch((error) => {
  //       alert("Terjadi Kesalahan " + error);
  //     });
  // }, [param.id]);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/sejarah/all/terbaru?page=0&size=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const res = response.data.data.content;
      setData(res);
      setCreatedDate(res[0].createdDate);
      setUpdateDate(res[0].updateDate);
      setIsi(res[0].isi);
      setJudul(res[0].judul);
      setId(res[0].id);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    getAll()
  }, [])

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
          .delete(`${API_DUMMY}/api/sejarah/` + id, {
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
          }).catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Hapus Data Gagal!",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(err)
          })
      }
    });
  };

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
                <h1 className="fw-bold fs-3">Sejarah Sekolah</h1>
                {datas.length > 0 ? (<>
                  <div>
                    <button
                      type="button"
                      className="btn-primary btn-sm mr-2">
                      <a
                        style={{
                          color: "white",
                          textDecoration: "none",
                        }}
                        href={`/edit-sejarah/${id}`}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </a>
                    </button>
                    <button
                      onClick={() => deleteData(id)}
                      type="button"
                      className="btn-danger btn-sm">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </>) : (<>
                  <button className="active btn-focus p-2 rounded">
                    <a
                      style={{ color: "white", textDecoration: "none" }}
                      href="/add-sejarah">
                      Tambah Data
                    </a>
                  </button>
                </>)}
              </div>
              <br />
              <div className="card-body">
                <div class="mb-3">
                  <label class="form-label fw-bold">Judul Sejarah</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={judul}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Isi Sejarah</label>
                  <div
                    className="form-control"
                    style={{ height: "auto", background: "#e9ecef" }}
                    dangerouslySetInnerHTML={{ __html: isi }}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal Dibuat</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={format(
                      new Date(createdDate || new Date()),
                      "dd MMMM yyyy",
                      { locale: idLocale }
                    )}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal Update</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={format(
                      new Date(updateDate || new Date()),
                      "dd MMMM yyyy",
                      { locale: idLocale }
                    )}
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

export default DetailSejarah;
