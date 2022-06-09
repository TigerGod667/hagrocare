function changeBg()
{
	let navbar= document.getElementById("navbar");
	let scrollbar= window.scrollY;
	if (scrollbar < 80){
		navbar.classList.remove("bgcolor");
	}
	else{
		navbar.classList.add("bgcolor")
	}
}window.addEventListener('scroll', changeBg);

