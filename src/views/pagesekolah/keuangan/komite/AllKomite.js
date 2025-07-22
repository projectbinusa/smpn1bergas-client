import React, { useEffect, useState } from "react";
import "../../../../css/keuangan/apbd.css";
import NavbarSekolah from "../../../../component/NavbarSekolah";
import CardKeuangan from "../CardKeuangan";
import FooterSekolah from "../../../../component/FooterSekolah";
import HeaderKeuangan from "../HeaderKeuangan";
import { Pagination } from "@mui/material";
import NavbarSekolah2 from "../../../../component/NavbarSekolah2";
import axios from "axios";
import { API_DUMMY } from '../../../../utils/base_URL';
import Aos from "aos";
import keuangan from "../../../../aset/smpn1bergas/Coins-rafiki.png"

function AllKomite() {
    const [currentPage, setCurrentPage] = useState(1);
    const [komite, setKomite] = useState([]);
    const [totalPages, setTotalPage] = useState(1);

    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
        getAllKomite(pageNumber);
    };

    const getAllKomite = async (page = 1) => {
        try {
            const response = await axios.get(`${API_DUMMY}/api/keuangan/category?category=Komite&order=asc&page=${page - 1}&size=5&sort=created_date`);
            setKomite(response.data.data.content);
            setTotalPage(response.data.data.totalPages);
        } catch (error) {
            console.log("get all", error);
        }
    };

    useEffect(() => {
        getAllKomite(currentPage);
        Aos.init()
    }, [currentPage]);

    return (
        <section>
            <NavbarSekolah2 />
            <main className="container-keuangan container">
                <HeaderKeuangan title={"Komite"} />
                <div className="container-apbd">
                    <div data-aos="fade-right">
                        <div>
                            <h5 style={{ fontWeight: "600", color: "#002147" }}>KATEGORI</h5>
                            <hr style={{ width: '30%', color: '#0060ff', border: '2px solid #0060ff' }} />
                            <ul className="category-keuangan">
                                <li><a href="/keuangan-bos">BOS</a></li>
                                <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                                <li><a href="/keuangan-apbd">APBD</a></li>
                                <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                                <li><a href="/keuangan-komite">Komite</a></li>
                            </ul>
                        </div>
                        <br />
                        <div>
                            <h5 style={{ fontWeight: "600", color: "#002147" }}>IKUTI KAMI</h5>
                            <hr style={{ width: '30%', color: '#0060ff', border: '2px solid #0060ff' }} />
                            <ul className="medsos-list">
                                <li><a href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295"
                                    target="_blank"
                                ><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="https://www.instagram.com/osisspensagas"
                                    target="_blank"
                                ><i class="fab fa-instagram"></i></a></li>
                                <li><a href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                                    target="_blank"
                                ><i class="fab fa-youtube"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="container-all" data-aos="fade-left">
                        {komite.map(newsItem => (
                            <CardKeuangan
                                key={newsItem.id}
                                fotoJudul={newsItem.fotoJudul ? newsItem.fotoJudul : keuangan}
                                id={newsItem.id}
                                judul={newsItem.judul}
                                isi={newsItem.isi}
                                link={"komite"}
                            />
                        ))}
                        <div className="d-flex justify-content-center align-items-center mt-3">
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                shape="rounded"
                                style={{ marginBottom: "30px" }}
                                showFirstButton
                                showLastButton
                            />
                        </div>
                    </div>
                </div>
            </main>
            <FooterSekolah />
        </section>
    )
}

export default AllKomite;
