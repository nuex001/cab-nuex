const form = document.querySelector("form");
const comt = async function (url) {
  const fetchOptions = {
    method: "POST",
    body: new FormData(form),
  };
  const response = await fetch(`${url}`, fetchOptions);
  return response.json();
};
// get
const getD = async function (url, data) {
  const fetchOptions = {
    method: "POST",
    body: data,
  };
  const response = await fetch(`${url}`, fetchOptions);
  return response.json();
};

const overlay = document.querySelector(".overlay");
const spans = document.querySelectorAll("span");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const verify = new validate();
  let err = false;
  // name empty
  if (form.name.value.trim() == "") {
    verify.empty(form.name);
    spans[0].innerHTML = "Name required";
    err = true;
  } else {
    verify.succes(form.name);
    spans[0].innerHTML = "";
  }
  // email
  if (form.email.value.trim() == "") {
    verify.empty(form.email);
    spans[1].innerHTML = "Email required";
    err = true;
  } else {
    verify.succes(form.email);
    spans[1].innerHTML = "";
  }
  // email
  if (form.number.value.trim() == "") {
    verify.empty(form.number);
    spans[2].innerHTML = "Number required";
    err = true;
  } else {
    verify.succes(form.number);
    spans[2].innerHTML = "";
  }
  // from
  if (form.from.value.trim() == "") {
    verify.empty(form.from);
    spans[3].innerHTML = "Location required";
    err = true;
  } else {
    verify.succes(form.from);
    spans[3].innerHTML = "";
  }
  // to
  if (form.to.value.trim() == "") {
    verify.empty(form.to);
    spans[4].innerHTML = "Location required";
    err = true;
  } else {
    verify.succes(form.to);
    spans[4].innerHTML = "";
  }
  // driver
  if (form.driver.value.trim() == "") {
    verify.empty(form.driver);
    spans[5].innerHTML = "Driver required";
    err = true;
  } else {
    verify.succes(form.driver);
    spans[5].innerHTML = "";
  }
  if (form.date.value.trim() == "") {
    verify.empty(form.date);
    spans[6].innerHTML = "Date required";
    err = true;
  } else {
    verify.succes(form.date);
    spans[6].innerHTML = "";
  }
  if (form.time.value.trim() == "") {
    verify.empty(form.time);
    spans[7].innerHTML = "Time required";
    err = true;
  } else {
    verify.succes(form.time);
    spans[7].innerHTML = "";
  }
  if (!err) {
    // console.log(err);
    comt("/book").then((res) => {
      // console.log(res);
      overlay.innerHTML = "";
      overlay.innerHTML = `<li class="fa fa-remove" id="remove"></li>`;
      const overlayCancel = document.querySelector(".overlay li");
      if (!res.error) {
        overlay.classList.add("active");
        // console.log(overlayCancel);
        overlayCancel.insertAdjacentHTML(
          "afterend",
          ` 
          <table>
          <td style="border: none; width: 100%">
            <li class="fa fa-print" onclick="window.print()"></li>
          </td>
          <tr style="height: auto; flex-direction: column">
            <td style="border: none; width: 100%">
              <img src="${res.dp}" alt="" />
            </td>
            <td
              style="
                border: none;
                display: flex;
                justify-content: center;
                width: 100%;
                text-transform: uppercase;
                color: var(--header);
              "
            >
            ${res.username}
            </td>
          </tr>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>${form.name.value}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>${form.email.value}</td>
            </tr>
            <tr>
              <td>Number:</td>
              <td>${form.number.value}</td>
            </tr>
            <tr>
              <td>From:</td>
              <td>${form.from.value}</td>
            </tr>
            <tr>
              <td>To:</td>
              <td>${form.to.value}</td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>${form.date.value}</td>
            </tr>
            <tr>
              <td>Time:</td>
              <td>${form.time.value}</td>
            </tr>
            <tr>
              <td>Paid:</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Delivery:</td>
              <td>Waiting</td>
            </tr>
            <tr>
              <td style="border: none; color: var(--background)">......</td>
            </tr>
          </tbody>
        </table>
          `
        );
      }
    });
  }
});

form.from.addEventListener("change", (e) => {
  if (e.target.value !== "") {
    const formData = new FormData();
    formData.append("from", e.target.value);
    getD("/getFrom", formData)
      .then((res) => {
        // console.log(res);
        form.to.innerHTML = '<option value="">To</option>';
        res.forEach((data) => {
          // console.log(data.to);
          const option = form.to.querySelectorAll("option");
          option[0].insertAdjacentHTML(
            "afterend",
            ` <option value="${data.to}">${data.to}</option>`
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    form.to.innerHTML = ' <option value="">To</option>';
  }
});

// working for to to get name

form.to.addEventListener("change", (e) => {
  if (e.target.value !== "") {
    const formData = new FormData();
    formData.append("from", form.from.value);
    formData.append("to", e.target.value);
    getD("/getTo", formData)
      .then((res) => {
        // console.log(res);
        form.driver.innerHTML = '<option value="">Driver</option>';
        res.forEach((data) => {
          //  console.log(data);
          const option = form.driver.querySelectorAll("option");
          option[0].insertAdjacentHTML(
            "afterend",
            ` <option value="${data._id}">${data.name}</option>`
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// working for from
// window.addEventListener("load",()=>{
//    comt
//     .then((res) => {
//     console.log("dfddff");
//     })
//     .catch((err) => {

//     });
// })

// working for remove
const remove = document.querySelector("#remove");
overlay.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    overlay.classList.remove("active");
    window.location.href = "/order";
  }
});
