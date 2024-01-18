import axios from "axios";

// const HOSTNAME = "ec2-13-239-97-36.ap-southeast-2.compute.amazonaws.com:8000"
const HOSTNAME = "ec2-3-26-8-123.ap-southeast-2.compute.amazonaws.com:8000"
const AUTH_URL = "http://" + HOSTNAME + "/api/auth/";
const OTP_URL = "http://" + HOSTNAME + "/api/otp/"

const register = (signupForm) => {
  return axios.post(AUTH_URL + "signup", signupForm);
};

const login = async (loginForm) => {
  return await axios
    .post(AUTH_URL + "signin", loginForm)
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = async (username) => {
  await axios.post(AUTH_URL + "logout/" + username)
  localStorage.removeItem('user')
};

const sendMobileOtp = async (mobile) => {
  return await axios.get(OTP_URL + "mobile/generate-otp/" + mobile)
}

const sendEmailOtp = async (email) => {
  return await axios.post(OTP_URL + "email/generate-otp/" + email)
}

const verifyMobile = async (mobile, otp) => {
  return await axios.get(OTP_URL + "mobile/verify-otp/" + mobile + "/" + otp)
}

const verifyEmail = async (email, otp) => {
  return await axios.post(OTP_URL + "email/verify-otp/" + email + "/" + otp)
}

// const logout = () => {
//   localStorage.removeItem("user");
// };

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  sendMobileOtp,
  sendEmailOtp,
  verifyMobile,
  verifyEmail
};

export default AuthService;
