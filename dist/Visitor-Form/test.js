"use strict";
function testing(tableName, columns, id, values) {
    const allValues = values.map((x, y) => {
        let current = `(${id}, "${x}"), `;
        return current;
    });
    let allValuesString = allValues.join('');
    let finalValues = allValuesString.slice(0, -2);
    let sql = `INSERT INTO ${tableName} (${columns}) VALUES ${finalValues};`;
    console.log(sql);
}
const testingValues = ['cat', 'dog', 'mouse', 'elephant'];
testing('Test_table', 'id, interest', 3, testingValues);
