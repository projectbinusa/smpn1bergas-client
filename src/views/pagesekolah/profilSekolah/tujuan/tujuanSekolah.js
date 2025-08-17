import React, { useState, useEffect } from "react";
import NavbarSekolah2 from "../../../../component/NavbarSekolah2";
import FooterSekolah from "../../../../component/FooterSekolah";
import { API_DUMMY } from "../../../../utils/base_URL";
import axios from "axios";
import Aos from "aos";
import { Link } from "react-router-dom";

function TujuanSekolah() {
  const [content, setContent] = useState({
    tujuan: [],
    sasaran: [],
    analisis: [],
    judul: "Tujuan dan Sasaran Sekolah"
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisiMisiData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/api/visiMisi/all`
        );
        console.log("API Response:", response.data);
        const data = response.data.data.content[0] || {};
        setContent({
          tujuan: data.tujuan || "Data tidak tersedia",
          analisis: data.analisis_lingkungan_internal || "Data tidak tersedia",
          sasaran: data.sasaran_sekolah || "Data tidak tersedia",
        });
      } catch (error) {
        console.log("Error fetching visi misi data:", error);
      }
    };
    Aos.init();
    fetchVisiMisiData();
  }, []);


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
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
              <i className="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>Tujuan Sekolah</span>
            </li>
          </ul>
        </div>

        <div style={{ lineHeight: "1.8", textAlign: "justify" }}>
          <div style={{ margin: "0 auto 0", padding: "0" }} data-aos="fade-up">
            <h1 style={{ fontWeight: "bold", marginBottom: "30px", fontSize: "2em" }}>
              {content.judul}
            </h1>
            <hr style={{ borderColor: "#ccc", marginBottom: "30px" }} />

            {/* Tujuan Section */}
            <section style={{ marginBottom: "40px" }}>
              <h2 style={{ fontWeight: "bold", marginBottom: "20px", color: "#2c3e50" }}>
                Tujuan Sekolah
              </h2>

              <div style={{ paddingLeft: "15px" }}>
                <div style={{ marginBottom: "15px" }} dangerouslySetInnerHTML={{ __html: content.tujuan }}>
                </div>
              </div>
            </section>

            {/* Analisis Section */}
            <section style={{ marginBottom: "40px" }}>
              <h2 style={{ fontWeight: "bold", marginBottom: "20px", color: "#2c3e50" }}>
                Analisis Lingkungan Internal
              </h2>
              <p style={{ marginBottom: "20px" }}>
                Sedangkan faktor lingkungan internal yang sangat berpengaruh terhadap keberhasilan antara lain:
              </p>
              <div style={{ paddingLeft: "15px" }}>
                <div style={{ marginBottom: "15px" }} dangerouslySetInnerHTML={{ __html: content.analisis }}>
                </div>
              </div>
            </section>

            {/* Sasaran Section */}
            <section>
              <h2 style={{ fontWeight: "bold", marginBottom: "20px", color: "#2c3e50" }}>
                Sasaran Sekolah
              </h2>
              <div style={{ paddingLeft: "20px" }}>
                <div style={{ marginBottom: "15px" }} dangerouslySetInnerHTML={{ __html: content.sasaran }}>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <FooterSekolah />
    </div>
  );
}

export default TujuanSekolah;