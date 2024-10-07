window.addEventListener("DOMContentLoaded", () => {

    // for menu
    const headerMenu = document.querySelector(".header__menu");
    const headerMenuDrop = document.querySelector(".header__menu_drop");
    const headerMenuDropDown = document.querySelector(".header__menu_drop_down");
    const menuItems = document.querySelectorAll(".header__menu__item");
    const headerMenuButton = document.querySelector(".header__menu__button");
    const windowWidth = window.innerWidth;

    if (windowWidth > 1199) {
        window.addEventListener("scroll", () => {
            window.scrollY > 200 ? headerMenu.classList.add("active") : headerMenu.classList.remove("active");
        })
    }

    headerMenuDropDown.addEventListener("click", () => {
        if(headerMenuDropDown.classList.contains("active")) {
            dropMenuClose();
        } else {
            dropMenuOpen();
        }

    })

    function dropMenuOpen() {
        headerMenuDrop.classList.add("active");
        headerMenuDropDown.classList.add("active");
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
    }

    headerMenuButton.addEventListener("click", () => {
        if (headerMenuDrop.classList.contains("active")) {
            dropMenuClose();
        } else {
            dropMenuOpen();
        }
    })

    function dropMenuClose() {
        headerMenuDrop.classList.remove("active");
        headerMenuDropDown.classList.remove("active");
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;
    }
    
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menuItems.forEach(item => {
                item.classList.contains("active") ? item.classList.remove("active") : null;
            })
            item.classList.add("active");
        })
    })

    // for scrolling wide blocks 
    const wideBlocks = document.querySelectorAll(".scroll_horizontal");
    const scroll = calcScroll();

    if (windowWidth > 1199) {
        wideBlocks.forEach(block => {
            block.addEventListener("mouseenter", () => {
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
                block.addEventListener("wheel", (e) => {
                    let position = e.deltaY;
                    block.scrollLeft += position * 1.5;
                })
            })
        })
    
        wideBlocks.forEach(block => {
            block.addEventListener("mouseleave", () => {
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            })
        })
    }

    // services cards
    const servicesButtons = document.querySelectorAll(".services__item__button")
    const servicesCards = document.querySelectorAll(".services__modal_item");

    servicesButtons.forEach((button, i) => {
        button.addEventListener("click", () => {
            if (!button.classList.contains("active")) {
                servicesButtons.forEach(item => {
                    if (item.classList.contains("active")) {
                        item.classList.remove("active");
                    }
                })
                button.classList.add("active");
                servicesCards.forEach((card, j) => {
                    if (j === i) {
                        card.classList.add("active");
                    } else {
                        card.classList.remove("active");
                    }
                })
            }
        })
    })


    // portfolio filter
    const portfolioFilters = document.querySelector(".portfolio__filters");
    const portfolioButtons = document.querySelectorAll(".portfolio__button");
    const portfolioCase = document.querySelectorAll(".portfolio__case");

    portfolioFilters.addEventListener("click", (e) => {
        let btn = e.target;

        if (btn.tagName != "BUTTON") return;

        if (!btn.classList.contains("active")) {
            let filter = btn.dataset.filter;
            portfolioButtons.forEach(item => {
                if (item.classList.contains("active")) item.classList.remove("active");
            })
            btn.classList.add("active");
            portfolioCase.forEach(card => {
                if (btn.dataset.filter === "all") {
                    card.classList.add("active");
                } else {
                    card.classList.contains(`portfolio__case_${filter}`) ?
                        card.classList.add("active") : 
                        card.classList.remove("active");

                }
            })
        }
    })
})



// scrollWidth
function calcScroll() { 
    let div = document.createElement('div'); 

    div.style.width = '50px'; 
    div.style.height = '50px';
    div.style.overflowY = 'scroll'; 
    div.style.visibility = 'hidden'; 

    document.body.appendChild(div); 
    let scrollWidth = div.offsetWidth - div.clientWidth; 
    div.remove(); 

    return scrollWidth; 
}