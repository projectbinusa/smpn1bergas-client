import React, { useState, useEffect } from "react";
import axios from "axios";
import Aos from "aos";
import { API_DUMMY } from "../../../utils/base_URL";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import FooterSekolah from "../../../component/FooterSekolah";
import { useParams } from "react-router-dom/cjs/react-router-dom";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function JenjangSD() {
  const [jenjang, setJenjang] = useState({ nama_jenjang: "", description: "" });
  const [error, setError] = useState(null);
  const param = useParams()

  const getAlljenjang = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/jenjang/get/by-link/${param.link}`
      );
      const jenjangContent = response.data.data;
      setJenjang({
        nama_jenjang: jenjangContent.nama_jenjang || "Data tidak tersedia",
        description: jenjangContent.description || "Data tidak tersedia",
      });
    } catch (error) {
      setError(error);
      console.log("Error fetching jenjang data:", error);
    }
  };

  useEffect(() => {
    getAlljenjang();
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
              <span style={{ fontWeight: "normal" }}>{jenjang.nama_jenjang}</span>
            </li>
          </ul>
        </div>
        <div style={{ lineHeight: "1.8", textAlign: "justify" }}>
          <div style={{ margin: "0 auto 0", padding: "0" }} data-aos="fade-up">
            {jenjang.nama_jenjang === "Data tidak tersedia" ||
            jenjang.description === "Data tidak tersedia" ? (
              <p
                style={{
                  fontSize: "1.1em",
                  textAlign: "center",
                  color: "#666",
                }}>
                jenjang Tidak Tersedia.
              </p>
            ) : (
              <>
                <h1
                  style={{
                    fontWeight: "bold",
                    marginBottom: "30px",
                    fontSize: "2em",
                  }}>
                  {jenjang.nama_jenjang}
                </h1>
                <hr style={{ borderColor: "#ccc" }} />
                <p
                  style={{
                    fontSize: "1.1em",
                    marginBottom: "20px",
                    textAlign: "justify",
                  }}>
                  <div dangerouslySetInnerHTML={{ __html: jenjang.description }} />
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

export default JenjangSD;
