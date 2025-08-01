import React, { useState, useEffect } from "react";
import NavbarSekolah2 from "../../../../component/NavbarSekolah2";
import FooterSekolah from "../../../../component/FooterSekolah";
import { API_DUMMY } from "../../../../utils/base_URL";
import axios from "axios";
import Aos from "aos";

function TujuanSekolah() {
  const [content, setContent] = useState({
    tujuan: [],
    sasaran: [],
    judul: "Tujuan dan Sasaran Sekolah"
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real implementation, you would fetch this from an API
    // For now, we'll use the static data you provided
    setContent({
      judul: "Tujuan dan Sasaran Sekolah",
      tujuan: [
        "Membekali peserta didik mampu menguasai kompetensi yang professional dibidangnya dan mengembangkan suatu usaha mandiri.",
        "Membekali peserta didik dengan pendidikan budaya karakter bangsa sehingga menjadi manusia yang beriman dan bertakwa kepada Tuhan YME, serta Cinta tanah air.",
        "Membekali peserta didik dalam penguasaan teknologi (IT), sehingga mampu beradaptasi dengan lingkungan.",
        "Membudayakan sikap peduli lingkungan bagi semua warga sekolah, sehingga tercipta suasana nyaman dilingkungan sekolah."
      ],
      sasaran: [
        "Terwujudnya bangunan SLB C PELITA ILMU sesuai dengan yang tertera dalam site plan.",
        "Tersedianya Sarana dan prasarana sesuai dengan kebutuhan SLB C PELITA ILMU secara umum.",
        "Terwujudnya Kompetasi Keahlian sesuai dengan animo masyarakat",
        "Meningkatnya profesionalisme kepala sekolah guru, karyawan dan pegawai",
        "Meningkatnya komitmen guru dan pegawai terhadap profesi dan pelaksanaan tugasnya.",
        "Meningkatnya kepedulian warga sekolah terhadap lingkungan harmonisasi sosial.",
        "Meningkatnya kepedulian Pemerinta Pusat, Pemerintah Daerah dan masyarakat terhadap kemajuan dan keberlangsungan SLB C PELITA ILMU",
        "Terwujudnya Budaya Kerja yang professional",
        "Terwujudnya lingkungan yang memehuni kriteria 7K",
        "Meningkatnya pemahaman masyarakat terhadap keberadaan SLB C PELITA ILMU"
      ],
      analisis: [
        {
          title: "Ketenagaan",
          content: "Propesionalisme kepala sekolah, guru dan pegawai, Kesesuaian Pendidikan guru/ pegawai dan pelaksanaan tugas pokok guru Jenjang Pendidikan, kualitas tenaga kependidikan, komitmen Guru/ awai terhada tugas, jumlah guru/pegawai belum."
        },
        {
          title: "Fasilitas",
          content: "Ketersediaan sarana dan prasarana serta alat & bahan penunjang KBM, perawatan dan pemeliharaan Sarana dan prasarana analisis kebutuhan perabot, ruang, alat praktek & bahan praktik belum memenuhi Standar Sarana Prasarana."
        },
        {
          title: "Lingkungan",
          content: "Situasi, Kondisi dan potensi lingkungan, pengelolaan lingkungan"
        },
        {
          title: "Menejemen",
          content: "Penerapan menejemen berbasis sekolah, budaya kerja pengelolan, Struktur organisasi, program kerja, RAPBS, Administrasi sekolah belum memenuhi Standar Pengelolaan."
        },
        {
          title: "Kegiatan KBM",
          content: "Pengorganisasian KBM, Sistem evaluasi dan Supervisi, Metode penyajian KBM belum memenuhi Standar Proses"
        },
        {
          title: "Tamatan",
          content: "Daya serap tamatan untuk bekerja dan daya serap tamatan untuk melanjutkan pendidikan belum mengacu pada Standar Kelulusan."
        }
      ]
    });
    
    Aos.init();
  }, []);

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
              <i className="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>Tujuan Sekolah</span>
            </li>
          </ul>
        </div>
        
        <div style={{ lineHeight: "1.8", textAlign: "justify" }}>
          <div style={{ margin: "0 auto 0", padding: "0" }} data-aos="fade-up">
            <h1 style={{ fontWeight: "bold", marginBottom: "30px", fontSize: "2em" }}>
              {content.judul}
            </h1>
            <hr style={{ borderColor: "#ccc", marginBottom: "30px" }} />
            
            {/* Tujuan Section */}
            <section style={{ marginBottom: "40px" }}>
              <h2 style={{ fontWeight: "bold", marginBottom: "20px", color: "#2c3e50" }}>
                Tujuan Sekolah
              </h2>
              <ol style={{ paddingLeft: "20px" }}>
                {content.tujuan.map((item, index) => (
                  <li key={index} style={{ marginBottom: "15px" }}>
                    {item}
                  </li>
                ))}
              </ol>
            </section>
            
            {/* Analisis Section */}
            <section style={{ marginBottom: "40px" }}>
              <h2 style={{ fontWeight: "bold", marginBottom: "20px", color: "#2c3e50" }}>
                Analisis Lingkungan Internal
              </h2>
              <p style={{ marginBottom: "20px" }}>
                Sedangkan faktor lingkungan internal yang sangat berpengaruh terhadap keberhasilan antara lain:
              </p>
              <div style={{ paddingLeft: "15px" }}>
                {content.analisis?.map((item, index) => (
                  <div key={index} style={{ marginBottom: "15px" }}>
                    <strong>{item.title}:</strong> {item.content}
                  </div>
                ))}
              </div>
            </section>
            
            {/* Sasaran Section */}
            <section>
              <h2 style={{ fontWeight: "bold", marginBottom: "20px", color: "#2c3e50" }}>
                Sasaran Sekolah
              </h2>
              <ol style={{ paddingLeft: "20px" }}>
                {content.sasaran.map((item, index) => (
                  <li key={index} style={{ marginBottom: "15px" }}>
                    {item}
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </main>
      <FooterSekolah />
    </div>
  );
}

export default TujuanSekolah;