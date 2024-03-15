//tarihi formatlayan bir fonksiyon
// const formatDate = (date) => {
//   const dateObj = new Date(date);

//   return dateObj.toLocaleDateString("tr-TR", {
//     month: "long",
//     day: "numeric",
//   });
// };

//tarihi alır ve geriye ay / gün formatında döndürür
const formatDate = (dateStr) => {
  //metin formatındaki tarihi aralardaki . ya göre parçalara ayırdık
  const date = dateStr.split(".");

  //formatlayıp döndür
  return date[0] + "/" + date[1];
};
export default formatDate;
