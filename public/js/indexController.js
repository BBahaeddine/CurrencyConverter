
export class IndexController {
    constructor() {
        this._registerServiceWorker().then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
        this._fillSelectItems();
    }
    _registerServiceWorker() {
        return new Promise((resolve, reject) => {
            if (!navigator.serviceWorker)
                reject(`This Browser Doesn't Support Service Workers`);
            navigator.serviceWorker.register('/serviceWorker.js').then(sw => {
                resolve('Service Worker Registered');
            }).catch(err => {
                reject(err);
            });
        });
    }
    _fillSelectItems() {
        _getAllCountries().then(resp => {
            console.log(resp);
        });
    }
    _getAllCountries() {
        return new Promise(resolve => {
            resolve(fetch('https://free.currencyconverterapi.com/api/v5/countries'));
        });
    }
}




// function getAllCurrencies() {
//     return new Promise(resolve => {
//         resolve(fetch(''))
//     })
// }