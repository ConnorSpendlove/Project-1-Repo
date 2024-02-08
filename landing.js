var Dealsbutton = document.getElementById("Dealsbtn")
var Freebutton = document.getElementById("Freebtn")

// changes button class type depending on screen width to change styling through bulma
    if (window.innerWidth < 550){
        Dealsbutton.classList.remove("is-large")
        Dealsbutton.classList.add("is-medium")
        Freebutton.classList.remove("is-large")
        Freebutton.classList.add("is-medium")
    
    }
