// working for child in index hover effect
const child = document.querySelectorAll(".child");

window.addEventListener("scroll", (e) => {
  child.forEach((child) => {
    // console.log(child.getBoundingClientRect().top);
    const triggerBtn = (window.innerHeight / 5) * 4;
    if (child.getBoundingClientRect().top < triggerBtn) {
      // console.log(child);
      if (!child.classList.contains("active")) {
        child.classList.add("active");
      }
    }
  });
});

// working for navbar links
// const links = document.querySelectorAll("nav .links #link");

// links.forEach((link,idx)=>{
//    link.addEventListener("click",(e)=>{
//     e.preventDefault();
//     // console.log(child[idx].getBoundingClientRect().top);
//     const no = child[idx].getBoundingClientRect().top
//     window.scrollTo(0,no);
//    })
// })