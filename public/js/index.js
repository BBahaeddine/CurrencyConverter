import idb from 'idb';

// new IndexController();
function registerServiceWorker() {
    return new Promise((resolve, reject) => {
        if (!navigator.serviceWorker) reject(`This Browser Doesn't Support Service Workers`)
        navigator.serviceWorker.register('/serviceWorker.js').then(sw => {
            resolve('Service Worker Registered');
        }).catch(err => {
            reject(err);
        })

    })
}

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

function fillSelectItems() {

    // get the ul Element
    const ulFromListContainer = document.getElementById('ulFrom');
    const ulToListContainer = document.getElementById('ulTo');
    const fromInput = document.getElementById('fromInput');
    const toInput = document.getElementById('toInput');

    const ulListContainer = document.getElementsByTagName('ul');

    ulFromListContainer.onclick = event => {
        const target = getEventTarget(event);
        alert(target.innerHTML);
    }

    getAllCountries().then(resp => {
        return resp;
    }).then(data => {
        // console.dir(Object.keys(data.results));
        for (const element of Object.keys(data.results)) {
            // create li Element
            const liElem = document.createElement('li');
            // Add the flex Display
            liElem.classList.add('item');
            liElem.classList.add('mdl-menu__item');
            liElem.setAttribute('data-val', data.results[element].currencyId);

            // Create Image Element
            const img = document.createElement('img');

            // Create Country Text Element
            const country = document.createElement('p');

            // Create Currency Text ELement
            const currency = document.createElement('p');

            img.src = `http://www.countryflags.io/${element}/flat/64.png`;
            country.innerHTML = data.results[element].name;
            currency.innerHTML = data.results[element].currencyId;
            liElem.appendChild(img);
            // liElem.appendChild(country);
            // liElem.appendChild(currency);
            const textNode = document.createTextNode(`${data.results[element].name} - ${data.results[element].currencyId}`);
            liElem.appendChild(textNode);
            // liElem.innerHTML = `Hello World`;

            // liElem.addEventListener('click', event => {
            //     console.log(event);
            // })
            const clonedNode = liElem.cloneNode(true);
            ulFromListContainer.appendChild(liElem);
            ulToListContainer.appendChild(clonedNode);

        }
    })
}
function getAllCountries() {
    return new Promise((resolve, reject) => {
        fetch('https://free.currencyconverterapi.com/api/v5/countries').then((resp) => {
            resolve(resp.json());
        }).catch(err => {
            reject(err);
        })
    });
}

window.addEventListener('load', () => {

    registerServiceWorker().then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
    fillSelectItems();
})