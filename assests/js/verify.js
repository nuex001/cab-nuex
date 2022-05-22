// verify for create acct 
class validate{
    // constructor(form){
    //     this.form = form;
    // }
    empty(e){
        // console.log(e.nextElementSibling);
        e.style="border:2px solid red;";
        e.nextElementSibling.style="display:flex;color:red;border:2px solid red;";
        e.nextElementSibling.innerHTML =`<i class="fa fa-times"></i>`;
        // const span =  e.parentNode.parentNode.querySelector("span");
        // span.innerHTML="Empty!!";
    }
    succes(e){
        // console.log(e.nextElementSibling);
        e.style="border:2px solid green;";
        e.nextElementSibling.style="display:flex;color:green;border:2px solid green;";
        e.nextElementSibling.innerHTML =`<i class="fa fa-check"></i>`;
        const span =  e.parentNode.parentNode.querySelector("span");
        span.innerHTML="";
    }
    none(e){
        // console.log(e.nextElementSibling);
        e.style="border:2px solid #fff;";
        e.nextElementSibling.style="display:none;";
        const span =  e.parentNode.parentNode.querySelector("span");
        span.innerHTML="";
    }
}


