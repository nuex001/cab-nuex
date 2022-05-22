const form = document.querySelector("form");
//
const comt = async function (url) {
  const fetchOptions = {
    method: "POST",
    body: new FormData(form),
  };
  const response = await fetch(`${url}`, fetchOptions);
  return response.json();
};
//
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const verify = new validate();
  let err = false;

  if (!err) {
    // console.log(err);
    await comt("/register")
      .then((data) => {
        return data;
      })
      .then((response) => {
        console.log(response.error);
        const { error } = response;
        if (error.name) {
          const response = verify.empty(form.name);
          const span = form.name.parentNode.parentNode.querySelector("span");
          span.innerHTML = error.name;
          err = true;
        } else {
          const response = verify.succes(form.name);
        }
        if (error.password) {
          const response = verify.empty(form.password);
          const span =
            form.password.parentNode.parentNode.querySelector("span");
          span.innerHTML = error.password;
          err = true;
        } else {
          const response = verify.succes(form.password);
        }
        if (error.email) {
          const response = verify.empty(form.email);
          const span = form.email.parentNode.parentNode.querySelector("span");
          span.innerHTML = error.email;
          err = true;
        } else {
          const response = verify.succes(form.email);
        }
        if (error.number) {
          const response = verify.empty(form.number);
          const span = form.number.parentNode.parentNode.querySelector("span");
          span.innerHTML = error.number;
          err = true;
        } else {
          const response = verify.succes(form.number);
        }
        // working for no error
        if (!err) {
          verify.none(form.name);
          verify.none(form.password);
          verify.none(form.email);
          verify.none(form.number);

          form.reset();
          swal
            .fire({
              title: "Registration Successful",
              icon: "success",
            })
            .then((res) => {
              window.location.href = "/login";
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
// comt("/register/wait").then(response=>{

// })
