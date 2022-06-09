try{
    let error = document.querySelectorAll(".text-danger");
    console.log(error);
    for (let i in error){
        error[i].parentElement.childNodes[3].className = "form-control form-control-lg is-invalid";
    }
}
catch(err){throw err;}