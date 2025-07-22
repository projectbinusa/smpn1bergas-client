import React, { useState, useEffect } from "react";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import FooterSekolah from "../../../component/FooterSekolah";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import { Pagination } from "@mui/material";
import "../../../css/alumni/KegiatanSekolah.css";
import kegiatanP from "../../../aset/smpn1bergas/kegiatan.png";

function KegiatanSekolah() {
  const [kegiatan, setKegiatan] = useState([]);
  const [categories, setCategories] = useState([]);
  const [months, setMonths] = useState([]);
  const [filteredKegiatan, setFilteredKegiatan] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const getMonthName = (monthIndex) => {
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return months[monthIndex];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/api/kegiatan/all`
        );
        const data = response.data.data.content;
        setKegiatan(data);

        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);

        const uniqueMonths = [
          ...new Set(
            data.map((item) => {
              const date = new Date(item.tanggal);
              const monthName = getMonthName(date.getMonth());
              const year = date.getFullYear();
              return `${monthName} ${year}`;
            })
          ),
        ];
        setMonths(uniqueMonths);

        setFilteredKegiatan(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterByCategory = () => {
      if (selectedCategory === "Semua") {
        setFilteredKegiatan(kegiatan);
      } else {
        const filtered = kegiatan.filter(item => item.category === selectedCategory);
        setFilteredKegiatan(filtered);
      }
    };

    filterByCategory();
  }, [selectedCategory, kegiatan]);

  useEffect(() => {
    const filterByMonth = () => {
      if (!selectedMonth) return;
      const filtered = kegiatan.filter(item => {
        const date = new Date(item.tanggal);
        const monthYear = `${getMonthName(date.getMonth())} ${date.getFullYear()}`;
        return monthYear === selectedMonth;
      });
      setFilteredKegiatan(filtered);
    };

    filterByMonth();
  }, [selectedMonth, kegiatan]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredKegiatan.length / itemsPerPage));
  }, [filteredKegiatan, itemsPerPage]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedMonth("");
    setCurrentPage(1);
  };

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    setSelectedCategory("Semua");
    setCurrentPage(1);
  };

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  console.log(filteredKegiatan)

  return (
    <>
      <NavbarSekolah2 />
      <main className="container-sapras container">
        <div className="header-sapras">
          <ul>
            <li><a href="/"><i className="fas fa-home"></i> Beranda</a></li>
            <li><a href=""><i className="fas fa-angle-right"></i> Kegiatan</a></li>
            <li style={{ textTransform: "uppercase" }}><i className="fas fa-angle-right"></i> {selectedCategory}</li>
          </ul>
        </div>
        <div className='container-sapras2'>
          <div>
            <div>
              <h5 style={{ fontWeight: "600", color: "#002147" }}>KATEGORI</h5>
              <hr style={{ width: '30%', color: '#0060ff', border: '2px solid #0060ff' }} />
              <ul className="category-berita">
                <li>
                  <a
                    onClick={() => handleCategoryClick("Semua")}
                    style={{ cursor: "pointer" }}
                  >
                    Semua
                  </a>
                </li>
                <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                {categories.map((category, index) => (
                  <React.Fragment key={index}>
                    <li>
                      <a
                        onClick={() => handleCategoryClick(category)}
                        style={{ cursor: "pointer" }}
                      >
                        {category}
                      </a>
                    </li>
                    {index < categories.length - 1 && (
                      <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                    )}
                  </React.Fragment>
                ))}
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

          <div className='container-all'>
            <div className="header">
              <h4 style={{ textTransform: "uppercase", textAlign: "center" }}>
                {selectedCategory === "Semua" ? "Semua Kegiatan" : selectedCategory}
              </h4>
            </div>
            <div className="paginationControls">
              <label htmlFor="itemsPerPage" className="itemsPerPageLabel">Items per page:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="itemsPerPageSelect"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            {filteredKegiatan.length === 0 ? (
              <p className="loadingText">Tidak ada data.</p>
            ) : (
              <>
                {filteredKegiatan
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((item, index) => (
                    <div key={index} className="card-berita">
                      <img
                        src={item.foto !== null ? item.foto : kegiatanP}
                        alt={item.judul}
                        className="cardImage"
                      />
                      <h4 style={{ textTransform: "uppercase" }}>{item.judul}</h4>
                      <p className="cardText">
                        <div
                          dangerouslySetInnerHTML={{ __html: item.isi }}
                        />
                      </p>
                      <a href={`/detail-kegiatan/${item.id}`}>Selengkapnya</a>
                    </div>
                  ))}
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  className="pagination"
                  showFirstButton
                  showLastButton
                />
              </>
            )}
          </div>
        </div>
      </main>
      <FooterSekolah />
    </>
  );
}

export default KegiatanSekolah;
