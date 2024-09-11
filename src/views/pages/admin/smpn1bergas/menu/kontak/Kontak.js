import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Sidebar1 from "../../../../../../component/Sidebar1";
import idLocale from "date-fns/locale/id";
import { format } from "date-fns";

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
        `${API_DUMMY}/smpn1bergas/api/kontak/all/terbaru?page=0&size=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const res = response.data.data.content;
      setList(res);
      setEmail(res[0].email);
      setFax(res[0].fax);
      setPhone(res[0].phone);
      setId(res[0].id);
      setAddress(res[0].address);
      setUpdateDate(res[0].updateDate);
      setCreatedDate(res[0].createdDate);
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
          .delete(`${API_DUMMY}/smpn1bergas/api/kontak/` + id, {
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
    // <div
    //   className={`page-wrapper chiller-theme ${
    //     sidebarToggled ? "toggled" : ""
    //   }`}>
    //   <a
    //     id="show-sidebar"
    //     className="btn1 btn-lg"
    //     onClick={toggleSidebar}
    //     style={{ color: "white", background: "#3a3f48" }}>
    //     <i className="fas fa-bars"></i>
    //   </a>
    //   {/* <Header toggleSidebar={toggleSidebar} /> */}
    //   {/* <div className="app-main"> */}
    //   <Sidebar1 toggleSidebar={toggleSidebar} />
    //   <div className="page-content1" style={{ marginTop: "10px" }}>
    //     <div
    //       className="container box-table mt-3 app-main__outer"
    //       data-aos="fade-left">
    //       <div className="ml-2 row g-3 align-items-center d-lg-none d-md-flex rows-rspnv">
    //         <div className="col-auto">
    //           <label className="form-label mt-2">Rows per page:</label>
    //         </div>
    //         <div className="col-auto">
    //           <select
    //             className="form-select form-select-xl w-auto"
    //             onChange={handleRowsPerPageChange}
    //             value={rowsPerPage}>
    //             <option value={5}>5</option>
    //             <option value={10}>10</option>
    //             <option value={20}>20</option>
    //           </select>
    //         </div>
    //       </div>
    //       <div className="search">
    //         <input
    //           type="search"
    //           className="form-control widget-content-right w-100 mt-2 mb-2 d-lg-none d-md-block"
    //           placeholder="Search..."
    //           value={searchTerm}
    //           onChange={handleSearchChange}
    //         />
    //       </div>
    //       <div className="main-card box-tabel mb-3 card">
    //         <div className="card-header" style={{ display: "flex" }}>
    //           <p className="mt-3">Data Kontak</p>
    //           <div className="ml-2 row g-3 align-items-center d-lg-flex d-none d-md-none">
    //             <div className="col-auto">
    //               <label className="form-label mt-2">Rows per page:</label>
    //             </div>
    //             <div className="col-auto">
    //               <select
    //                 className="form-select form-select-sm"
    //                 onChange={handleRowsPerPageChange}
    //                 value={rowsPerPage}>
    //                 <option value={5}>5</option>
    //                 <option value={10}>10</option>
    //                 <option value={20}>20</option>
    //               </select>
    //             </div>
    //           </div>
    //           <div className="d-flex ml-auto gap-3">
    //             <input
    //               type="search"
    //               className="form-control widget-content-right w-75 d-lg-block d-none d-md-none"
    //               placeholder="Search..."
    //               value={searchTerm}
    //               onChange={handleSearchChange}
    //             />
    //             <div className="btn-actions-pane-right">
    //               <div role="group" className="btn-group-sm btn-group">
    //                 {list.length > 0 ? (
    //                   <>
    //                     <button
    //                       style={{ cursor: "not-allowed" }}
    //                       disabled
    //                       className="active btn-focus p-2 rounded">
    //                       Tambah Data
    //                     </button>
    //                   </>
    //                 ) : (
    //                   <>
    //                     <button className="active btn-focus p-2 rounded">
    //                       <a
    //                         style={{ color: "white", textDecoration: "none" }}
    //                         href="/add-kontak">
    //                         Tambah Data
    //                       </a>
    //                     </button>
    //                   </>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div
    //           className="table-responsive-3"
    //           style={{ overflowX: "auto", maxWidth: "100%" }}>
    //           <table className="align-middle mb-0 table table-borderless table-striped table-hover">
    //             <thead>
    //               <tr>
    //                 <th scope="col">No</th>
    //                 <th className="text-long">Email</th>
    //                 <th
    //                   scope="col"
    //                   className="text-left"
    //                   style={{ minWidth: "150px" }}>
    //                   Alamat
    //                 </th>
    //                 <th className="text-left">No Telephone</th>
    //                 <th className="text-left">Fax</th>
    //                 <th className="text-left">Aksi</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {filteredList.map((row, no) => {
    //                 return (
    //                   <tr key={no}>
    //                     <td data-label="No" className="">
    //                       {no + 1 + (currentPage - 1) * rowsPerPage}
    //                     </td>
    //                     <td data-label="Email" className="text-long">
    //                       {row.email}
    //                     </td>
    //                     <td data-label="Alamat" className="">
    //                       {row.address}
    //                     </td>
    //                     <td data-label="No Handphone / Telephone" className="">
    //                       {row.phone}
    //                     </td>
    //                     <td data-label="Fax" className="">
    //                       {row.fax}
    //                     </td>
    //                     <td data-label="Aksi">
    //                       <div className="aksi">
    //                         <button
    //                           type="button"
    //                           className="btn-primary btn-sm mr-2">
    //                           <a
    //                             style={{
    //                               color: "white",
    //                               textDecoration: "none",
    //                             }}
    //                             href={`/edit-kontak/${row.id}`}>
    //                             <i className="fa-solid fa-pen-to-square"></i>
    //                           </a>
    //                         </button>
    //                         <button
    //                           onClick={() => deleteData(row.id)}
    //                           type="button"
    //                           className="btn-danger btn-sm">
    //                           <i className="fa-solid fa-trash"></i>
    //                         </button>
    //                       </div>
    //                     </td>
    //                   </tr>
    //                 );
    //               })}
    //             </tbody>
    //           </table>
    //         </div>
    //         <div className="card-header mt-3 d-flex justify-content-center">
    //           <Pagination
    //             count={paginationInfo.totalPages}
    //             page={currentPage}
    //             onChange={(event, value) => {
    //               setCurrentPage(value);
    //               setPage(value);
    //             }}
    //             showFirstButton
    //             showLastButton
    //             color="primary"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {/* </div> */}
    // </div>

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
                  <div>
                    <button
                      type="button"
                      className="btn-primary btn-sm mr-2">
                      <a
                        style={{
                          color: "white",
                          textDecoration: "none",
                        }}
                        href={`/edit-kontak/${id}`}>
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
                      href="/add-kontak">
                      Tambah Data
                    </a>
                  </button>
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

export default Kontak;
