import React, { useEffect, useState, useRef } from "react";
import Footer from "../../component/FooterSekolah";
import { Typography, TextField, Button, Grid } from "@mui/material";
import "../../css/prestasi/card.css";
import AOS from "aos";
import axios from "axios";
import { API_DUMMY } from "../../utils/base_URL";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavbarSekolah from "../../component/NavbarSekolah";
import NavbarSekolah2 from "../../component/NavbarSekolah2";
import news from "../../aset/smpn1bergas/News-rafiki.png";
import user from "../../aset/smpn1bergas/user_df.jpg";
import banner from "../../aset/smpn1bergas/bg.jpg";
import Aos from "aos";
import ImageCard from "./berita/gambar/ImageCard";
import { Link } from "react-router-dom";

function Home() {
  const [scrollY, setScrollY] = useState(0);
  // const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  // const [isHovereds, setIsHovereds] = useState(false);
  const [isHoveredss, setIsHoveredss] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ===== PERBAIKAN 1: gambar dibuat proporsional dengan objectFit "cover" =====
  const imageStyle = {
    transform: `translateY(${scrollY * 0.5}px)`,
    position: "relative",
    width: "100%",
    height: "100vh",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
    overflow: "hidden",
  };

  const buttonStylesss = {
    display: "flex",
    width: "fit-content",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "10px 20px",
    fontSize: "16px",
    color: isHoveredss ? "#000" : "#fff",
    backgroundColor: isHoveredss ? "#fff" : "#003366",
    border: isHoveredss ? "2px solid #003366" : "2px solid #fff",
    borderRadius: "5px",
    textDecoration: "none",
    textAlign: "center",
    cursor: "pointer",
    marginTop: "40px",
    transition: "background-color 0.3s, color 0.3s, border 0.3s",
  };

  // ===== PERBAIKAN 2: tulisan judul dipindah ke atas-tengah =====
  const textOverlayStyle = {
    position: "absolute",
    top: "45%", // <-- ganti dari isMobile ? "90px" : "130px"
    left: "50%",
    transform: "translate(-50%, -50%)", // <-- tambahin -50% di Y biar pas center
    width: "90%",
    color: "white",
    fontSize: isMobile ? "28px" : "55px",
    fontWeight: "800",
    textAlign: "center",
    textTransform: "uppercase",
  };
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "1200px",
    margin: "0",
    left: "0",
    padding: "15px",
    alignItems: "left",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  const titleStyle = {
    fontWeight: "bold",
    textAlign: "left",
    margin: "20px 0px",
    fontFamily: "'Poppins', sans-serif",
  };

  const captchaTextStyle = {
    userSelect: "none",
    pointerEvents: "none",
    background: "black",
    color: "white",
    opacity: "0.1",
    padding: "3px",
    filter: "blur(0.5px)",
    userSelect: "none",
    pointerEvents: "none",
  };

  const inputContainerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    marginTop: "10px",
    flexWrap: "wrap",
    gap: "25px",
  };

  const inputFieldStyle = {
    flex: 1,
    marginTop: "10px",
  };

  const inputFieldStyles = {
    flex: 1,
    marginTop: isMobile ? "20px" : "10px",
  };

  const messageContainerStyle = {
    marginTop: "20px",
  };

  const buttonStyless = {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "medium",
    width: isMobile ? "40%" : "15%",
    color: isHovered ? "#000" : "#fff",
    backgroundColor: isHovered ? "#fff" : "#003366",
    border: isHovered ? "2px solid #003366" : "2px solid #fff",
    borderRadius: "5px",
    textDecoration: "none",
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background-color 0.3s, color 0.3s, border 0.3s",
  };

  useEffect(() => {
    AOS.init();
  }, []);

  // GET ALL BERITA TERBARU
  const [berita, setBerita] = useState([]);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/berita/by-category?category=Berita%20Sekolah&order=asc&page=0&size=6&sort=created_date`,
      );
      setBerita(response.data.data.content);
      console.log(response.data.data.content);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  // GET ALL EKSTRAKURIKULER
  const [ekstrakurikuler, setEkstrakurikuler] = useState([]);

  const getAllEkskul = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/ekstrakulikuler/all/terbaru?page=0&size=8`,
      );
      setEkstrakurikuler(response.data.data.content);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllEkskul();
  }, []);

  // GET ALL GURU
  const [gurus, setGurus] = useState([]);

  const getAllGuru = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/guru/all/terbaru?page=0&size=20`,
      );
      setGurus(response.data.data.content);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllGuru();
  }, []);

  // GET ALL ALUMNI
  const [alumnus, setAlumnus] = useState([]);

  const getAllAlumni = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/alumni/all/terbaru?page=0&size=6`,
      );
      setAlumnus(response.data.data.content);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllAlumni();
  }, []);

  // GET ALL PRESTASI
  const [prestasi, setPrestasi] = useState([]);

  const getAllPrestasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/prestasi/all/terbaru?page=0&size=6`,
      );
      setPrestasi(response.data.data.content);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllPrestasi();
  }, []);

  // GET ALL KONTAK
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [fax, setFax] = useState("");

  const getAllKontak = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/kontak/all/terbaru?page=0&size=1`,
      );
      setEmail(response.data.data.content[0].email);
      setPhone(response.data.data.content[0].phone);
      setFax(response.data.data.content[0].fax);
      setAddress(response.data.data.content[0].address);
      console.log(response.data.data.content[0]);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllKontak();
  }, []);

  const [sambutan, setSambutan] = useState("");
  const [fotoKepsek, setFotoKepsek] = useState("");
  const [namaKepsek, setNamaKepsek] = useState("");

  const getAllSambutan = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/sambutan/all/terbaru?page=0&size=1`,
      );
      const res = response.data.data.content[0];
      setSambutan(res.isi || "");
      setFotoKepsek(res.foto || "");
      setNamaKepsek(res.nama || "");
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllSambutan();
  }, []);

  const hasData = namaKepsek && sambutan;

  const [email1, setEmail1] = useState("");
  const [namaPengirim, setNamaPengirim] = useState("");
  const [pesan, setPesan] = useState("");
  const [telp, setTelp] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateCaptcha = () => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    setGeneratedCaptcha(captcha);
    if (isLocked) {
      setCaptcha(captcha);
    } else {
      setCaptcha("");
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (isLocked) {
      if (captcha === "") {
        setCaptcha(generatedCaptcha);
      }
    } else {
      setCaptcha("");
    }
  }, [isLocked, generatedCaptcha]);

  const add = async (e) => {
    e.preventDefault();

    if (captcha !== generatedCaptcha) {
      Swal.fire({
        icon: "error",
        title: "Captcha Salah",
        text: "Harap masukkan CAPTCHA yang benar.",
      });
      return;
    }

    const data = {
      email: email1,
      nama: namaPengirim,
      pesan: pesan,
      tlp: telp,
    };

    try {
      await axios.post(`${API_DUMMY}/api/kotak_saran/add`, data);
      Swal.fire({
        icon: "success",
        title: "Kotak Masuk Berhasil Terkirim",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const scrollToId = sessionStorage.getItem("scrollToId");
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      element.scrollIntoView({ behavior: "smooth" });
      sessionStorage.removeItem("scrollToId");
    }
  }, []);

  // GALERY

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    getAllGalery(pageNumber);
  };

  // GET ALL GALERY
  const [galery, setGalery] = useState([]);
  const [totalPages, setTotalPage] = useState(1);

  const getAllGalery = async (page = 1) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/galeri/all/terbaru?page=${page - 1}&size=20`,
      );
      setGalery(response.data.data.content);
      console.log("galeri: ", response.data.data.content);
      setTotalPage(response.data.data.totalPages);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllGalery(currentPage);
    Aos.init();
  }, [currentPage]);

  return (
    <div style={{ backgroundColor: "#f5f5f5", overflow: "hidden" }}>
      <NavbarSekolah2 />
      <div
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <img src={banner} style={imageStyle} alt="" />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <div style={textOverlayStyle}>
          <p style={{ color: "white", margin: 0 }}>SMPN 1 Bergas</p>
        </div>
      </div>

      {/* BERITA */}
      <div class="blog-area  pd-top-115 pd-bottom-60">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-6 col-lg-7 col-md-10">
              <div class="section-title text-center" data-aos="fade-down">
                <h5 class="sub-title double-line" style={{ color: "black" }}>
                  Berita Terbaru
                </h5>
                <p class="content">
                  Informasi terkini seputar aktivitas siswa, pengumuman resmi,
                  hingga agenda pendidikan di SMPN 1 Bergas
                </p>
              </div>
            </div>
          </div>
          <div data-aos="fade-up" class="row justify-content-center">
            {berita.length === 0 ? (
              <div className="col-12">
                <p
                  style={{
                    textAlign: "center",
                    fontStyle: "italic",
                    color: "white",
                    fontSize: "1.2rem",
                  }}>
                  Berita Tidak Tersedia.
                </p>
              </div>
            ) : (
              berita.map((data) => (
                <div className="col-lg-4 col-md-6" key={data.id}>
                  <div className="single-blog-inner style-2">
                    <div className="thumb">
                      <img
                        src={data.image ? data.image : news}
                        alt={data.judulBerita || "Berita"}
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "contain",
                          borderRadius: "8px 8px 0 0",
                          display: "block",
                          backgroundColor: "#f5f5f5"
                        }}
                      />
                    </div>
                    <div className="details">
                      <h4
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                        <Link to={`/detail-news-${data.id}`}>
                          {data.judulBerita}
                        </Link>
                      </h4>
                      <ul className="blog-meta">
                        <li>
                          <i className="far fa-user"></i> By {data.author}
                        </li>
                        <li>
                          <i className="far fa-calendar-alt"></i>{" "}
                          {data.created_date}
                        </li>
                      </ul>
                      <p
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                        <div
                          dangerouslySetInnerHTML={{ __html: data.isiBerita }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* PRESTASI */}
      <div class="project-area bg-blue pd-top-115 pd-bottom-90">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div
                data-aos="fade-down"
                class="section-title style-white text-center">
                <h5 class="sub-title double-line">Prestasi Unggulan</h5>
                <h2 class="title">Temui Para Juara Kami</h2>
                <p class="content">
                  Kami terus mengukir prestasi di berbagai bidang, dengan
                  dedikasi dan kerja keras, kami siap untuk terus berkembang dan
                  mencapai yang terbaik.
                </p>
              </div>
            </div>
          </div>
          <div className="container-grid" data-aos="fade-up">
            {prestasi.map((item) => (
              <div class="card item" key={item.id}>
                <div class="single-project-inner style-two">
                  <div class="thumb">
                    {item.foto !== null ? (
                      <img src={item.foto} alt="img" />
                    ) : (
                      <img
                        src="https://lh5.googleusercontent.com/p/AF1QipPiTYMPukmrWn57NP0O_90hGlAwYH1dxd-Tv39r=w2048-h2048-k-no"
                        alt="img"
                      />
                    )}
                  </div>
                  <div class="details-wrap">
                    <h3>{item.judul}</h3>
                    <Link to={`/detail-prestasi-${item.id}`}>
                      SELENGKAPNYA <i class="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GURU */}
      <div
        className="team-area pd-top-115 pd-bottom-90"
        style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6" data-aos="fade-down">
              <div className="section-title style-white text-center">
                <h5
                  className="sub-title double-line"
                  style={{ color: "black" }}>
                  Guru
                </h5>
                <h2 className="title" style={{ color: "black" }}>
                  Bertemu dengan Guru Kami
                </h2>
                <p className="content" style={{ color: "black" }}>
                  Para guru kami adalah profesional yang berdedikasi. Dengan
                  pengalaman dan keahlian yang luas, mereka siap membimbing
                  setiap siswa menuju kesuksesan.
                </p>
              </div>
            </div>
          </div>

          <div className="row" data-aos="fade-up">
            {gurus.length > 0 ? (
              gurus.slice(0, 6).map((item) => (
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
                    className="custom-card">
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
                        }}>
                        {item.nama_guru}
                      </div>
                    </div>

                    <p
                      style={{
                        margin: "12px 0",
                        fontSize: "14px",
                        color: "#777",
                      }}>
                      {item.mapel || "-"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Data Guru Tidak Tersedia</p>
              </div>
            )}
          </div>
          <div className="row mt-4" data-aos="fade-up">
            <div className="col text-center">
              <Link
                to="/guru-all"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#003366",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  fontWeight: "600",
                }}>
                Tampilkan Semua Guru
              </Link>
            </div>
          </div>
          <style>
            {`.custom-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12);
              }
            `}
          </style>
        </div>
      </div>

      {/* GALERI */}
      <div className="team-area pd-top-115 pd-bottom-90 bg-blue">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6" data-aos="fade-down">
              <div className="section-title style-white text-center">
                <h5 class="sub-title double-line" style={{ color: "white" }}>
                  Galeri Foto
                </h5>
                <h2 class="title" style={{ color: "white" }}>
                  Kumpulan Kenangan Kami
                </h2>
                <p class="content" style={{ color: "white" }}>
                  Dokumentasi berbagai kegiatan sekolah yang penuh semangat dan
                  kebersamaan, mulai dari pembelajaran hingga acara spesial.
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-4" data-aos="fade-up">
            {galery.length > 0 ? (
              galery.slice(0, 6).map((item) => (
                <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                  <div className="card h-100 border-0 shadow-sm">
                    <div
                      style={{
                        height: "250px",
                        overflow: "hidden",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}>
                      <img
                        src={item.foto || ""}
                        alt={item.nama_kegiatan || item.judul}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="card-body text-center">
                      <h6
                        className="mb-0"
                        style={{ fontWeight: "600", color: "#003366" }}>
                        {item.nama_kegiatan}
                      </h6>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Data Galeri Tidak Tersedia</p>
              </div>
            )}
          </div>

          <div className="row mt-4" data-aos="fade-up">
            <div className="col text-center">
              <Link
                to="/galery"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#003366",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  fontWeight: "600",
                }}>
                Tampilkan Semua Galeri
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div class="client-area-area bg-base pt-5 pb-2">
        <div class="container">
          <div class="section-title style-white text-center">
            <h6 class="title">
              ` Pendidikan adalah kunci untuk membuka pintu dunia, tempat impian
              menjadi kenyataan dan pengetahuan menjadi kekuatan.`
            </h6>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;