import "../css/style.css";
import "../css/gabung.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_DUMMY } from "../utils/base_URL";

function FooterSekolah() {
  const [berita, setBerita] = useState([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [fax, setFax] = useState("");
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [isContactAvailable, setIsContactAvailable] = useState(true);

  const getAllSejarah = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/sejarah/all/terbaru?page=0&size=1`
      );
      const content = response.data.data.content[0]?.isi || "";
      const truncatedContent = content.length > 375 ? `${content.substring(0, 375)}...` : content;
      setJudul(response.data.data.content[0]?.judul || "Data tidak ditemukan");
      setIsi(truncatedContent);
    } catch (error) {
      console.log("Error fetching sejarah data:", error);
    }
  };

  useEffect(() => {
    getAllSejarah();
  }, []);

  const getAllKontak = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/kontak/all/terbaru?page=0&size=1`
      );
      const data = response.data.data.content[0] || {};

      const isDataAvailable = data.email || data.phone || data.fax || data.address;

      setIsContactAvailable(!!isDataAvailable);
      setEmail(data.email || "Email tidak tersedia");
      setPhone(data.phone || "Telepon tidak tersedia");
      setFax(data.fax || "Fax tidak tersedia");
      setAddress(data.address || "Alamat tidak tersedia");
    } catch (error) {
      console.log("Error fetching contact data:", error);
    }
  };

  useEffect(() => {
    getAllKontak();
  }, []);

  const getAllBerita = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/smpn1bergas/api/berita/by-category?category=Berita%20Sekolah&order=asc&page=0&size=4&sort=created_date`);
      setBerita(response.data.data.content);
    } catch (error) {
      console.log("Error fetching berita data:", error);
    }
  };

  useEffect(() => {
    getAllBerita();
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
    <>
      <footer
        className="footer-area bg-cover"
        style={{
          backgroundImage: `url('https://www.solverwp.com/demo/html/itechie/assets/img/bg/2.webp')`,
        }}
      >
        <div className="footer-menu container">
          <div style={{ width: "100%" }}>
            <div className="widget widget_about">
              <h4 className="widget-title" style={{ textTransform: "uppercase" }}>{judul}</h4>
              <div className="details">
                <p style={{ fontSize: "14px", textAlign: "justify" }}>
                  <div dangerouslySetInnerHTML={{ __html: isi }} />
                </p>
                <ul className="social-media d-none d-md-none d-lg-flex gap-2 mb-4">
                  <li>
                    <a
                      className="facebook"
                      href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="instagram"
                      href="https://www.instagram.com/osisspensagas"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="youtube"
                      href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div className="widget widget_subscribe">
              <h4 className="widget-title" style={{ textTransform: "uppercase" }}>Alamat</h4>
              <div className="details" style={{ fontSize: "14px" }}>
                {isContactAvailable ? (
                  <>
                    <p style={{ color: "white", textAlign: "left" }}>{address}</p>
                    <p style={{ color: "white", textAlign: "left" }}>Telepon (+62) {phone}</p>
                    <p style={{ color: "white", textAlign: "left" }}>E-mail {email}</p>
                    <p style={{ color: "white", textAlign: "left" }}>{fax}</p>
                  </>
                ) : (
                  <p style={{ color: "white", textAlign: "left" }}>Informasi Kontak Tidak Tersedia</p>
                )}
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div className="widget widget_news">
              <h4 className="widget-title" style={{ textTransform: "uppercase" }}>Berita Terbaru</h4>
              {berita.length > 0 ? (
                <div className="details card-container">
                  {berita.map(news => (
                    <div className="card" key={news.id}>
                      <div className="card-body berita ">
                        <a href={`/detail-news-${news.id}`} className="card-title">{news.judulBerita}</a>
                        <p className="card-date">{formatDate(news.createdDate)}</p>
                        <p className="card-content" style={{ fontSize: "14px" }}>
                          <div dangerouslySetInnerHTML={{ __html: news.isiBerita }} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontStyle: "italic", color: "white", fontSize: "0.9rem" }}>Berita Terbaru Tidak Tersedia</p>
              )}
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 align-self-center footer-media">
                <ul
                  className="social-media d-lg-none d-md-flex gap-2 mb-3"
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <li>
                    <a
                      className="facebook"
                      href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="instagram"
                      href="https://www.instagram.com/osisspensagas"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="youtube"
                      href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
                <p>© 2024. SMP Negeri 1 Bergas.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterSekolah;
