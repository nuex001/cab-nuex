//
const comt = async function (url) {
  const fetchOptions = {
    method: "POST",
    body: new FormData(form),
  };
  const response = await fetch(`${url}`, fetchOptions);
  return response.json();
};
// login
const form = document.querySelector("form");
const msg = document.querySelector(".msg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const verify = new validate();
  let err = false;
  if (form.name.value.trim() == "") {
    msg.style = "color:red;";
    msg.innerHTML = `Please fill in the info`;
    err = true;
  }
  if (form.password.value.trim() == "") {
    msg.style = "color:red;";
    msg.innerHTML = `Please fill in the info`;
    err = true;
  }

  if (!err) {
    comt("/login")
      .then((res) => {
        if (res.msg == "empty") {
          msg.style = "color:red;";
          msg.innerHTML = `Invalid login details<li class="fa fa-times"></li>`;
        } else if (res.msg == "successfull") {
          msg.style = "color:green;";
          msg.innerHTML = `Log in successfull<li class="fa fa-check-circle"></li>`;
          setTimeout(() => {
            if (res.status === "admin") {
              window.location.href = `/admin`;
            } else {
              window.location.href = `/users/book`;
            }
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
// Log in successfull <li class="fa fa-check"></li>
