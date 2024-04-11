var producName = document.getElementById('producName');
var producPrice = document.getElementById('producPrice');
var producCatgory = document.getElementById('producCatgory');
var producDescreption = document.getElementById('producDescreption');
var tableData = document.getElementById('tableData');
var productContainer = [];



if (localStorage.getItem('myProducts') != null) {

    productContainer = JSON.parse(localStorage.getItem('myProducts'));
    displayProducts(productContainer);

}
else {
    productContainer = [];
}
function addProduct() {
    var product = {
        name: producName.value,
        price: producPrice.value,
        categ: producCatgory.value,
        desc: producDescreption.value,
    }
    productContainer.push(product);
    console.log(productContainer);
    localStorage.setItem('myProducts', JSON.stringify(productContainer));
    displayProducts(productContainer);
    clearForm();

}

function displayProducts(listproducts) {
    var cartoona = ``;
    for (let i = 0; i < listproducts.length; i++) {
        cartoona += ` <tr>
          <td>${i + 1}</td>
          <td>${listproducts[i].name}</td>
          <td>${listproducts[i].price}</td>
          <td>${listproducts[i].categ}</td>
          <td>${listproducts[i].desc}</td>
          <td> <button  onclick = deleteProduct(${i}) class="btn btn-outline-danger ">Delete</button></td>
          <td> <button  onclick = setFormForUpdate(${i})  class="btn btn-outline-info  ">Update</button></td>
        </tr>`;

    }
    tableData.innerHTML = cartoona;
}

function searchProduct(term) {

    var searchResult = []
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            searchResult.push(productContainer[i]);
        }
    }
    if (searchResult == "") {
        document.getElementById("demo").classList.remove("d-none");
    }
    else {
        document.getElementById("demo").classList.add("d-none");
    }
    displayProducts(searchResult);
}
var search = document.getElementById('search');
search.addEventListener('input', function (e) {
    // searchProduct(this.value);
    searchProduct(e.target.value);
})

















function clearForm() {
    producName.value = '';
    producPrice.value = '';
    producCatgory.value = '';
    producDescreption.value = '';
}
function deleteProduct(index) {
    productContainer.splice(index, 1);
    displayProducts(productContainer);
    localStorage.setItem("myProducts", JSON.stringify(productContainer));

}
var indexUpdate = 0;
function setFormForUpdate(i) {
    producName.value = productContainer[i].name;
    producPrice.value = productContainer[i].price;
    producCatgory.value = productContainer[i].categ;
    producDescreption.value = productContainer[i].desc;
    document.querySelector(" .btn-outline-dark").classList.add("d-none");
    document.querySelector(".updateBtn").classList.remove("d-none");
    indexUpdate = i;
}
function UpdateProduct() {

    productContainer[indexUpdate].name = producName.value;
    productContainer[indexUpdate].price = producPrice.value;
    productContainer[indexUpdate].categ = producCatgory.value;
    productContainer[indexUpdate].desc = producDescreption.value;
    displayProducts(productContainer);
    localStorage.setItem("myProducts", JSON.stringify(productContainer));
    document.querySelector(" .btn-outline-dark").classList.remove("d-none");
    document.querySelector(".updateBtn").classList.add("d-none");
    clearForm();
}










