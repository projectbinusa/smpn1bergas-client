import React, { useEffect, useState } from "react";
import NavbarSekolah from "../../../../component/NavbarSekolah";
import FooterSekolah from "../../../../component/FooterSekolah";
import "../../../../css/berita/news.css";
import HeaderDetailBerita from "../HeaderDetailBerita"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/base_URL";
import NavbarSekolah2 from "../../../../component/NavbarSekolah2";
import news from "../../../../aset/smpn1bergas/News-rafiki.png";

function DetailAgenda() {
    const [judul, setJudul] = useState("");
    const [image, setImage] = useState(0);
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [isi, setIsi] = useState("");

    const param = useParams();

    const getData = async () => {
        try {
            const response = await axios.get(`${API_DUMMY}/api/berita/get/${param.id}`);
            const res = response.data.data;
            setJudul(res.judulBerita);
            setIsi(res.isiBerita);
            setAuthor(res.author);
            setDate(res.createdDate);
            setImage(res.image);
        } catch (error) {
            console.log("get all", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const formatDate = (value) => {
        const date = new Date(value);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        const formattedDate = `${day} ${month} ${year}`;

        return formattedDate;
    };

    return (
        <section>
            <NavbarSekolah2 />
            <main className="container-detail-berita container">
                <HeaderDetailBerita title={"Agenda"} header={judul} />
                <div style={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    overflow: "hidden",
                    borderRadius: "8px",
                    backgroundColor: "#f5f5f5"
                }}>
                    <img
                        src={image || news}
                        alt=""
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            backgroundColor: "#f5f5f5"
                        }}
                    />
                </div>

                <h4 style={{ fontWeight: "700", color: "#002147", marginTop: "2rem", marginBottom: "1rem" }}>{judul}</h4>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ color: "#002147" }}><i class="fas fa-user"></i> <span style={{ fontWeight: "600", paddingLeft: "0.5rem", textTransform: "uppercase" }}>{author}</span></p>
                    <p style={{ color: "#002147" }}>{formatDate(date)}</p>
                </div>
                <hr />
                <p><div dangerouslySetInnerHTML={{ __html: isi }} /></p>
            </main>
            <FooterSekolah />
        </section>
    )
}

export default DetailAgenda;