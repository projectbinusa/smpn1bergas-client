import React, { useState, useEffect } from "react";
import axios from "axios";
import Aos from "aos";
import { API_DUMMY } from "../../../utils/base_URL";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import FooterSekolah from "../../../component/FooterSekolah";

function JenjangSMP() {
  const [sejarah, setSejarah] = useState({ judul: "", isi: "" });
  const [error, setError] = useState(null);

  const getAllSejarah = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/sejarah/all/terbaru?page=0&size=1`
      );
      const sejarahContent = response.data.data.content[0] || {};
      setSejarah({
        judul: sejarahContent.judul || "Data tidak tersedia",
        isi: sejarahContent.isi || "Data tidak tersedia",
      });
    } catch (error) {
      setError(error);
      console.log("Error fetching sejarah data:", error);
    }
  };

  useEffect(() => {
    getAllSejarah();
    Aos.init();
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
              <a href="/">
                <i className="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <i className="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>Jenjang SMP</span>
            </li>
          </ul>
        </div>
        <div style={{ lineHeight: "1.8", textAlign: "justify" }}>
          <div style={{ margin: "0 auto 0", padding: "0" }} data-aos="fade-up">
            {sejarah.judul === "Data tidak tersedia" ||
            sejarah.isi === "Data tidak tersedia" ? (
              <p
                style={{
                  fontSize: "1.1em",
                  textAlign: "center",
                  color: "#666",
                }}>
                Sejarah Tidak Tersedia.
              </p>
            ) : (
              <>
                <h1
                  style={{
                    fontWeight: "bold",
                    marginBottom: "30px",
                    fontSize: "2em",
                  }}>
                  {sejarah.judul}
                </h1>
                <hr style={{ borderColor: "#ccc" }} />
                <p
                  style={{
                    fontSize: "1.1em",
                    marginBottom: "20px",
                    textAlign: "justify",
                  }}>
                  <div dangerouslySetInnerHTML={{ __html: sejarah.isi }} />
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      <FooterSekolah />
    </div>
  );
}

export default JenjangSMP;
