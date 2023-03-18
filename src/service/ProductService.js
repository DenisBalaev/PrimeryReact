export const ProductService = {
    getProducts() {
        return fetch('data/devices-small.json').then(res => res.json()).then(d => d.data);
    }
};

