import { myAxios, privateAxios } from "./helper";

export const loadAllCategories = () => {
  return myAxios.get(`/categories/getAll`).then((response) => {
    return response.data;
  });
};

export const addCategory = (category) => {
  return privateAxios.post(`/categories/create`, category).then((response) => {
    return response.data;
  });
};

export const deleteSelectedCategories = (selectedCategories) => {
  // for (let i = 0; i < 2; i++) {
    console.log(selectedCategories);
    // return myAxios.get(`/categories/delete/`, categoryId).then((response) => {
    //   return response.data;
    // });
  // }
};
