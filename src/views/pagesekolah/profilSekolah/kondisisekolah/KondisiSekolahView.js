import React, { useState, useEffect } from 'react';
import FooterSekolah from '../../../../component/FooterSekolah';
import axios from 'axios';
import { API_DUMMY } from '../../../../utils/base_URL';
import NavbarSekolah2 from '../../../../component/NavbarSekolah2';
import Aos from 'aos';

function KonsidisiSekolahView() {
  const [foto, setFoto] = useState("");
  const [isi, setIsi] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(true);

  useEffect(() => {
    axios.get(`${API_DUMMY}/api/kondisi_sekolah/all/terbaru?page=0&size=1`)
      .then(response => {
        if (response.data.data.content.length > 0) {
          setFoto(response.data.data.content[0].foto);
          setIsi(response.data.data.content[0].deskripsi);
          setDataAvailable(true);
        } else {
          setFoto("");
          setIsi("");
          setDataAvailable(false);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setDataAvailable(false);
      });
      Aos.init()
  }, []);

  const mediaStyle = {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    transition: "transform 0.3s ease-in-out",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    borderRadius: '10px',
  };

  return (
    <div>
      <NavbarSekolah2 />
      <main className="container-berita container">
        <div className="header-berita" data-aos="fade-down">
          <ul>
            <li>
              <a href="/">
                <i className="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <i className="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>Kondisi Sekolah</span>
            </li>
          </ul>
        </div>
        <div style={{ lineHeight: '1.8' }} data-aos="fade-up">
          <div className="container">
            {dataAvailable ? (
              <>
                {foto && (
                  <img
                    src={foto}
                    style={mediaStyle}
                    className='image-style'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    alt="Kondisi Sekolah"
                  />
                )}
                <hr style={{ marginTop: '20px', borderColor: '#ccc' }} />
                <p style={{ fontSize: '1.2em', textAlign: "justify" }}>
                  <div
                    dangerouslySetInnerHTML={{ __html: isi }}
                  />
                </p>
              </>
            ) : (
              <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#666' }}>
                Kondisi Sekolah Tidak Tersedia.
              </p>
            )}
          </div>
        </div>
      </main>
      <FooterSekolah />
    </div>
  );
}

export default KonsidisiSekolahView;
