// get
const getD = async function (url, data) {
  const fetchOptions = {
    method: "POST",
    body: data,
  };
  const response = await fetch(`${url}`, fetchOptions);
  return response.json();
};
const btns = document.querySelectorAll(".btn");
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const dataIndex = e.target.getAttribute("data-index");
    // const dataId = e.target.getAttribute("data-id");
    const formData = new FormData();
    formData.append("id", dataIndex);
    getD("userbook/", formData)
      .then((res) => {
        console.log(res.msg);
        if (res.msg) {
          const mainDiv = e.target.parentNode;
          mainDiv.remove();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
