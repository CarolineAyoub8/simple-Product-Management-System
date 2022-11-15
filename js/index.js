var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCat = document.getElementById("productCat")
var productDesc = document.getElementById("productDesc")
var productList;
var mainBtn = document.getElementById("mainBtn")
var mainIndex = 0

if (localStorage.getItem("list") != null) {
    productList = JSON.parse(localStorage.getItem("list"))
    displayProduct(productList)
} else {
    productList = []
}


function addProduct() {
    if (mainBtn.innerText == "update") {
        mainBtn.innerHTML = "Add Product"
        var product = {
            name: productName.value,
            price: productPrice.value,
            category: productCat.value,
            desc: productDesc.value
        }
        productList.splice(mainIndex, 1, product)
    } else {
        var product = {
            name: productName.value,
            price: productPrice.value,
            category: productCat.value,
            desc: productDesc.value
        }
        productList.push(product)
    }

    clearForm();
    setToLocalStorage()
    displayProduct(productList);

    // console.log(productList);
}

function displayProduct(list) {
    var cartona = ``
    for (var i = 0; i < list.length; i++) {
        cartona += ` <tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].category}</td>
        <td>${list[i].desc}</td>
        <td><button class="btn btn-warning" onclick="getProductData(${i})">Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
    </tr>`
    }
    document.getElementById("tableData").innerHTML = cartona
}

function clearForm(flag) {
    productName.value = flag ? flag.name : "";
    productPrice.value = flag ? flag.price : "";
    productCat.value = flag ? flag.category : "";
    productDesc.value = flag ? flag.desc : ""
}

function deleteProduct(index) {
    productList.splice(index, 1);
    displayProduct(productList);
    setToLocalStorage()
}

function setToLocalStorage() {
    localStorage.setItem("list", JSON.stringify(productList))
}

function getProductData(index) {
    clearForm(productList[index])
    mainBtn.innerText = "update"
    mainIndex = index;
}



function search(searchKey) {
    var searchlist = []
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(searchKey.toLowerCase())) {
            searchlist.push(productList[i])
        }
    }
    displayProduct(searchlist)
}