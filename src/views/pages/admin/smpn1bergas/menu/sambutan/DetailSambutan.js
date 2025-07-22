import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Sidebar1 from "../../../../../../component/Sidebar1";


function DetailSAmbutan() {
  const [judulSambutan, setJudulSambutan] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [isiSambutan, setIsiSambutan] = useState("");
  const [nip, setNip] = useState("");
  const [nama, setNama] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState(0);
  const [data, setdatas] = useState([]);
  const param = useParams();

  // get by id berita
  // useEffect(() => {
  //   axios
  //     .get(`${API_DUMMY}/api/sambutan/get/` + param.id, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((res) => {
  //       const list_data = res.data.data;
  //       console.log("sambutan: ", res.data.data);
  //       setCreatedDate(list_data.createdDate);
  //       setUpdateDate(list_data.updatedDate);
  //       setJudulSambutan(list_data.judul);
  //       setIsiSambutan(list_data.isi);
  //       setNama(list_data.nama);
  //       setImage(list_data.foto);
  //       setNip(list_data.nip);
  //     })
  //     .catch((error) => {
  //       alert("Terjadi Kesalahan " + error);
  //     });
  // }, [param.id]);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/sambutan/all/terbaru?page=0&size=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const res = response.data.data.content;
      setdatas(res);
      setId(res[0].id);
      setCreatedDate(res[0].createdDate);
      setUpdateDate(res[0].updatedDate);
      setJudulSambutan(res[0].judul);
      setIsiSambutan(res[0].isi);
      setNama(res[0].nama);
      setImage(res[0].foto);
      setNip(res[0].nip);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    getAll()
  }, [])

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
          .delete(`${API_DUMMY}/api/sambutan/` + id, {
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

            setTimeout(() => {
              window.location.reload();
            }, 1500);
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
        <div className="container mt-3 mb-3 app-main__outer">
          <div className="box-tabel">
            <div className="card shadow w-100">
              <div className="title card-header d-flex justify-content-between">
                <h1 className="fw-bold fs-3">Sambutan</h1>
                {data.length > 0 ? (<>
                  <div>
                    <button
                      type="button"
                      className="btn-primary btn-sm mr-2">
                      <a
                        style={{
                          color: "white",
                          textDecoration: "none",
                        }}
                        href={`/edit-sambutan/${id}`}>
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
                      href="/add-sambutan">
                      Tambah Data
                    </a>
                  </button>
                </>)}
              </div>
              <br />
              <div className="card-body">
                {image === null ? (
                  <img
                    className="rounded-circle w-75 mr-auto ml-auto d-block"
                    src="https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"
                  />
                ) : (
                  <img
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="w-75 d-block mr-auto ml-auto"
                    src={image}
                  />
                )}
                <br />
                <br />
                <div class="mb-3">
                  <label class="form-label fw-bold">Judul Sambutan</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={judulSambutan}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Nama Kepala Sekolah</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={nama}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">NIP</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={nip}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Isi Sambutan</label>
                  <div
                    className="form-control"
                    style={{ height: "auto", background: "#e9ecef" }}
                    dangerouslySetInnerHTML={{ __html: isiSambutan }}
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

export default DetailSAmbutan;
