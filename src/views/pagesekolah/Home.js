import React, { useEffect, useState, useRef } from "react";
import Footer from "../../component/FooterSekolah";
import {
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import "../../css/prestasi/card.css";
import AOS from "aos";
import axios from "axios";
import { API_DUMMY } from "../../utils/base_URL";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavbarSekolah from "../../component/NavbarSekolah";
import NavbarSekolah2 from "../../component/NavbarSekolah2";
import news from "../../aset/smpn1bergas/News-rafiki.png"
import user from "../../aset/smpn1bergas/user_df.jpg"
import banner from "../../aset/slbcpelita/banner.png"
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

  const imageStyle = {
    transform: `translateY(${scrollY * 0.5}px)`,
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden"
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
        `${API_DUMMY}/api/berita/by-category?category=Berita%20Sekolah&order=asc&page=0&size=6&sort=created_date`
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
        `${API_DUMMY}/api/ekstrakulikuler/all/terbaru?page=0&size=8`
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
        `${API_DUMMY}/api/guru/all/terbaru?page=0&size=20`
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
        `${API_DUMMY}/api/alumni/all/terbaru?page=0&size=6`
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
        `${API_DUMMY}/api/prestasi/all/terbaru?page=0&size=6`
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
        `${API_DUMMY}/api/kontak/all/terbaru?page=0&size=1`
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
        `${API_DUMMY}/api/sambutan/all/terbaru?page=0&size=1`
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
        `${API_DUMMY}/api/galeri/all/terbaru?page=${page - 1
        }&size=20`
      );
      setGalery(response.data.data.content);
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
      {/* <div className="navbarrr">
        <NavbarSekolah />
      </div>
      <div className="navbarrr2">
        <NavbarSekolah2 />
      </div> */}
      <NavbarSekolah2 />
      <div
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <img
          src={banner}
          style={imageStyle}
          alt=""
        />
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
          <p style={{ color: "white" }}>SLB C PELITA ILMU</p>
        </div>
      </div>

      {/* <div className="about-area pd-top-90 pd-bottom-120">
        <div className="container">
          <div className="row">
            <div data-aos="fade-right" className="col-lg-6">
              <div className="mask-bg-wrap mask-bg-img-3">
                <img
                  style={{ borderRadius: "15px", width: "70%" }}
                  className="shape-image"
                  src={
                    fotoKepsek ||
                    "https://cdn3d.iconscout.com/3d/premium/thumb/profile-3d-icon-download-in-png-blend-fbx-gltf-file-formats--user-avatar-account-man-person-shopping-pack-e-commerce-icons-7190777.png"
                  }
                  alt="img"
                />
              </div>
            </div>
            <div data-aos="fade-left" className="col-lg-6 align-self-center">
              <div className="section-title px-lg-5 mb-0">
                <h5 className="sub-title left-border">
                  Sambutan Kepala Sekolah
                </h5>
                {namaKepsek ? (
                  <h2 className="title">{namaKepsek}</h2>
                ) : (
                  <p
                    className="title"
                    style={{ color: "#666", fontSize: "1rem", margin: 0 }}>
                    Sambutan kepala sekolah tidak tersedia
                  </p>
                )}
                <p
                  className="content mt-2 mb-2 isiBerita2"
                  style={{ color: hasData ? "inherit" : "gray" }}>
                  <div dangerouslySetInnerHTML={{ __html: sambutan }} />
                </p>
                {hasData && (
                  <>
                    <a href="/sambutan" style={{ fontWeight: "600" }}>
                      SELENGKAPNYA
                    </a>
                    <hr />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* BERITA */}
      <div class="blog-area  pd-top-115 pd-bottom-60">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-6 col-lg-7 col-md-10">
              <div
                class="section-title text-center"
                data-aos="fade-down">
                <h5 class="sub-title double-line" style={{ color: "black" }}>Berita Terbaru</h5>
                {/* <h2 class="title">Bertemu dengan Guru Kami</h2> */}
                <p class="content">Informasi terkini seputar aktivitas siswa, pengumuman resmi, hingga agenda pendidikan di SLB C Pelita Ilmu</p>
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
                      <img src={data.image ? data.image : news}
                        alt="img" className="news" />
                    </div>
                    <div className="details">
                      <h4 style={{
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
                <h5 class="sub-title double-line">
                  Prestasi Unggulan
                </h5>
                <h2 class="title">
                  Temui Para Juara Kami
                </h2>
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

      {/* EKSTRAKULIKULER */}
      {/* <div class="how-it-work-area bg-blue pd-top-110 pd-top-110">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div
                class="section-title style-white text-center"
                data-aos="fade-down">
                <h5 class="sub-title double-line">Ekstrakurikuler</h5>
                <h2 class="title">Cara Pelaksanaannya</h2>
                <p class="content">
                  Pelatihan dilakukan secara bertahap dan sistematis. Setiap
                  sesi dirancang untuk mengembangkan keterampilan peserta.
                  Kegiatan berlangsung dengan pendekatan yang interaktif dan
                  kolaboratif, memastikan setiap peserta mendapatkan pengalaman
                  belajar yang optimal.
                </p>
              </div>
            </div>
          </div>
          <div class="row" data-aos="fade-up">
            {ekstrakurikuler.map((data, index) => (
              <div class="col-lg-3 col-md-6">
                <div class="single-work-inner style-two text-center">
                  <div class="count-wrap">
                    <div class="count-inner">
                      <h2>{index + 1}</h2>
                    </div>
                  </div>
                  <div class="details-wrap">
                    <div class="details-inner">
                      <h4>{data.name}</h4>
                      <p
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                        {data.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>{" "}
          <div data-aos="fade-up">
            <Link
              href="/ekstrakurikuler"
              style={buttonStylesss}
              onMouseEnter={() => setIsHoveredss(true)}
              onMouseLeave={() => setIsHoveredss(false)}>
              Tampilkan Semua Ekstrakurikuler
            </Link>
          </div>
          <div class="client-slider pd-top-90 owl-carousel"></div>
        </div>
      </div> */}

      {/* GURU */}
      <div className="team-area pd-top-115 pd-bottom-90" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6" data-aos="fade-down">
              <div className="section-title style-white text-center">
                <h5 className="sub-title double-line" style={{ color: "black" }}>Guru</h5>
                <h2 className="title" style={{ color: "black" }}>Bertemu dengan Guru Kami</h2>
                <p className="content" style={{ color: "black" }}>
                  Para guru kami adalah profesional yang berdedikasi. Dengan pengalaman dan keahlian yang luas,
                  mereka siap membimbing setiap siswa menuju kesuksesan.
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
                          maxWidth: "100%"
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
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Data Guru Tidak Tersedia</p>
              </div>
            )}
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

      {/* ALUMNI */}
      {/* <div class="team-area bg-blue pd-top-90 pd-bottom-90">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div
                class="section-title style-white text-center"
                data-aos="fade-down">
                <h5 class="sub-title double-line">ALumni</h5>
                <h2 class="title">Bertemu dengan Alumni Kami</h2>
                <p class="content">
                  Jalin koneksi dengan alumni berprestasi yang telah mengukir
                  kesuksesan di berbagai bidang. Mereka siap berbagi pengalaman
                  dan inspirasi untuk generasi berikutnya.
                </p>
              </div>
            </div>
          </div>
          <div class="row" data-aos="fade-up">
            {alumnus.map((data) => (
              <div class="col-lg-3 col-md-6">
                <div class="single-team-inner style-4 text-center">
                  <div class="thumb alumni-thumb">
                    <img src={data.foto ? data.foto : user} alt="img" />
                  </div>
                  <div class="details-wrap">
                    <div class="details-inner">
                      <h4
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "white",
                          width: "200px",
                        }}>
                        <a>{data.nama}</a>
                      </h4>
                    </div>
                  </div>
                  <div class="hover-details-wrap">
                    <div
                      class="hover-details-inner"
                      style={{ padding: "0 1.5rem" }}>
                      <h4>
                        <a
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            color: "white",
                            textAlign: "justify",
                          }}
                          href={`/detail-alumni-${data.id}`}>
                          {data.nama}
                        </a>
                      </h4>
                      <p
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "white",
                          textAlign: "justify",
                        }}>
                        <div
                          dangerouslySetInnerHTML={{ __html: data.biografi }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div data-aos="fade-up">
            <Link
              href="/all-alumni"
              style={buttonStylesss}
              onMouseEnter={() => setIsHoveredss(true)}
              onMouseLeave={() => setIsHoveredss(false)}>
              Tampilkan Semua Alumni
            </Link>
          </div>
        </div>
      </div> */}
      {/* GALERI - Perbaikan tampilan agar tidak gepeng dan lebih modern */}
      <div className="team-area pd-top-115 pd-bottom-90 bg-blue">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6" data-aos="fade-down">
              <div className="section-title style-white text-center">
                <h5 class="sub-title double-line" style={{ color: "white" }}>
                  Galeri Foto
                </h5>
                <h2 class="title" style={{ color: "white" }}>Kumpulan Kenangan Kami</h2>
                <p class="content" style={{ color: "white" }}>
                  Dokumentasi berbagai kegiatan sekolah yang penuh semangat dan kebersamaan, mulai dari pembelajaran hingga acara spesial.
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-4" data-aos="fade-up">
            {galery.length > 0 ? (
              galery.slice(0, 6).map((item) => (
                <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                  <div className="card h-100 border-0 shadow-sm">

                    <div style={{ height: "250px", overflow: "hidden", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                      <img
                        src={JSON.parse(item.foto)[0]}
                        alt={item.nama_kegiatan || item.judul}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />

                    </div>
                    <div className="card-body text-center">
                      <h6 className="mb-0" style={{ fontWeight: "600", color: "#003366" }}>
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
                }}
              >
                Tampilkan Semua Galeri
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* KONTAK */}
      {/* <div className="contact-section-style">
        <section id="hubungi-kami" className="contact-section-style">
          <div class="section-title style-white text-center">
            <h5
              class="sub-title double-line"
              style={{ color: "black" }}
              data-aos="fade-down">
              Hubungi Kami
            </h5>
          </div>
          <Grid container spacing={3} className="container">
            <Grid item xs={12} md={6} data-aos="fade-right">
              <Typography
                variant="h5"
                gutterBottom
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                  fontFamily: "'Poppins', sans-serif",
                }}>
                Denah Lokasi
              </Typography>
              <iframe
                title="Location Map"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.547254951904!2d110.4257833236675!3d-7.178215195671886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70867ffa968b85%3A0x8fd0fe0f24112880!2s${address}!5e0!3m2!1sid!2sid!4v1725417582480!5m2!1sid!2sid`}
                style={{ width: "100%", height: "400px", border: "0" }}
                allowFullScreen=""
                loading="lazy"></iframe>
            </Grid>

            <Grid item xs={12} md={6} data-aos="fade-left">
              <Typography
                variant="h5"
                gutterBottom
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                  fontFamily: "'Poppins', sans-serif",
                }}>
                Kontak
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}>
                {email !== "" ? (
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{
                      display: "flex",
                      fontFamily: "'Poppins', sans-serif",
                    }}>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                      <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                    </svg>
                    <strong style={{ marginLeft: "8px" }}>:</strong>
                    <span style={{ marginLeft: "8px" }}>{email}</span>
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{
                      display: "flex",
                      fontFamily: "'Poppins', sans-serif",
                    }}>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                      <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                    </svg>
                    <strong style={{ marginLeft: "8px" }}>:</strong>
                    <span style={{ color: "gray", marginLeft: "8px" }}>
                      Email Tidak Tersedia
                    </span>
                  </Typography>
                )}

                {phone !== "" ? (
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{
                      display: "flex",
                      fontFamily: "'Poppins', sans-serif",
                    }}>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                    </svg>
                    <strong style={{ marginLeft: "8px" }}>:</strong>
                    <span style={{ marginLeft: "8px" }}>+62 {phone}</span>
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{
                      display: "flex",
                      fontFamily: "'Poppins', sans-serif",
                    }}>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                    </svg>
                    <strong style={{ marginLeft: "8px" }}>:</strong>
                    <span style={{ color: "gray", marginLeft: "8px", textAlign: "left" }}>
                      No. Telp Tidak Tersedia
                    </span>
                  </Typography>
                )}

                {fax !== "" ? (
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{
                      display: "flex",
                      fontFamily: "'Poppins', sans-serif",
                    }}>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M11 4a1 1 0 0 0-1 1v10h10.459l.522-3H16a1 1 0 1 1 0-2h5.33l.174-1H16a1 1 0 1 1 0-2h5.852l.117-.67v-.003A1.983 1.983 0 0 0 20.06 4H11ZM9 18c0-.35.06-.687.17-1h11.66c.11.313.17.65.17 1v1a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-1Zm-6.991-7a17.8 17.8 0 0 0 .953 6.1c.198.54 1.61.9 2.237.9h1.34c.17 0 .339-.032.495-.095a1.24 1.24 0 0 0 .41-.27c.114-.114.2-.25.254-.396a1.01 1.01 0 0 0 .055-.456l-.242-2.185a1.073 1.073 0 0 0-.395-.71 1.292 1.292 0 0 0-.819-.286H5.291c-.12-.863-.17-1.732-.145-2.602-.024-.87.024-1.74.145-2.602H6.54c.302 0 .594-.102.818-.286a1.07 1.07 0 0 0 .396-.71l.24-2.185a1.01 1.01 0 0 0-.054-.456 1.088 1.088 0 0 0-.254-.397 1.223 1.223 0 0 0-.41-.269A1.328 1.328 0 0 0 6.78 4H4.307c-.3-.001-.592.082-.838.238a1.335 1.335 0 0 0-.531.634A17.127 17.127 0 0 0 2.008 11Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <strong style={{ marginLeft: "8px" }}>:</strong>
                    <span style={{ marginLeft: "8px" }}>{fax}</span>
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{
                      display: "flex",
                      fontFamily: "'Poppins', sans-serif",
                    }}>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M11 4a1 1 0 0 0-1 1v10h10.459l.522-3H16a1 1 0 1 1 0-2h5.33l.174-1H16a1 1 0 1 1 0-2h5.852l.117-.67v-.003A1.983 1.983 0 0 0 20.06 4H11ZM9 18c0-.35.06-.687.17-1h11.66c.11.313.17.65.17 1v1a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-1Zm-6.991-7a17.8 17.8 0 0 0 .953 6.1c.198.54 1.61.9 2.237.9h1.34c.17 0 .339-.032.495-.095a1.24 1.24 0 0 0 .41-.27c.114-.114.2-.25.254-.396a1.01 1.01 0 0 0 .055-.456l-.242-2.185a1.073 1.073 0 0 0-.395-.71 1.292 1.292 0 0 0-.819-.286H5.291c-.12-.863-.17-1.732-.145-2.602-.024-.87.024-1.74.145-2.602H6.54c.302 0 .594-.102.818-.286a1.07 1.07 0 0 0 .396-.71l.24-2.185a1.01 1.01 0 0 0-.054-.456 1.088 1.088 0 0 0-.254-.397 1.223 1.223 0 0 0-.41-.269A1.328 1.328 0 0 0 6.78 4H4.307c-.3-.001-.592.082-.838.238a1.335 1.335 0 0 0-.531.634A17.127 17.127 0 0 0 2.008 11Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <strong style={{ marginLeft: "8px" }}>:</strong>
                    <span style={{ color: "gray", marginLeft: "8px" }}>
                      Fax Tidak Tersedia
                    </span>
                  </Typography>
                )}

                {address !== "" ? (
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{
                      display: "flex",
                      fontFamily: "'Poppins', sans-serif",
                    }}>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.577-.764 1.072 1.072 0 0 1-.182-.62A8.021 8.021 0 0 1 3.62 10.24 7.976 7.976 0 0 1 1.875 6.804a7.99 7.99 0 0 1 6.137-5.295c.2-.058.399-.106.597-.147a.969.969 0 0 1 .299-.011l.006.002ZM11.07 7.553a.5.5 0 0 1 .37-.683c.31-.085.639-.075.94.026.318.107.623.292.844.55a.5.5 0 0 1 .092.618l-1 2a.5.5 0 0 1-.866-.5l.815-1.627a.482.482 0 0 1 .127-.139ZM8 12a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1ZM7 8.585A.996.996 0 0 1 7.248 8H8v3a1 1 0 0 1-1 1h-.004a.995.995 0 0 1-.992-.891V9.415ZM13 9v4a1 1 0 0 1-1 1v-4a1 1 0 0 1 1-1Zm1-4.243a.5.5 0 0 1 .658-.237c.05.03.099.068.145.107.379.346.723.72 1.01 1.113a1.048 1.048 0 0 1 .16.305A4.477 4.477 0 0 1 14 8v1.58c0 .2-.017.4-.048.597.044.04.087.083.124.129a.5.5 0 0 1-.5.816.51.51 0 0 1-.228-.046A3.5 3.5 0 0 0 14 9.415V9a1 1 0 0 1-1-1v-.585ZM9.17 5.72a.999.999 0 0 1-.17-.176 1.001 1.001 0 0 1 .338-1.374 1.002 1.002 0 0 1 1.351.215l.825 1.2a.5.5 0 0 1 .032.497.51.51 0 0 1-.031.066l-1.05 2.2a.5.5 0 0 1-.745.122l-.18-.17a.502.502 0 0 1-.06-.672.479.479 0 0 1 .113-.135l1.307-1.935a.501.501 0 0 1 .716-.052c.278.278.438.648.438 1.041a.5.5 0 0 1-.315.415l-1.029.684c-.282.189-.432.487-.432.773a.5.5 0 0 1-.387.487.507.507 0 0 1-.452-.06l-.446-.447a1.019 1.019 0 0 1-.126-1.382Zm5.027-.98a.995.995 0 0 1 .87-.26.975.975 0 0 1 .507.164c.123.057.237.133.336.23a2.11 2.11 0 0 1 .368.295.492.492 0 0 1 .062.65l-.37.517a1.025 1.025 0 0 1-.225.171l-1.321.883a.492.492 0 0 1-.7-.228l-.493-.843a.501.501 0 0 1 .12-.694l1.068-.734a1.013 1.013 0 0 1 .647-.212Zm-.014-2.124a.5.5 0 0 1 .48.327.5.5 0 0 1-.106.603l-1.056 1.056a.5.5 0 0 1-.707-.707l.899-.9A.493.493 0 0 1 15.056 2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <strong style={{ marginLeft: "8px" }}>:</strong>
                    <span style={{ marginLeft: "8px", textAlign: "left" }}>{address}</span>
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{
                      display: "flex",
                      fontFamily: "'Poppins', sans-serif",
                    }}>
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <strong style={{ marginLeft: "8px" }}>:</strong>
                    <span style={{ color: "gray", marginLeft: "8px" }}>
                      Alamat Tidak Tersedia
                    </span>
                  </Typography>
                )}
              </div>
            </Grid>
          </Grid>
          <br /> <br />
          <form
            onSubmit={add}
            style={formStyle}
            className="container"
            data-aos="fade-up">
            <Typography variant="h5" gutterBottom style={titleStyle}>
              Kotak Saran
            </Typography>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginBottom: "5px",
              }}>
              <p style={{ margin: 0 }}>
                Kode Captcha:{" "}
                <span style={captchaTextStyle}>{generatedCaptcha}</span>
              </p>
              <Button
                type="button"
                onClick={generateCaptcha}
                disabled={isLocked}
                style={{ width: "3%", fontSize: "18px" }}>
                <i className="fa-solid fa-arrows-rotate"></i>
              </Button>
              <Button
                type="button"
                onClick={() => setIsLocked(!isLocked)}
                style={{ width: "3%", fontSize: "18px" }}>
                <i
                  className={`fa-solid ${isLocked ? "fa-lock" : "fa-unlock"
                    }`}></i>
              </Button>
            </div>

            <div style={inputContainerStyle}>
              <TextField
                style={{ ...inputFieldStyles }}
                label="Kode Captcha"
                variant="outlined"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                required
                disabled={isLocked}
              />
              <TextField
                style={{ ...inputFieldStyle }}
                label="Nama"
                variant="outlined"
                value={namaPengirim}
                onChange={(e) => setNamaPengirim(e.target.value)}
                required
              />
            </div>

            <div style={inputContainerStyle}>
              <TextField
                style={{ ...inputFieldStyles }}
                label="Email"
                type="email"
                variant="outlined"
                value={email1}
                onChange={(e) => setEmail1(e.target.value)}
                required
              />
              <TextField
                style={{ ...inputFieldStyle }}
                label="Nomor Telephon"
                type="number"
                variant="outlined"
                value={telp}
                onChange={(e) => setTelp(e.target.value)}
              />
            </div>

            <div style={messageContainerStyle}>
              <TextField
                style={{ ...inputFieldStyles, width: "100%" }}
                label="Pesan"
                variant="outlined"
                multiline
                rows={6}
                placeholder="Write your suggestions here..."
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              style={buttonStyless}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              Kirim
            </Button>
          </form>
        </section>
      </div> */}


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
