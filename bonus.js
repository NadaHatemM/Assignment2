function findKthPositive(arr, k) {
    let number = 1;

    while (k > 0) {
        if (!arr.includes(number)) {
            k--;
        }

        number++;
    }

    return number - 1;
}

console.log(findKthPositive([2, 3, 4, 7, 11], 5));