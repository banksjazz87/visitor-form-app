// function createPhoneNumber(str) {
//     let newStr;
//     if (str.length === 3) {
//         newStr = `(${str})-`;
//     } else if (str.length === 9) {
//         newStr = str + "-";
//     } else if (str.length > 13) {
//         newStr = str.slice(0, -1);
//     } else {
//         newStr = str;
//     }
//     return newStr;
// }

function createPhoneNumber(str) {
    let newStr;

    switch (str.length) {
        case 3:
            newStr = `(${str})-`;
            break;
        case 9:
            newStr = str + "-";
            break;
        case 15:
            newStr = str.slice(0, -1);
            break;
        default:
            newStr = str;
            break;
    }
    return newStr;
}

console.log(createPhoneNumber('814'));
console.log(createPhoneNumber('(814)-371'));
console.log(createPhoneNumber('(814)-371-94823'));