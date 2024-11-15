const quicksort = (array) => {
    // Se o array tiver 0 ou 1 elementos, já está ordenado
    if (array.length <= 1) {
        return array;
    }

    // Escolhe um pivô (neste caso, o último elemento)
    const pivot = array[array.length - 1];
    const left = [];
    const right = [];

    // Divide os elementos em dois arrays: menores e maiores que o pivô
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }

    console.log(left, right, pivot);

    // Chama recursivamente o quicksort nos subarrays e concatena os resultados
    return [...quicksort(left), pivot, ...quicksort(right)];
};
console.log(quicksort([3, 6, 8, 10, 1, 2, 1]));
