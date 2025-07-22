import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../../component/FooterSekolah";
import { Card, Container, Grid, Pagination, Typography } from "@mui/material";
import "../../../../views/pagesekolah/profilSekolah/staf/tenagaKependidikan.css";
import NavbarSekolah2 from "../../../../component/NavbarSekolah2";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/base_URL";
import Aos from "aos";

const TenagaKepndidkan = () => {
  const [guru, setGuru] = useState([]);
  const [page1, setPage1] = useState(1);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [rowsPerPage1, setRowsPerPage1] = useState(5);
  const [paginationInfo1, setPaginationInfo1] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [kry, setKry] = useState([]);
  const [namaGuru, setNamaGuru] = useState("");
  const [mapel, setMapel] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [img, setImg] = useState("");
  const [nip, setNip] = useState("");
  const [nama, setNama] = useState("");
  const [status, setStatus] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [foto, setFoto] = useState("");
  const [selectedDetail, setSelectedDetail] = useState(null);

  const getAllKependidikan = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/tenaga_kependidikan/all/terbaru?page=${page1 - 1
        }&size=${rowsPerPage1}`
      );
      setKry(response.data.data.content);
      console.log("data kry: ", response.data.data.content);
      setPaginationInfo1({
        totalPages: response.data.data.totalPages,
        totalElements: response.data.data.totalElements,
      });
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  const getById = async (id) => {
    axios
      .get(`${API_DUMMY}/api/guru/get/${id}`)
      .then((ress) => {
        const data = ress.data.data;
        console.log("guru", data, "id: ", id);
        setNamaGuru(data.nama_guru);
        setImg(data.foto);
        setNip(data.nip);
        setMapel(data.mapel);
        setPendidikan(data.pendidikan_terakhir);
        setSelectedDetail("guru");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getByIdKry = async (id) => {
    axios
      .get(`${API_DUMMY}/api/tenaga_kependidikan/get/${id}`)
      .then((ress) => {
        const data = ress.data.data;
        console.log("guru", data, "id: ", id);
        setNama(data.nama);
        setFoto(data.foto);
        setStatus(data.status);
        setJabatan(data.jabatan);
        setSelectedDetail("karyawan");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRowsPerPageChange1 = (event) => {
    setRowsPerPage1(parseInt(event.target.value, 10));
    setPage1(0);
  };

  const handleSearchChange1 = (event) => {
    setSearchTerm1(event.target.value);
    setPage1(0);
    setCurrentPage1(1);
  };

  const filteredList1 = kry.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm1.toLowerCase())
    )
  );

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/guru/all/terbaru?page=${page - 1
        }&size=${rowsPerPage}`
      );
      setGuru(response.data.data.content);
      console.log(response.data.data.content);
      setPaginationInfo({
        totalPages: response.data.data.totalPages,
        totalElements: response.data.data.totalElements,
      });
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
    setCurrentPage(1);
  };

  const filteredList = guru.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const [scrollY, setScrollY] = useState(0);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getAll();
    getAllKependidikan();
    Aos.init()
  }, [currentPage, currentPage1, searchTerm, searchTerm1]);

  const imageStyle = {
    transform: `translateY(${scrollY * 0.5}px)`,
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  };

  const textOverlayStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "55px",
    fontWeight: "800",
    textAlign: "center",
    textTransform: "uppercase",
  };

  const staffContainer = {
    // padding:
  };

  return (
    <div style={{overflow: "hidden"}}>
      <NavbarSekolah2 />
      <div className="container-berita container">
        <div className="header-berita" data-aos="fade-down">
          <ul>
            <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
            <li>
              <i class="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>Staff Sekolah</span>
            </li>
          </ul>
        </div>

        <Grid
          container
          spacing={2}
          className="container"
          style={{ marginRight: "auto", marginLeft: "auto", padding: "0" }}>
          <Grid xs={11} md={8} data-aos="fade-right">
            <div className="mt-5">
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                Tabel Guru
              </Typography>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                <input
                  type="search"
                  className="form-control mb-3 mb-md-0"
                  placeholder="Pencarian berdasarkan nama atau mapel"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ flex: "1" }}
                />
                <select
                  className="form-select ms-0 ms-md-3"
                  style={{ width: "120px" }}
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <div className="table-responsive">
                <table className="table" style={{ width: "100%" }}>
                  <thead style={{ background: "#003366", color: "white" }}>
                    <tr>
                      <th
                        style={{
                          background: "#003366",
                          color: "white",
                          width: "5%",
                        }}>
                        No
                      </th>
                      <th style={{ background: "#003366", color: "white" }}>
                        Nama Guru
                      </th>
                      <th style={{ background: "#003366", color: "white" }}>
                        Mapel{" "}
                      </th>
                      <th style={{ background: "#003366", color: "white" }}>
                        Detail{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredList.length > 0 ? (
                      filteredList.map((item, index) => (
                        <tr key={item.id}>
                          <td style={{ paddingRight: "0" }}>
                            {index + 1 + (currentPage - 1) * rowsPerPage}
                          </td>
                          <td>{item.nama_guru}</td>
                          <td>{item.mapel}</td>
                          <td>
                            <button
                              onClick={() => getById(item.id)}
                              type="button"
                              class="btn-warning  mr-2 btn-sm text-light">
                              <i class="fas fa-info-circle"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          Tidak ada data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <Pagination
                  count={paginationInfo.totalPages}
                  page={currentPage}
                  onChange={(event, value) => {
                    setCurrentPage(value);
                    setPage(value);
                  }}
                  color="primary"
                  shape="rounded"
                  style={{ marginBottom: "30px" }}
                  showFirstButton
                  showLastButton
                />
              </div>
              <Typography
                xs={{ marginTop: "30px" }}
                gutterBottom
                variant="h5"
                component="div"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  marginTop: "1rem",
                }}>
                Tabel Karyawan
              </Typography>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                <input
                  type="search"
                  className="form-control mb-3 mb-md-0"
                  placeholder="Pencarian berdasarkan nama atau status"
                  value={searchTerm1}
                  onChange={handleSearchChange1}
                  style={{ flex: "1" }}
                />
                <select
                  className="form-select ms-0 ms-md-3"
                  style={{ width: "120px" }}
                  value={rowsPerPage1}
                  onChange={handleRowsPerPageChange1}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <div className="table-responsive">
                <table className="table" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          width: "5%",
                          background: "#003366",
                          color: "white",
                        }}>
                        No
                      </th>
                      <th style={{ background: "#003366", color: "white" }}>
                        Name
                      </th>
                      <th style={{ background: "#003366", color: "white" }}>
                        Status
                      </th>
                      <th style={{ background: "#003366", color: "white" }}>
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredList1.length > 0 ? (
                      filteredList1.map((item, index) => (
                        <tr key={item.id}>
                          <td style={{ paddingRight: "0" }}>
                            {index + 1 + (currentPage - 1) * rowsPerPage}
                          </td>
                          <td>{item.nama}</td>
                          <td>{item.status}</td>
                          <td>
                            {" "}
                            <button
                              onClick={() => getByIdKry(item.id)}
                              type="button"
                              class="btn-warning  mr-2 btn-sm text-light">
                              <i class="fas fa-info-circle"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          Tidak ada data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-3">
                <Pagination
                  count={paginationInfo1.totalPages}
                  page={currentPage1}
                  onChange={(event, value) => {
                    setCurrentPage1(value);
                    setPage1(value);
                  }}
                  color="primary"
                  shape="rounded"
                  style={{ marginBottom: "30px" }}
                  showFirstButton
                  showLastButton
                />
              </div>
            </div>
          </Grid>

          <Card data-aos="fade-left"
          style={{marginBottom: "2rem", marginRight: "auto", marginLeft: "auto" }}
            // style={{ marginRight: "auto", marginLeft: "auto" }}
            xs={6}
            md={8}
            sx={{ maxWidth: 345 }}>
            {selectedDetail === "guru" ? (
              <Container style={{ marginTop: "19px" }}>
                <Typography
                  className="font-weight-bold"
                  variant="h5"
                  color="text.secondary"
                  style={{ fontFamily: "'Poppins', sans-serif", textAlign: 'center' }}>
                  Detail
                </Typography>
                <img
                  className="rounded-2 mt-3"
                  component="img"
                  style={{ width: "100%" }}
                  src={
                    img ||
                    "https://cdn3d.iconscout.com/3d/premium/thumb/profile-3d-icon-download-in-png-blend-fbx-gltf-file-formats--user-avatar-account-man-person-shopping-pack-e-commerce-icons-7190777.png"
                  }
                  alt="Profile"
                />
                <div className="mb-3 mt-3">
                  <label className="form-label font-weight-bold">Nama Guru</label>
                  <input
                    value={namaGuru}
                    type="text"
                    className="form-control w-full"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label font-weight-bold">
                    Mata Pelajaran
                  </label>
                  <input
                    value={mapel}
                    type="text"
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label font-weight-bold">NIP</label>
                  <input
                    value={nip}
                    type="text"
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label font-weight-bold">
                    Pendidikan
                  </label>
                  <input
                    value={pendidikan}
                    type="text"
                    className="form-control"
                    disabled
                  />
                </div>
              </Container>
            ) : selectedDetail === "karyawan" ? (
              <Container style={{ marginTop: "19px" }}>
                <Typography
                  className="font-weight-bold"
                  variant="h5"
                  color="text.secondary"
                  style={{ fontFamily: "'Poppins', sans-serif", textAlign: 'center' }}>
                  Detail
                </Typography>
                <img
                  className="rounded-2 mt-3"
                  component="img"
                  style={{ width: "100%" }}
                  src={
                    foto ||
                    "https://cdn3d.iconscout.com/3d/premium/thumb/profile-3d-icon-download-in-png-blend-fbx-gltf-file-formats--user-avatar-account-man-person-shopping-pack-e-commerce-icons-7190777.png"
                  }
                  alt="Profile"
                />
                <div className="mb-3 mt-3">
                  <label className="form-label font-weight-bold">Nama</label>
                  <input
                    value={nama}
                    type="text"
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label font-weight-bold">Jabatan</label>
                  <input
                    value={jabatan}
                    type="text"
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label font-weight-bold">Status</label>
                  <input
                    value={status}
                    type="text"
                    className="form-control"
                    disabled
                  />
                </div>
              </Container>
            ) : (
              <>
                <Container style={{ marginTop: "19px"}}>
                  <Typography
                    className="font-weight-bold"
                    variant="h5"
                    color="text.secondary"
                    style={{ fontFamily: "'Poppins', sans-serif", textAlign: "center" }}>
                    Detail
                  </Typography>
                  <img
                    component="img"
                    src={
                      "https://cdn3d.iconscout.com/3d/premium/thumb/profile-3d-icon-download-in-png-blend-fbx-gltf-file-formats--user-avatar-account-man-person-shopping-pack-e-commerce-icons-7190777.png"
                    }
                    alt="Profile"
                  />
                  <div className="mb-3">
                    <input type="text" className="form-control" disabled />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" disabled />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" disabled />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" disabled />
                  </div>
                </Container>
              </>
            )}
          </Card>
        </Grid>
      </div>
      <FooterSekolah />
    </div>
  );
};

export default TenagaKepndidkan;
