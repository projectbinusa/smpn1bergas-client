import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../../component/FooterSekolah";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/base_URL";
import "../../../../css/prestasi/detailprestasi.css";
import NavbarSekolah2 from "../../../../component/NavbarSekolah2";

function DetailPrestasi() {
  const [prestasi, setPrestasi] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPrestasiDetail = async () => {
    const id = window.location.pathname.split("/").pop();
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/prestasi/get/${id}`
      );
      setPrestasi(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrestasiDetail();
  }, []);

  // if (loading) return <div>Loading...</div>;

//   if (!prestasi) return <div>Error: Data tidak ditemukan</div>;

  const { foto, judul, nama_peserta, penyelenggara, skala, tanggal } = prestasi;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };

  return (
    <section>
      <NavbarSekolah2 />
      <main className="container-berita">
        <div className="header-berita">
          <ul>
            <li>
              <a href="/">
                <i className="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <a href="/all-prestasi">
                <i className="fas fa-angle-right"></i>{" "}
                <span style={{ fontWeight: "normal" }}>Prestasi</span>
              </a>
            </li>
            <li>
              <i className="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>{judul}</span>
            </li>
          </ul>
        </div>
        <div className="container-prestasi">
          {foto && <img src={foto} alt={judul} />}
          <h4
            style={{
              fontWeight: "700",
              color: "#002147",
              marginTop: "2rem",
              marginBottom: "1rem",
            }}>
            {judul}
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
              <span style={{ fontWeight: "600", paddingLeft: "0.5rem" }}>
                {nama_peserta}
              </span>
            </p>
            <p style={{ color: "#002147" }}>{formatDate(tanggal)}</p>
          </div>
          <p style={{ lineHeight: "1rem" }}>Skala: {skala}</p>
          {penyelenggara && penyelenggara.trim() !== "" && (
            <p style={{ lineHeight: "1rem" }}>Penyelenggara: {penyelenggara}</p>
          )}
        </div>
      </main>
      <FooterSekolah />
    </section>
  );
}

export default DetailPrestasi;
