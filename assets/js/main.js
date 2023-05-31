const email = document.getElementById('email');
const message = document.getElementById('message');
const contact = document.getElementById('contact');

const partners = document.querySelector('.partners');
const sortASC = document.getElementById('sortASC');
const sortDESC = document.getElementById('sortDESC');

let partnersArr = [];

contact.onclick = () => {
    const obj = {
        email: email.value,
        message: message.value,
    }

    message.value = '';
    email.value = '';

    fetch('http://localhost:3000/messages', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {'Content-Type': 'application/json'}
    })
}

function createActionButton( callback, type ){
    const button = document.createElement('button');
    button.classList.add('action');

    const i = document.createElement('i');
    i.classList.add('fas', 'fa-' + type);

    button.appendChild(i);

    button.addEventListener('click', callback);

    return button;
}

function deletePartner(el){
    partners.removeChild(el);
}

function updatePartner(el){
    const url = prompt("url-i daxil et (ex: assets/images/brand2.webp): ");
    el.src = url;

    let id = +el.getAttribute("data-id");

    fetch('http://localhost:3000/partners/' + id, {
        method: 'put',
        body: JSON.stringify({
            src: url
        }),
        headers: {'Content-Type': 'application/json'}
    });
}

function createPartner(data){
    const partner = document.createElement('div');
    partner.classList.add('partner', 'mt-5');
    partner.setAttribute('data-id', data.id);

    const img = document.createElement('img');
    img.src = data.src;
    partner.appendChild(img);

    const actions = document.createElement('div');
    partner.classList.add('actions');

    const actionDel = createActionButton( function(){
        deletePartner(partner);
    }, 'trash');

    const actionUpdate = createActionButton( function(){
        updatePartner(partner);
    }, 'pen');
    
    actions.appendChild(actionDel);
    actions.appendChild(actionUpdate);

    partner.appendChild(actions);

    return partner;
}

function getPartners(){
    fetch('http://localhost:3000/partners').then(data => data.json()).then(data => {
        partnersArr = data;
        populatePartners(data);
    });
}

function populatePartners(data){
    partners.innerHTML = '';
    data.forEach(e => {
        partners.appendChild(createPartner(e));
    });
}

sortASC.onclick = () => {
    populatePartners(partnersArr.sort());
}

sortDESC.onclick = () => {
    populatePartners(partnersArr.sort().reverse());
}

getPartners();