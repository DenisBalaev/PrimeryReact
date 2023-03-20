export const IngredientService = {
    getIngridient() {
        return fetch('data/ingredients-small.json').then(res => res.json()).then(d => d.data);
    }
}