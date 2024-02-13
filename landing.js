var Dealsbutton = document.getElementById("Dealsbtn")
var Freebutton = document.getElementById("Freebtn")

// Changes button class type depending on screen width to change styling through bulma
    if (window.innerWidth < 550){
        Dealsbutton.classList.remove("is-large")
        Dealsbutton.classList.add("is-medium")
        Freebutton.classList.remove("is-large")
        Freebutton.classList.add("is-medium")
    
    }

    document.addEventListener('DOMContentLoaded', function () {
        var modalTrigger = document.getElementById('info-modal-trigger');
        var modal = document.getElementById('info-modal');
        var modalClose = modal.querySelector('.delete');
        var modalBackground = modal.querySelector('.modal-background');

        // Opens the modal when the info button is pressed
        modalTrigger.addEventListener('click', function () {
          modal.classList.add('is-active');
        });
        
        // Closes the modal when the "close button is pressed"
        modalClose.addEventListener('click', function () {
          modal.classList.remove('is-active');
        });
  
        // Closes the modal when clicking outside of it
        modalBackground.addEventListener('click', function () {
            modal.classList.remove('is-active');
        });
      });
