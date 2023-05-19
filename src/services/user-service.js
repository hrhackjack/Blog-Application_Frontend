import { myAxios, privateAxios } from "./helper";

export const signUp = (user) => {
  return myAxios.post("/auth/register", user).then((response) => response.data);
};

export const loginUser = (loginDetail) => {
  return myAxios
    .post("/auth/login", loginDetail)
    .then((response) => response.data);
};

export const resetPassword = (email) => {
  return privateAxios
    .post("/reset-password", email)
    .then((response) => response.data);
};

export const updateUserImage = (image, userId) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`/user/imageUpload/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export const getUser = (userId) => {
  return myAxios.get(`/users/get/${userId}`).then((resp) => resp.data);
};

export const getAllUsers = () => {
  return myAxios.get(`/users/getAll`).then((resp) => resp.data);
};