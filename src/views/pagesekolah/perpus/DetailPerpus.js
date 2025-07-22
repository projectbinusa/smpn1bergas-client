import React, { useEffect, useState } from "react";
import NavbarSekolah from "../../../component/NavbarSekolah";
import FooterSekolah from "../../../component/FooterSekolah";
import "../../../css/alumni/alumni.css";
import HeaderDetailPerpus from "./HeaderDetailPerpus";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";

function DetailPerpus() {
    const [nama, setNama] = useState("");
    const [image, setImage] = useState(0);
    const [sinopsis, setSinopsis] = useState("");
    const [tahun, setTahun] = useState("");
    const [pengarang, setPengarang] = useState("");

    const param = useParams();

    const getData = async () => {
        try {
            const response = await axios.get(`${API_DUMMY}/api/perpustakaan/get/${param.id}`);
            const res = response.data.data;
            setNama(res.nama_buku);
            setPengarang(res.pengarang);
            setSinopsis(res.sinopsis);
            setTahun(res.tahun);
            setImage(res.foto);
        } catch (error) {
            console.log("get all", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <section>
            <NavbarSekolah2 />
            <div className="container-alumni container">
                <HeaderDetailPerpus header={nama} />
                {image !== 0 ? (<>
                    <img src={image} />
                </>) : (<>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOndEexr8NTOP7h4YEYfBDz5qDfI92M8IQhw&s" />
                </>)}
                <h4 style={{ color: "#002147", fontWeight: "600", marginTop: "2rem" }}>{nama}</h4>
                <h5 style={{ color: "#002147" }}>{pengarang}</h5>
                <h5 style={{ color: "#002147", marginBottom: "1rem" }}>Terbit Tahun {tahun}</h5>
                <h5>Sinopsis</h5>
                <hr />
                <p style={{ fontSize: "14px" }}>
                    <div
                        dangerouslySetInnerHTML={{ __html: sinopsis }}
                    />
                </p>
            </div>
            <FooterSekolah />
        </section>
    )
}

export default DetailPerpus;