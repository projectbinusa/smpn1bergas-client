import React, { useState, useEffect } from "react";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import FooterSekolah from "../../../component/FooterSekolah";
import { API_DUMMY } from "../../../utils/base_URL";
import axios from "axios";
import Aos from "aos";
import { useParams } from "react-router-dom";

function LampiranModal() {
    const { id } = useParams();
    const [data, setData] = useState({ nama: "", deskripsi: "", files: [] });
    const [error, setError] = useState(null);

    const getLampiranDetail = async () => {
        try {
            const res = await axios.get(`${API_DUMMY}/api/laporanbosp/get/${id}`);
            setData({
                nama: res.data.data.nama,
                deskripsi: res.data.data.deskripsi,
                files: res.data.data.files || [],
            });
        } catch (error) {
            setError(error);
            console.log("Error fetching lampiran:", error);
        }
    };

    useEffect(() => {
        getLampiranDetail();
        Aos.init();
    }, [id]);

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
                            <a href="/laporanbosp">
                                <i className="fas fa-angle-right"></i> Laporan BOSP
                            </a>
                        </li>
                        <li>
                            <i className="fas fa-angle-right"></i>{" "}
                            <span style={{ fontWeight: "normal" }}>{data.nama}</span>
                        </li>
                    </ul>
                </div>

                <div style={{ lineHeight: "1.8", textAlign: "justify" }}>
                    <div style={{ margin: "0 auto", padding: "0" }} data-aos="fade-up">
                        <h1
                            style={{
                                fontWeight: "bold",
                                marginBottom: "30px",
                                fontSize: "2em",
                            }}
                        >
                            {data.nama}
                        </h1>
                        <hr style={{ borderColor: "#ccc" }} />

                        {/* Deskripsi */}
                        <div
                            style={{
                                fontSize: "1.1em",
                                marginBottom: "20px",
                                textAlign: "justify",
                            }}
                            dangerouslySetInnerHTML={{ __html: data.deskripsi }}
                        />

                        {/* Foto Lampiran */}
                        {data.files.length > 0 && (
                            <div className="container mx-auto px-3 sm:px-4 md:px-6">
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                        gap: "16px",
                                        marginTop: "20px",
                                    }}
                                >
                                    {data.files.map((url, index) => (
                                        <img
                                            key={index}
                                            src={url}
                                            alt={`Lampiran ${index + 1}`}
                                            className="mx-auto my-4 rounded-lg shadow-lg"
                                            style={{ maxWidth: "200px", height: "auto" }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <FooterSekolah />
        </div>
    );
}

export default LampiranModal;
