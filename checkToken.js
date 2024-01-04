const jwt = require("jsonwebtoken");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTk2MGU4OTBiYWIyYjlmNWYxNDdhMzUiLCJpYXQiOjE3MDQzMzI5Njd9.snbj-jpkPdLirOa0_Jy_qvhLAsyGsirh1995dasjYIM";
const decodedToken = jwt.decode(token);

if (decodedToken.exp * 1000 < Date.now()) {
  console.log("Token has expired");
} else {
  console.log("Token is still valid");
}
