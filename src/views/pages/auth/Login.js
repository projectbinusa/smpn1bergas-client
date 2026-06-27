import React, { useState } from "react";
import "../../../css/login.css";
import { API_DUMMY } from "../../../utils/base_URL";
import { useHistory } from "react-router-dom";
import Ikon from "../../../aset/ikon-web.png";
import Swal from "sweetalert2";
import axios from "axios";
import logo from "../../../aset/smpn1bergas/logo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, seRole] = useState("admin");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
      role: role,
    };
    try {
      const response = await axios.post(`${API_DUMMY}/login`, data);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Login Sebagai Adminn",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("id", response.data.userData.id);
        localStorage.setItem("role", response.data.userData.role);
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          history.push("/admin-berita");
        }, 1500);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Username / Password Salah",
      });
      console.error(error);
    }
  };

  return (
    <div className="container iimg d-flex justify-content-center align-items-center min-vh-100">
      <div
        style={{
          background: " rgb(241, 246, 249)",
          border: "1px solid blue",
          boxShadow: "rgba(47, 60, 95, 0.24) 0px 6px 10px",
        }}
        id="responsive-login"
        className="row border rounded-5 p-3 bg-white  box-area padding-login">
        <div
          id="gambar"
          className=" col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box img-login">
          <div className="featured-image mb-3 img-login">
            <img
              src="https://static.vecteezy.com/system/resources/previews/010/998/284/non_2x/3d-password-input-illustration-design-free-png.png"
              className="img-fluid img-login"
              style={{ width: "250px" }}
            />
          </div>
        </div>
        <div className="col-md-6 right-box">
          <form onSubmit={handleLogin} className="row align-items-center">
            <div
              className="header-text mb-4 text-center "
              style={{ marginTop: "20px" }}>
              <h2>
                <img style={{ width: "50px" }} src={logo} /> Login
              </h2>
              <p>Selamat Datang Kembali</p>
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg bg-light fs-6"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* <input
              type="hidden"
              className="form-control form-control-lg bg-light fs-6"
              required
              placeholder="Username"
              value="admin"
            /> */}
            </div>
            <div className="input-group mb-1">
              <input
                type={showPassword ? "text" : "password"} // Menampilkan atau menyembunyikan password berdasarkan nilai showPassword
                id="password"
                className="form-control form-control-lg bg-light fs-6"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group mb-5 d-flex justify-content-between">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showPassword"
                  onChange={() => setShowPassword(!showPassword)} // Mengubah nilai showPassword saat checkbox diubah
                />
                <label
                  htmlFor="showPassword"
                  className="form-check-label text-secondary">
                  <small>Tampilkan Password</small>
                </label>
              </div>
            </div>
            <div className="input-group mb-3">
              <button
                type="submit"
                className="btn btn-lg btn-primary w-100 fs-6">
                Login
              </button>
            </div>
            {/* <div className="row">
            <small>
              Belum Memiliki Akun ? Silahkan <a href="/register">Register</a>
            </small>
          </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
