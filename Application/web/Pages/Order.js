
let cart_array = [];
let tot = 0;
//load customer id
const customerSelect = () => {
    $.ajax({
        url: "http://localhost:8080/Application_Web_exploded/customer",
        method: "GET",
        success: function (res) {
            let data = res;
            $('#customerSelect').empty()
            $('#customerSelect').append(`<option value="">Select Customer</option>`)
            for (let i = 0; i < data.length; i++) {
                let row = `<option value="${data[i].id}">${data[i].id}</option>`
                $('#customerSelect').append(row);
            }
        },error: function (err) {
            console.log(err);
        }
    })
}

customerSelect();

const ItemSelect = () => {
    $.ajax({
        url: "http://localhost:8080/Application_Web_exploded/item",
        method: "GET",
        success: function (res) {
            let data = res;
            $('#itemSelect').empty()
            $('#itemSelect').append(`<option value="">Select Item</option>`)
            for (let i = 0; i < data.length; i++) {
                let row = `<option value="${data[i].code}">${data[i].code}</option>`
                $('#itemSelect').append(row);
            }
        },error: function (err) {
            console.log(err);
        }
    })
}

ItemSelect();

$('#itemSelect').on('change',  e =>{
    let id = e.target.value;
    $.ajax({
        url: "http://localhost:8080/Application_Web_exploded/item",
        method: "GET",
        success: function (res) {
            let data = res;
            for (let i = 0; i < data.length; i++) {
                if(data[i].code == id){
                    $('#itemName').val(data[i].description);
                    $('#unitPrice').val(data[i].price);
                    $('#qtyOnHand').val(data[i].qty);
                }
            }
            console.log(err);
        }
    })
});


$('#customerSelect').on('change',  e =>{
    let id = e.target.value;
    $.ajax({
        url: "http://localhost:8080/Application_Web_exploded/customer",
        method: "GET",
        success: function (res) {
            let data = res;
            for (let i = 0; i < data.length; i++) {
                if(data[i].id == id){
                    $('#customerName2').val(data[i].name);
                    $('#address').val(data[i].address);
                    $('#tel').val(data[i].phone);
                }
            }
        }
    })

})

const setoid = () => {
    console.log("order id generated")
    $.ajax({
        url: "http://localhost:8080/Application_Web_exploded/order",
        method: "GET",
        success : function (response) {
            let data = response;
            console.log(data+1);
            $("#orderID1").val(data+1)
        },
        error : function (error){
            console.log(error)
        }

    })
}
setoid();

$('#cart').on('click', function () {
    console.log("cart ek wada")
    let cuid = $('#customerSelect').val();
    let Iid = $('#itemSelect').val();
    let unitPrice = $('#unitPrice').val();
    let qty = $('#qty').val();
    let total = unitPrice*qty;
    tot = tot + total;
    $('#total1').val(tot);

    let cart = {cuid,Iid,unitPrice,qty,total}
    console.log("data okay")
    cart_array.push(cart);
    console.log("array ekata add una")

    loadcartData()
})

function loadcartData(){
    $('#cartTableBody').empty()
    for (let i = 0; i < cart_array.length; i++) {
        let row = `<tr><td>${cart_array[i].cuid}</td>
                            <td>${cart_array[i].Iid}</td>
                            <td>${cart_array[i].qty}</td></tr>
                            <td>${cart_array[i].total}</td></tr>`
        $('#cartTableBody').append(row);
    }
}

$('#placeOrder').click((e) => {
    e.preventDefault();
    let oid = $('#orderID1').val();
    let cid = $('#customerSelect').val();
    let tot = $('#total1').val();
    $.ajax({
        url: "http://localhost:8080/Application_Web_exploded/order",
        method: "POST",
        data: {oid,cid,tot},
        success: function (res) {
            console.log(res);
            console.log(oid,cid,tot);
            placeOrder(oid)
        },
        error: function (err) {
            console.log(err);
        }
    })
})

function placeOrder(oid){
    let index = 0;

    cart_array.forEach(element => {
        console.log(cart_array.length)
        index++;
        console.log(element.Iid, oid);
        $.ajax({
            url: "http://localhost:8080/Application_Web_exploded/orderDetails",
            method: "POST",
            data: {
                oid:oid,
                Iid:element.Iid,
            },
            success: function (res) {
                console.log(res);
                updateItemQty(element.Iid,element.qty,index);
            },
            error: function (err) {
                console.log(err);
            }
        })
    });
}

function updateItemQty(Iid,qty,index){
    $.ajax({
        url: "http://localhost:8080/Application_Web_exploded/itemUpdate",
        method: "PUT",

        data: JSON.stringify({
            Iid : Iid,
            qty : qty,
        }),
        success: function (res) {
            if (index == cart_array.length){
                alert("Order Placed Successfully");
                cart_array.splice(0,cart_array.length);
                tot = 0;
                setoid()
                clearField()
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
}

 const clearField = () => {
    $('#customerSelect').val('');
    $('#itemSelect').val('');
    $('#unitPrice').val('');
    $('#qty').val('');
    $('#total1').val('');
}