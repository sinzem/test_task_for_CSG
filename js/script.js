window.addEventListener("DOMContentLoaded", () => {

    // for menu
    const headerMenu = document.querySelector(".header__menu");
    const headerMenuDrop = document.querySelector(".header__menu_drop");
    const headerMenuDropDown = document.querySelector(".header__menu_drop_down");
    const menuItems = document.querySelectorAll(".header__menu__item");
    const headerMenuButton = document.querySelector(".header__menu__button");

    window.addEventListener("scroll", () => {
        window.scrollY > 200 ? headerMenu.classList.add("active") : headerMenu.classList.remove("active");
    })
    
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menuItems.forEach(item => {
                item.classList.contains("active") ? item.classList.remove("active") : null;
            })
            item.classList.add("active");
        })
    })

    headerMenuButton.addEventListener("click", () => {
        if (headerMenuDrop.classList.contains("active")) {
            headerMenuDrop.classList.remove("active");
            headerMenuDropDown.classList.remove("active");
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
        } else {
            headerMenuDrop.classList.add("active");
            headerMenuDropDown.classList.add("active");
            document.body.style.overflow = "hidden";
            document.body.style.marginRight = `${scroll}px`;
        }
    })

    // for scrolling wide blocks 
    const wideBlocks = document.querySelectorAll(".scroll_horizontal");
    const scroll = calcScroll();

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
})