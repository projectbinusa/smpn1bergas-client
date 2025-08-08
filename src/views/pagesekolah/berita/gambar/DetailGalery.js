import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NavbarSekolah2 from "../../../../component/NavbarSekolah2";
import FooterSekolah from "../../../../component/FooterSekolah";
import { API_DUMMY } from "../../../../utils/base_URL";
import Aos from "aos";

function DetailGalery() {
    const { id } = useParams();
    const [galeriDetail, setGaleriDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    const getDetailGalery = async () => {
        try {
            const res = await axios.get(`${API_DUMMY}/api/galeri/get/${id}`);
            setGaleriDetail(res.data.data);
        } catch (error) {
            console.error("Error fetching detail galeri:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDetailGalery();
        Aos.init();
    }, [id]);

    if (loading) {
        return <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

    if (!galeriDetail) {
        return <p style={{ textAlign: 'center' }}>Data tidak ditemukan.</p>;
    }

    return (
        <section>
            <NavbarSekolah2 />
            <main data-aos="fade-up" className="container-berita container">
                <h2 className="mb-4">{galeriDetail.judul}</h2>
                <p>{galeriDetail.deskripsi}</p>

                <div className="gallery-container mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galeriDetail.foto && JSON.parse(galeriDetail.foto).map((foto, idx) => (
                        <img
                            key={idx}
                            src={foto}
                            alt={`Foto ${idx + 1}`}
                            style={{ width: "100%", borderRadius: "8px" }}
                        />
                    ))}
                </div>

                <div style={{ textAlign: "center", margin: "30px 0" }}>
  <Link 
    to="/galery"
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "10px 22px",
      backgroundColor: "#4a6bff",
      color: "white",
      textDecoration: "none",
      borderRadius: "6px",
      fontWeight: "500",
      transition: "opacity 0.2s ease"
    }}
    onMouseEnter={(e) => e.target.style.opacity = "0.9"}
    onMouseLeave={(e) => e.target.style.opacity = "1"}
  >
    <span>Kembali</span>
  </Link>
</div>
            </main>
            <FooterSekolah />
        </section>
    );
}

export default DetailGalery;