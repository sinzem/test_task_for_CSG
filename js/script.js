window.addEventListener("DOMContentLoaded", () => {

    // for menu
    const headerMenu = document.querySelector(".header__menu");
    const headerMenuDrop = document.querySelector(".header__menu_drop");
    const headerMenuDropDown = document.querySelector(".header__menu_drop_down");
    const menuItems = document.querySelectorAll(".header__menu__item");
    const headerMenuButton = document.querySelector(".header__menu__button");
    const menuDataItems = document.querySelectorAll("[data-to]");
    const offset = document.querySelector(".offset").offsetTop;
    const windowWidth = window.innerWidth;

   
    window.addEventListener("scroll", () => {
        if (windowWidth > 1199) {
            window.scrollY > 200 ? headerMenu.classList.add("active") : headerMenu.classList.remove("active");
        };
        menuDataItems.forEach((item) => {
            if (item.getBoundingClientRect().top <= offset &&
             item.getBoundingClientRect().bottom >= offset) {
                menuItems.forEach(btn => {
                    btn.classList.contains(`to_${item.dataset.to}`) ? btn.classList.add("active") : btn.classList.remove("active");
                })
            } 
        })
    })
    

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
        document.body.style.paddingRight = `${scroll}px`;
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
        document.body.style.paddingRight = `0px`;
    }
    
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            // menuItems.forEach(item => {
                // item.classList.contains("active") ? item.classList.remove("active") : null;
            // })
            // item.classList.add("active");
            if (headerMenuDrop.classList.contains("active")) {
                dropMenuClose();
            }
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

    // next-button scrolling
    const nextButtons = document.querySelectorAll(".next");

    nextButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            let bottomLine = btn.parentElement.getBoundingClientRect().bottom +  window.scrollY;
            window.scrollTo({
                top: bottomLine,
                left: 0,
                behavior: "smooth"
              });
        })
    })

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

    // modals and form + validation
    const footerForm = document.querySelector(".footer__form");
    const footerButton = document.querySelector(".footer__subscribe__button");

    const thanksModal = document.querySelector(".thanks-modal");
    const thanksClose = document.querySelector(".thanks-modal__close");
    const thanksLoading = document.querySelector(".thanks-modal__loading");
    const thanksSuccess = document.querySelector(".thanks-modal__success");
    const thanksFailure = document.querySelector(".thanks-modal__failure");

    const forms = document.querySelectorAll(".fetch-form");

    const callButtons = document.querySelectorAll(".button__call");
    const callModal = document.querySelector(".to-call");
    const userName = document.querySelector("#user-name");
    // const userPhone = callForm.querySelector(".user-phone");
    // const userEmail = callForm.querySelector("#user-email");
    const userArea = document.querySelector("#call-area");
    const callClose = document.querySelector(".to-call__close");

    userName.addEventListener("input", () => {
        userName.value = userName.value.replace(/^[^а-яёa-z0-9]/i, "");
    })

    mask(".user-phone");

    userArea.addEventListener("input", () => {
        userArea.value = userArea.value.replace(/[<>]/g, "");
    })

    forms.forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            calcScroll();
            thanksModal.classList.add("active");
            thanksLoading.classList.add("active");
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scroll}px`;

            const formData = new FormData(form);
            const objData = {};
            formData.forEach(function(value, key) {
                objData[key] = value;
            });
            fetch("request.php", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(objData)
            })
            .then((e) => { 
                if (e.status === 200) {
                    thanksLoading.classList.remove("active");
                    thanksFailure.classList.remove("active");
                    thanksSuccess.classList.add("active");
                } else {
                    console.log(e);
                    thanksLoading.classList.remove("active");
                    thanksSuccess.classList.remove("active");
                    thanksFailure.classList.add("active");
                }
            })
            .catch((e) => {
                console.log(e);
                thanksLoading.classList.remove("active");
                thanksSuccess.classList.remove("active");
                thanksFailure.classList.add("active");
            }).finally(() => { 
                    setTimeout(() => {
                        thanksLoading.classList.contains("active") ?  thanksLoading.classList.remove("active") : null;
                        thanksSuccess.classList.contains("active") ?  thanksSuccess.classList.remove("active") : null;
                        thanksFailure.classList.contains("active") ?  thanksFailure.classList.remove("active") : null;
                        thanksModal.classList.remove("active");
                        document.body.style.overflow = "";
                        document.body.style.paddingRight = `0px`;
                    }, 5000)
                    form.reset();
                });
        })
    })

    callButtons.forEach(button => {
        button.addEventListener("click", () => {
            calcScroll();
            callModal.classList.add("active");
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scroll}px`;
        })
    })

    callModal.addEventListener("click", (e) => {
        if (e.target === callModal || e.target === callClose) {
            callModal.classList.remove("active");
            document.body.style.overflow = "";
            document.body.style.paddingRight = ``;
            callForm.reset();
        }
    })

    thanksModal.addEventListener("click", (e) => {
        if (e.target === thanksModal || e.target === thanksClose) {
            thanksModal.classList.remove("active");
            document.body.style.overflow = "";
            document.body.style.paddingRight = ``;
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

// for e-mail
// /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// phone mask
const mask = (selector) => { 

    let setCursorPosition = (pos, elem) => { 
        elem.focus(); 

        if (elem.setSelectionRange) { 
            elem.setSelectionRange(pos, pos); 
        } 
    };

    function createMask(event) { 
        let matrix = '+38 (0__) ___ __ __';
        let i = 0;  
        let def = matrix.replace(/\D/g, ''); 
        let val = this.value.replace(/\D/g, ''); 

        if (def.length >= val.length) {
            val = def;
        } 
        this.value = matrix.replace(/./g, function(a) { 
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a; 
        })

        if (event.type === 'blur') {
            if (this.value.length == 3) { 
                this.value = '';
            } 
        } else { 
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector); 

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};