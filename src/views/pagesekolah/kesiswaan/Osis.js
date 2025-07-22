import React, { useEffect, useState } from "react";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import FooterSekolah from "../../../component/FooterSekolah";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import { Pagination } from "@mui/material";
import Aos from "aos";

function Osis() {
  const [osis, setOsis] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOsisData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/api/osis/all/terbaru?page=${
            currentPage - 1
          }&size=5`
        );
        setOsis(response.data.data.content);
        setTotalPages(response.data.data.totalPages);
      } catch (error) {
        console.error("Error fetching OSIS data:", error);
      }
    };

    fetchOsisData();
    Aos.init();
  }, [currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const sectionStyle = {
    padding: "30px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Poppins', sans-serif",
    marginBottom: "2rem",
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#2c3e50",
    fontWeight: "bold",
    fontSize: "24px",
  };

  const textStyle = {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#34495e",
    marginBottom: "15px",
  };

  const listStyle = {
    listStyleType: "disc",
    paddingLeft: "15px",
    marginBottom: "20px",
  };

  const listItemStyle = {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#34495e",
    marginBottom: "8px",
  };

  const tableTitleStyle = {
    textAlign: "center",
    marginTop: "30px",
    marginBottom: "20px",
    color: "#2c3e50",
    fontWeight: "bold",
    fontSize: "20px",
  };

  const tableContainerStyle = {
    overflowX: "auto",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    borderRadius: "6px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const thStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    backgroundColor: "#3498db",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
    whiteSpace: "nowrap",
  };

  const tdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
    whiteSpace: "nowrap",
  };

  const noColumnStyle = {
    width: "5%",
  };

  const rowStyle = {
    backgroundColor: "#f9f9f9",
    transition: "background-color 0.3s",
  };

  const rowHoverStyle = {
    backgroundColor: "#e9ecef",
  };

  const imgStyle = {
    width: "40px",
    height: "40px",
    objectFit: "cover",
    borderRadius: "50%",
  };

  const noDataStyle = {
    textAlign: "center",
    padding: "15px",
    color: "#777",
    fontSize: "14px",
  };

  const paginationContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };

  return (
    <>
      <NavbarSekolah2 />
      <main className="container-berita container">
        <div className="header-berita" data-aos="fade-down">
          <ul>
            <li>
              <a href="/">
                <i class="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <i class="fas fa-angle-right"></i>
              <span style={{ fontWeight: "normal" }}> OSIS</span>
            </li>
          </ul>
        </div>
        <div style={sectionStyle} data-aos="fade-up">
          <h2 style={titleStyle}>Tentang OSIS</h2>
          <p style={textStyle}>
            OSIS atau Organisasi Siswa Intra Sekolah adalah suatu organisasi
            yang berada di tingkat sekolah di Indonesia, yang dimulai dari
            jenjang SMP dan SMA/SMK. OSIS dikelola oleh siswa yang terpilih
            untuk menjadi pengurus OSIS.
          </p>
          <p style={textStyle}>
            Anggota OSIS adalah seluruh siswa yang berada pada satu sekolah
            tempat OSIS itu berada. Seluruh anggota OSIS berhak untuk memilih
            calonnya untuk kemudian menjadi pengurus OSIS.
          </p>
          <p style={textStyle}>OSIS dibentuk dengan tujuan pokok:</p>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              Menghimpun ide, pemikiran, bakat, kreativitas, serta minat para
              siswa ke dalam salah satu wadah yang bebas dari berbagai macam
              pengaruh negatif dari luar sekolah.
            </li>
            <li style={listItemStyle}>
              Mendorong sikap, jiwa, dan semangat kasatuan dan persatuan di
              antara para siswa, sehingga timbul satu kebanggaan untuk mendukung
              peran sekolah sebagai tempat terselenggaranya proses belajar
              mengajar.
            </li>
            <li style={listItemStyle}>
              Sebagai tempat dan sarana untuk berkomunikasi, menyampaikan
              pemikiran, dan gagasan dalam usaha untuk mematangkan kemampuan
              berfikir, wawasan, dan pengambilan keputusan.
            </li>
          </ul>

          <h3 style={tableTitleStyle}>Anggota OSIS</h3>
          <div style={tableContainerStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, ...noColumnStyle }}>No</th>
                  <th style={thStyle}>Foto</th>
                  <th style={thStyle}>Nama</th>
                  <th style={thStyle}>Kelas</th>
                  <th style={thStyle}>Jabatan</th>
                  <th style={thStyle}>Tahun Jabatan</th>
                </tr>
              </thead>
              <tbody>
                {osis.length > 0 ? (
                  osis.map((osisItem, index) => (
                    <tr
                      key={osisItem.id}
                      style={rowStyle}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          rowHoverStyle.backgroundColor)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          rowStyle.backgroundColor)
                      }>
                      <td style={{ ...tdStyle, ...noColumnStyle }}>
                        {(currentPage - 1) * 5 + index + 1}
                      </td>
                      <td style={tdStyle}>
                        <img
                          src={osisItem.foto}
                          alt={osisItem.nama}
                          style={imgStyle}
                        />
                      </td>
                      <td style={tdStyle}>{osisItem.nama}</td>
                      <td style={tdStyle}>{osisItem.kelas}</td>
                      <td style={tdStyle}>{osisItem.jabatan}</td>
                      <td style={tdStyle}>
                        {osisItem.tahunJabat} - {osisItem.tahunTuntas}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={noDataStyle}>
                      Anggota OSIS Tidak Tersedia.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={paginationContainerStyle}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      </main>
      <FooterSekolah />
    </>
  );
}

export default Osis;
