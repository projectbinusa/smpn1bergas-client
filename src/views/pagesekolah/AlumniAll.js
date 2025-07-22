import React, { useEffect, useState } from "react";
import FooterSekolah from "../../component/FooterSekolah";
import NavbarSekolah2 from "../../component/NavbarSekolah2";
import { Pagination } from "@mui/material";
import "../../css/alumni/alumni.css";
import axios from "axios";
import { API_DUMMY } from "../../utils/base_URL";

function AlumniAll() {
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
        getAll(pageNumber);
    };

    const [data, setData] = useState([]);
    const [totalPages, setTotalPage] = useState(1);

    const getAll = async (page = 1) => {
        try {
            const response = await axios.get(`${API_DUMMY}/api/alumni/all/terbaru?page=${page - 1}&size=18`);
            setData(response.data.data.content);
            setTotalPage(response.data.data.totalPages);
        } catch (error) {
            console.log("get all", error);
        }
    };

    useEffect(() => {
        getAll(currentPage);
    }, [currentPage]);

    return (
        <main>
            <NavbarSekolah2 />
            <section className="container-alumni container">
                <div className='header-alumni'>
                    <ul>
                        <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
                        <li><i class="fas fa-angle-right"></i> <span style={{ fontWeight: "normal" }}>Alumni</span> </li>
                    </ul>
                </div>
                <div className="alumni-container">
                    {data.map(row => (
                        <div className='card-perpus'>
                            <img src={row.foto} alt={row.foto} />
                            <h5 style={{ textTransform: "uppercase" }}>{row.nama}</h5>
                            <h6>Lulus Tahun {row.tahunLulus}</h6>
                            <p className="isi-alumni" style={{ fontSize: "14px", marginTop: "1rem" }}>
                                <div
                                    dangerouslySetInnerHTML={{ __html: row.biografi }}
                                />
                            </p>
                            <a href={`/detail-alumni-${row.id}`}>Selengkapnya</a>
                        </div>
                    ))}
                </div>
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
            </section>
            <FooterSekolah />
        </main>
    )
}

export default AlumniAll;