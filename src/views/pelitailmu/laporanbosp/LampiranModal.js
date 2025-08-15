import React, { useState, useEffect } from "react";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import FooterSekolah from "../../../component/FooterSekolah";
import { API_DUMMY } from "../../../utils/base_URL";
import axios from "axios";
import Aos from "aos";
import { useParams } from "react-router-dom";

function LampiranModal() {
    const { laporanId, index } = useParams();
    const [imageUrl, setImageUrl] = useState("");
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [error, setError] = useState(null);

    const getLampiranDetail = async () => {
        try {
            const res = await axios.get(`${API_DUMMY}/api/laporanbosp/get/${laporanId}`);
            const data = res.data.data;
            setNama(data.nama);
            setDeskripsi(data.deskripsi);
            if (data.files && data.files.length > 0) {
                setImageUrl(data.files[index]); // Ambil hanya gambar yang diklik
            }
        } catch (error) {
            setError(error);
            console.error("Error fetching lampiran:", error);
        }
    };

    useEffect(() => {
        getLampiranDetail();
        Aos.init();
    }, [laporanId, index]);

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
                            <span style={{ fontWeight: "normal" }}>{nama}</span>
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
                            {nama}
                        </h1>
                        <hr style={{ borderColor: "#ccc" }} />

                        {/* Deskripsi */}
                        <div
                            style={{
                                fontSize: "1.1em",
                                marginBottom: "20px",
                                textAlign: "justify",
                            }}
                            dangerouslySetInnerHTML={{ __html: deskripsi }}
                        />

                        {/* Foto yang diklik */}
                        {imageUrl && (
                            <div className="container mx-auto px-3 sm:px-4 md:px-6">
                                <img
                                    src={imageUrl}
                                    alt="Lampiran"
                                    className="mx-auto my-4 rounded-lg shadow-lg"
                                    style={{ maxWidth: "300px", height: "auto" }}
                                />

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
