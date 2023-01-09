const tabButtons = document.querySelectorAll('.selection-button');
const tabDescribtions = document.querySelectorAll('.delivery-block');

tabButtons.forEach((tabButton, index) => {
    
    tabButton.addEventListener('click', (event) => {
        for (let i = 0; i < tabButtons.length; i++) {    
            tabButtons[i].classList.remove('active-bg')
            
        }      
    if (event) {
        tabButton.classList.add('active-bg');
    } 
        tabDescribtions.forEach((descr, indexDescr) => {
            if (index === indexDescr) {
                descr.classList.add('active-delivery-block');
                // descr.classList.remove('hidden')                
            } else {
                // descr.classList.add('hidden');
                descr.classList.remove('active-delivery-block');
                // tabButton.classList.remove('active-bg');
            }
        });
    })

});