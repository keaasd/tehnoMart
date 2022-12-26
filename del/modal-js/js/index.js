const disabledScroll = () => {
    document.body.scrollPosition = window.scrollY;
    document.body.style.cssText = `
    overflow: hidden;
    position: fixed;
    top: -${document.body.scrollPosition}px;
    left: 0;
    height: 100vh;
    width: 100vw;
    padding-right: ${window.innerWidth - document.body.offsetWidth}px;
    `;
}
const enabledScroll = () => {
    document.body.style.cssText = '';
    window.scroll({top: document.body.scrollPosition})
}

const createElem = (tag, attr) => {
    const elem = document.createElement(tag);
    return Object.assign(elem, { ...attr });
};
const createModal = (title, description) => {
    const overlayElem = createElem('div', { className: 'modal' });
    const modalElem = createElem('div', { className: 'modal__block' });

    const modalContainerElem = createElem('div', {
        className: 'modal__container',
    });
    const titleElem = createElem('h2', {
        className: 'modal__title',
        textContent: `Заказать ${title}`,
    });
    const descriptionElem = createElem('p', {
        className: 'modal__description',
        textContent: description,
    });
    const formElem = createElem('form', {
        className: 'modal__form',
        method: 'post',
        action: 'https://jsonplaceholder.typicode.com/posts',
        id: 'order',
    });
    const nameLabelElem = createElem('label', {
        className: 'modal__label'
    });
    const nameSpanElem = createElem('span', {
        className: 'modal__text', textContent: 'Имя',
    });
    const nameInputElem = createElem('input', {
        className: 'modal__input',
        placeholder: 'Введите ваше имя',
        name: 'name',
        required: true,
    });
    const phoneLabelElem = createElem('label', {
        className: 'modal__label'
    });
    const phoneSpanElem = createElem('span', {
        className: 'modal__text', textContent: 'Телефон',
    });
    const phoneInputElem = createElem('input', {
        className: 'modal__input',
        placeholder: 'Введите ваш телефон',
        name: 'phone',
        required: true,
    });
    const hideInputElem = createElem('input', {
        name: 'product',
        type: 'hidden',
        value: title,
    });
    const btnSubmit = createElem('button', {
        className: 'modal__btn',
        textContent: 'Заказать',
        type: 'submit',
    });
    const closeModal = createElem('button',
        {
            className: 'modal__close',
            innerHTML: `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="25.288" height="2.06669" transform="matrix(0.69782 0.716273 -0.69782 0.716273 2.35352 0.388474)" fill="#010101"/>
    <rect width="25.8556" height="2.06669" transform="matrix(0.69782 -0.716273 0.69782 0.716273 0 18.5197)" fill="#010101"/>
    </svg>
    `,
    ariaLabel: 'Закрытие модальное окна'
        });
overlayElem.addEventListener('click', event => {
    const target = event.target;
    if (target === overlayElem || target.closest('.modal__close')) {
        overlayElem.remove();
        enabledScroll();
        htm.style.cssText = `
        scroll-behavior:smooth;
    `;
    }
})
btnSubmit.setAttribute('form', 'order')
nameLabelElem.append(nameSpanElem, nameInputElem)
phoneLabelElem.append(phoneSpanElem, phoneInputElem)
formElem.append(nameLabelElem, phoneLabelElem, hideInputElem)

modalContainerElem.append(titleElem, descriptionElem, formElem, btnSubmit, closeModal);
modalElem.append(modalContainerElem);
overlayElem.append(modalElem);
disabledScroll();

document.body.append(overlayElem);
return overlayElem;
};

const productTitle = document.querySelectorAll('.product__title');
const productSubtitle = document.querySelectorAll('.product__subtitle');
const productBtn = document.querySelectorAll('.product__btn');
const htm = document.querySelector('html');
// console.log('elem: ', elem);
for (let i = 0; i < productBtn.length; i++) {
    productBtn[i].addEventListener('click', () => {
        const title = productTitle[i].textContent;
        const description = productSubtitle[i].textContent;
        createModal(title, description);
        htm.style.cssText = `
        scroll-behavior:inherit;
    `;
    })

}
