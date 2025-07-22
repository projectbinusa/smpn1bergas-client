import React, { useEffect, useRef, useState } from "react";
import FooterSekolah from "../../../component/FooterSekolah";
import "../../../css/berita/news.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import Slider from "react-slick";

function DetailKegiatan() {
    const [judul, setJudul] = useState("");
    const [image, setImage] = useState(0);
    const [date, setDate] = useState("");
    const [isi, setIsi] = useState("");
    const [foto, setFotos] = useState([]);

    const param = useParams();

    const getData = async () => {
        try {
            const response = await axios.get(`${API_DUMMY}/api/kegiatan/get/${param.id}`);
            const res = response.data.data;
            setJudul(res.judul);
            setIsi(res.isi);
            setDate(res.updatedDate);
            setImage(res.foto);
        } catch (error) {
            console.log("get all", error);
        }
    };

    const getFotoKegiatan = async () => {
        try {
            const response = await axios.get(`${API_DUMMY}/api/foto_kegiatan/all/by_id_kegiatan?id_kegiatan=${param.id}&page=0&size=20`);
            const res = response.data.data.content;
            setFotos(res);
        } catch (error) {
            console.log("get all", error);
        }
    };

    useEffect(() => {
        getData();
        getFotoKegiatan()
    }, []);

    const formatDate = (value) => {
        const date = new Date(value);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        const formattedDate = `${day} ${month} ${year}`;

        return formattedDate;
    };

    const PreviousArrow = ({ onClick }) => (
        <div
            style={{
                cursor: "pointer",
                position: "absolute",
                top: "50%",
                left: "-30px",
                transform: "translateY(-50%)",
                zIndex: 1,
            }}
            onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                width="30"
                height="30"
                viewBox="0 0 24 24">
                <path d="M15.41 7.41L10.83 12l4.58 4.59L14 18l-6-6 6-6z" />
            </svg>
        </div>
    );

    const NextArrow = ({ onClick }) => (
        <div
            style={{
                cursor: "pointer",
                position: "absolute",
                top: "50%",
                right: "-30px",
                transform: "translateY(-50%)",
                zIndex: 1,
                color: "black"
            }}
            onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                width="30"
                height="30"
                viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
        </div>
    );

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PreviousArrow />,
        arrows: true,
        draggable: true,
    };

    const sliderRef = useRef(null);

    return (
        <section>
            <NavbarSekolah2 />
            <main className="container-sapras container">
                <div className="header-sapras">
                    <ul>
                        <li><a href="/"><i className="fas fa-home"></i> Beranda</a></li>
                        <li><a href="/kegiatan"><i className="fas fa-angle-right"></i> <span style={{ fontWeight: "normal" }}>Kegiatan</span></a></li>
                        <li><i className="fas fa-angle-right"></i> <span style={{ fontWeight: "normal" }}>{judul}</span></li>
                    </ul>
                </div>
                <main className="container-detail-kegiatan">
                    <div style={{ position: "relative" }} className="mb-5">
                        {foto.length > 0 ? (
                            <Slider {...sliderSettings}>
                                <img src={image} />
                                {foto.map((row, idx) => (
                                    <img src={row.foto} key={idx} />
                                ))}
                            </Slider>
                        ) : (<img src={image} />)}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem" }}>
                        <h4 style={{ fontWeight: "700", color: "#002147", marginBottom: "1rem" }}>{judul}</h4>
                        <p style={{ color: "#002147" }}>{formatDate(date)}</p>
                    </div>
                    <hr />
                    <p>{isi}</p>
                </main>
            </main>
            <FooterSekolah />
        </section>
    )
}

export default DetailKegiatan;