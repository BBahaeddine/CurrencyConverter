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

function fillSelectItems() {
    
    const ulListContainer = document.querySelectorAll('ul');

    // document.createElement('li').
    getAllCountries().then(resp => {
        return resp;
    }).then(data => {
        console.dir(data.results);
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