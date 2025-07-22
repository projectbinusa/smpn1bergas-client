import React, { useEffect, useState } from "react";
import NavbarSekolah2 from "../../component/NavbarSekolah2";
import FooterSekolah from "../../component/FooterSekolah";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { API_DUMMY } from "../../utils/base_URL";
import Aos from "aos";

function Kontak() {
  // GET ALL KONTAK
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [fax, setFax] = useState("");

  const getAllKontak = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/kontak/all/terbaru?page=0&size=1`
      );
      setEmail(response.data.data.content[0].email);
      setPhone(response.data.data.content[0].phone);
      setFax(response.data.data.content[0].fax);
      setAddress(response.data.data.content[0].address);
      console.log(response.data.data.content[0]);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllKontak();
    Aos.init();
  }, []);
  return (
    <main style={{overflow: "hidden"}}>
      <NavbarSekolah2 />
      <div className="container-alumni container">
        <section id="hubungi-kami" className="">
          <div style={{ textAlign: "center" }} data-aos="fade-down">
            <Typography
              style={{
                fontWeight: "bold",
                borderBottom: "2px solid #FFCC00",
                display: "inline-block",
                marginBottom: "100px",
                fontFamily: "'Poppins', sans-serif",
              }}
              variant="h4"
              gutterBottom>
              Hubungi Kami
            </Typography>
          </div>
          <Grid container spacing={3} className="">
            <Grid item xs={12} md={6} data-aos="fade-right">
              <Typography
                variant="h5"
                gutterBottom
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                  fontFamily: "'Poppins', sans-serif",
                }}>
                Denah Lokasi
              </Typography>
              <iframe
                title="Location Map"
                src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15897.218736810618!2d110.527273!3d-7.174636!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708d5a1a2a2b1d%3A0x304431cd0522f0e1!2s${address}!5e0!3m2!1sen!2sid!4v1692797763880!5m2!1sen!2sid`}
                style={{ width: "100%", height: "300px", border: "0" }}
                allowFullScreen=""
                loading="lazy"></iframe>
            </Grid>

            <Grid item xs={12} md={6} data-aos="fade-left">
              <Typography
                variant="h5"
                gutterBottom
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                  fontFamily: "'Poppins', sans-serif",
                }}>
                Kontak
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{
                    display: "flex",
                    fontFamily: "'Poppins', sans-serif",
                  }}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                    <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                  </svg>
                  <strong style={{ marginLeft: "8px" }}>:</strong>
                  <span style={{ marginLeft: "8px" }}>{email}</span>
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{
                    display: "flex",
                    fontFamily: "'Poppins', sans-serif",
                  }}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                  </svg>
                  <strong style={{ marginLeft: "8px" }}>:</strong>
                  <span style={{ marginLeft: "8px" }}>+62 {phone}</span>
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{
                    display: "flex",
                    fontFamily: "'Poppins', sans-serif",
                  }}>
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      fill-rule="evenodd"
                      d="M11 4a1 1 0 0 0-1 1v10h10.459l.522-3H16a1 1 0 1 1 0-2h5.33l.174-1H16a1 1 0 1 1 0-2h5.852l.117-.67v-.003A1.983 1.983 0 0 0 20.06 4H11ZM9 18c0-.35.06-.687.17-1h11.66c.11.313.17.65.17 1v1a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-1Zm-6.991-7a17.8 17.8 0 0 0 .953 6.1c.198.54 1.61.9 2.237.9h1.34c.17 0 .339-.032.495-.095a1.24 1.24 0 0 0 .41-.27c.114-.114.2-.25.254-.396a1.01 1.01 0 0 0 .055-.456l-.242-2.185a1.073 1.073 0 0 0-.395-.71 1.292 1.292 0 0 0-.819-.286H5.291c-.12-.863-.17-1.732-.145-2.602-.024-.87.024-1.74.145-2.602H6.54c.302 0 .594-.102.818-.286a1.07 1.07 0 0 0 .396-.71l.24-2.185a1.01 1.01 0 0 0-.054-.456 1.088 1.088 0 0 0-.254-.397 1.223 1.223 0 0 0-.41-.269A1.328 1.328 0 0 0 6.78 4H4.307c-.3-.001-.592.082-.838.238a1.335 1.335 0 0 0-.531.634A17.127 17.127 0 0 0 2.008 11Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <strong style={{ marginLeft: "8px" }}>:</strong>
                  <span style={{ marginLeft: "8px" }}>{fax}</span>
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{
                    display: "flex",
                    fontFamily: "'Poppins', sans-serif",
                  }}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <strong style={{ marginLeft: "12px" }}>:</strong>
                  <span style={{ marginLeft: "8px", textAlign: "left" }}>
                    {address}
                  </span>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </section>
      </div>
      <FooterSekolah />
    </main>
  );
}

export default Kontak;
