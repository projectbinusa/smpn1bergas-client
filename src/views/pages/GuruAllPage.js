import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../utils/base_URL";
import axios from "axios";
import NavbarSekolah2 from "../../component/NavbarSekolah2";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import Aos from "aos";
import FooterSekolah from "../../component/FooterSekolah";

function GuruAllPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([]);
  const [totalPages, setTotalPage] = useState(1);

  const pageSize = 9;

  const getAllGalery = async (page = 1) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/guru/all/terbaru?page=${page - 1}&size=${pageSize}`
      );
      setList(response.data.data.content);
      setTotalPage(response.data.data.totalPages);
    } catch (error) {
      console.log("get all", error);
    }
  };

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getAllGalery(currentPage);
    Aos.init();
  }, [currentPage]);

  return (
    <section>
      <NavbarSekolah2 />
      <main data-aos="zoom-in" className="container-berita container">
        <div className="header-berita">
          <ul>
            <li>
              <Link to="/">
                <i className="fas fa-home"></i> Beranda
              </Link>
            </li>
            <li>
              <i className="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>Guru</span>
            </li>
          </ul>
        </div>
        <div className="row" data-aos="fade-up">
          {list.length > 0 ? (
            <>
              {list.map((item) => (
                <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "10px",
                      overflow: "visible",
                      paddingBottom: "26px",
                      border: "1px solid #eef0f2",
                      boxShadow: "0 6px 18px rgba(15, 23, 42, 0.04)",
                      transition: "transform .25s ease, box-shadow .25s ease",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    className="custom-card"
                  >
                    <img
                      src={
                        item.foto ||
                        "https://cdn3d.iconscout.com/3d/premium/thumb/profile-3d-icon-7190777.png"
                      }
                      alt={item.nama_guru}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        marginTop: "10px",
                      }}
                    />

                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          position: "relative",
                          marginTop: "-20px",
                          background: "#003366",
                          color: "#ffffff",
                          fontWeight: 800,
                          fontSize: "1rem",
                          textTransform: "uppercase",
                          padding: "12px 28px",
                          borderRadius: "3px",
                          display: "inline-block",
                          boxShadow: "0 8px 18px rgba(0,0,0,0.10)",
                          letterSpacing: "0.6px",
                          whiteSpace: "nowrap",
                          wordBreak: "keep-all",
                          maxWidth: "100%",
                        }}
                      >
                        {item.nama_guru}
                      </div>
                    </div>

                    <p
                      style={{
                        margin: "12px 0",
                        fontSize: "14px",
                        color: "#777",
                      }}
                    >
                      {item.mapel || "-"}
                    </p>
                  </div>
                </div>
              ))}

              <div className="d-flex justify-content-center align-items-center mt-5">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  shape="rounded"
                  style={{ marginBottom: "30px" }}
                  showFirstButton
                  showLastButton
                />
              </div>
            </>
          ) : (
            <div className="col-12 text-center">
              <p>Data Guru Tidak Tersedia</p>
            </div>
          )}
        </div>
      </main>
      <FooterSekolah />
    </section>
  );
}

export default GuruAllPage;
