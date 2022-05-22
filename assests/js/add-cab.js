const form = document.querySelector("form");
const label = document.querySelector("label");

const comt = async function (url) {
  const fetchOptions = {
    method: "POST",
    body: new FormData(form),
  };
  const response = await fetch(`${url}`, fetchOptions);
  return response.json();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const verify = new validate();
  let err = false;
  comt("/users/add")
    .then((res) => {
      // console.log(res);
      console.log(res);
      const { errors } = res;
      console.log(errors);
      if (errors.dp) {
        label.style = "border:2px solid red";
      } else {
        label.style = "border:none";
      }
      // for from
      if (errors.from) {
        const response = verify.empty(form.from);
        const span = form.from.parentNode.parentNode.querySelector("span");
        span.innerHTML = errors.from;
        err = true;
      } else {
        const response = verify.succes(form.from);
      }
      // for to
      if (errors.to) {
        const response = verify.empty(form.to);
        const span = form.to.parentNode.parentNode.querySelector("span");
        span.innerHTML = errors.to;
        err = true;
      } else {
        const response = verify.succes(form.to);
      }
      // for address
      if (errors.address) {
        const response = verify.empty(form.address);
        const span = form.address.parentNode.parentNode.querySelector("span");
        span.innerHTML = errors.address;
        err = true;
      } else {
        const response = verify.succes(form.address);
      }
      // for accountName
      if (errors.accountName) {
        const response = verify.empty(form.accountName);
        const span =
          form.accountName.parentNode.parentNode.querySelector("span");
        span.innerHTML = errors.accountName;
        err = true;
      } else {
        const response = verify.succes(form.accountName);
      }
      // for accountBank
      if (errors.accountBank) {
        const response = verify.empty(form.accountBank);
        const span =
          form.accountBank.parentNode.parentNode.querySelector("span");
        span.innerHTML = errors.accountBank;
        err = true;
      } else {
        const response = verify.succes(form.accountBank);
      }
      // for accountNumber
      if (errors.accountNumber) {
        const response = verify.empty(form.accountNumber);
        const span =
          form.accountNumber.parentNode.parentNode.querySelector("span");
        span.innerHTML = errors.accountNumber;
        err = true;
      } else {
        const response = verify.succes(form.accountNumber);
      }
      // for vehicle
      if (errors.vehicle) {
        const response = verify.empty(form.vehicle);
        const span = form.vehicle.parentNode.parentNode.querySelector("span");
        span.innerHTML = errors.vehicle;
        err = true;
      } else {
        const response = verify.succes(form.vehicle);
      }
      if (!res.error) {
        swal
          .fire({
            title: "Cab added Successful",
            icon: "success",
          })
          .then((res) => {
            form.reset();
            window.location.href = "/users/add";
          });
      }
    })
    .catch((err) => {});
});

function previewImg(event) {
  const img = document.querySelector("label img");
  // console.log(event.target.files[0]);
  const imgUrl = URL.createObjectURL(event.target.files[0]);
  img.src = imgUrl;
}
