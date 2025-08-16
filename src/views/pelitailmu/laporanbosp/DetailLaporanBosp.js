import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../component/FooterSekolah";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import "../../../css/prestasi/detailprestasi.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import ImageCard from "../../pagesekolah/berita/gambar/ImageCard";
import ImageCardLaporan from "./ImageCardLaporan";
import { Link } from "react-router-dom";

function DetailLaporanBosp() {
  const [files, setFiles] = useState([null]);
  const [deskripsi, setDeskripsi] = useState("");
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [loading, setLoading] = useState(true);

  const param = useParams();

  const fetchPrestasiDetail = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/laporanbosp/get/${param.id}`
      );
      console.log(response);
      const ress = response.data.data;
      setNama(ress.nama)
      setTanggal(ress.createdDate)
      setDeskripsi(ress.deskripsi)
      setFiles(ress.files)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrestasiDetail();
  }, []);

  const formatDate = (value) => {
    const date = new Date(value);

    const day = date.getDate();
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
  };

  return (
    <section>
      <NavbarSekolah2 />
      <main className="container-berita container">
        <div className="header-berita">
          <ul>
            <li>
              <Link to="/">
                <i className="fas fa-home"></i> Beranda
              </Link>
            </li>
            <li>
              <Link to="/laporanbosp">
                <i className="fas fa-angle-right"></i>{" "}
                <span style={{ fontWeight: "normal" }}>Laporan BOSP</span>
              </Link>
            </li>
            <li>
              <i className="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>{nama}</span>
            </li>
          </ul>
        </div>
        <div className="container-prestasi">
          {/* {foto === null ? (<></>) : (<img src={foto} alt={judul} />)} */}
          <h4
            style={{
              fontWeight: "700",
              color: "#002147",
            }}>
            {nama}
          </h4>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <p style={{ color: "#002147" }}>
              <i className="fas fa-user"></i>
              <span style={{ fontWeight: "600", paddingLeft: "0.5rem" }}>Admin</span>
            </p>
            <p style={{ color: "#002147" }}>{formatDate(tanggal)}</p>
          </div>
          <p><div dangerouslySetInnerHTML={{ __html: deskripsi }} /></p>
          <hr />
          <h5 style={{ fontWeight: "600", color: "#002147" }}>Lampiran</h5>
          {files.length > 0 ? (
            <div>
              <div className="laporanbosp-container mb-5">
                {files.map((url, index) => (
                  <Link
                    key={index}
                    to={`/laporanbosp/${param.id}/lampiran/${index}`}
                    style={{ display: "block" }}
                  >
                    <img
                      src={url}
                      alt={`Lampiran ${index + 1}`}
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        marginBottom: "10px"
                      }}
                    />
                  </Link>
                ))}
              </div>

            </div>
          ) : (
            <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#666' }}>
              Tidak ada lampiran
            </p>
          )}
        </div>
      </main>
      <FooterSekolah />
    </section>
  );
}

export default DetailLaporanBosp;
