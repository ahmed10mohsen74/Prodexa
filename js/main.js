let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "creat";
let tmp;


let search = document.getElementById('search');
// fun get total

function getTotal()
{
    if (price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value)
            - +discount.value;

        total.innerHTML = result;
        total.style.backgroundColor = "green";
    } else
    {
        total.innerHTML = '';
        total.style.backgroundColor = '#a00d02'

    }

}

// fun creat product
// fun save local storage
let dataPro;
if (localStorage.product != null)
{
    dataPro = JSON.parse(localStorage.product);
} else
{
    dataPro = [];
}


submit.addEventListener("click", function ()
{
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),

    }

    if (title.value != '' && price.value != '' && category.value != '' && newPro.count <= 100)
    {
        if (mood === "creat")
        {

            if (newPro.count > 1)
            {
                for (let i = 0; i < newPro.count; i++)
                {
                    dataPro.push(newPro);
                }
            } else
            {
                dataPro.push(newPro);
            }
        } else
        {
            dataPro[tmp] = newPro;
            mood = "creat";
            submit.innerHTML = "Creat";
            count.style.display = "block";
        }

        clearData()
    }




    // save local storage
    localStorage.setItem("product", JSON.stringify(dataPro))

    showData()
})


// clear data
function clearData()
{
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

//fun read data
function showData()
{
    getTotal()
    let table = '';
    for (let i = 0; i < dataPro.length; i++)
    {
        table += `<tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick = "deleteData(  ${i}  )" id="delete" >delete</button></td>
                    </tr>`
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDeleteAll = document.getElementById("deleteAll");
    if (dataPro.length > 0)
    {
        btnDeleteAll.innerHTML = `<button onclick= "deleteAll()">delete All(${dataPro.length})</button>`
    } else
    {
        btnDeleteAll.innerHTML = "";
    }
}
showData()

// fun count

// fun delete
function deleteData(i)
{
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}
function deleteAll()
{
    localStorage.clear;
    dataPro.splice(0);
    showData()
}
// fun update
function updateData(i)
{
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = "none";
    category.value = dataPro[i].category;
    submit.innerHTML = "Update";

    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}


// fun search
let searchMode = 'title';

function getSearchMode(id)
{
    let search = document.getElementById('search');
    if (id == 'searchTitle')
    {
        searchMode = 'title';
        search.placeholder = 'search by title';
    } else
    {
        searchMode = 'category';
        search.placeholder = 'search by category';
    }
    search.value = '';
    showData()

    search.focus()

}

function searchData(value)
{
    let table = '';
    if (searchMode == 'title')
    {
        for (let i = 0; i < dataPro.length; i++)
        {
            if (dataPro[i].title.includes(value.toLowerCase()))
            {
                table += `<tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick = "deleteData(  ${i}  )" id="delete" >delete</button></td>
                    </tr>`
            }
        }
    } else
    {
        for (let i = 0; i < dataPro.length; i++)
        {
            if (dataPro[i].category.includes(value.toLowerCase()))
            {
                table += `<tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick = "deleteData(  ${i}  )" id="delete" >delete</button></td>
                    </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
// clear data