
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
    $.ajax({
        url: "http://localhost:8080/Application_Web_exploded/order",
        method: "GET",
        success: function (res) {
            let data = res;
            $('#orderID1').val(data + 1);
        },
        error: function (err) {
            console.log(err);
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
        },
        error: function (err) {
            console.log(err);
        }
    })
})
/*
          #placeorder.click{
            let oid = $($oid);
            cid
            tot // okkoma gaththu tot eka (uda)

            &>ajax({
                url ; order;
                method post;
                data{
                    oid :oid
                    cid :cid
                    tot//

            })
           ,
           succsess=>
           consol.log(response);
           saveOD();
})
      func saveOD(){
      let oid = $oid

      cartArray.map// loop karaganna puluwan eth nathnnm forEach

      cartArray.forEach (element){
        $>ajax({
        url: orderDetail // class ekak hadala urlPattern ekata denna ona menna me url eka
        method : Post
        data{
            oid ; oid ;
            itemid : element.itemid;  // methnata enne cart ekata daddi hadapu object eke variable name eka
        }

        success: consollog()  //  OD ekath save unama apita ithuru wela ythinne item qty eka adu krn eka
        // me innne palaweni element eke
        reduceItemQty(element.iid, element,qty);  // methni  adu krgnn on a eke id ekai qty ekai yawwa
        error:

        }


        func reduceitemqty(iid , qty){
        $ajax{
        url : itemupdate // me thinne aluthen hdena class eka... urlpattern ekath ekka
        hethuwa item eke update ekk dnt gahala thina nisa... aluth ekk

        method : put;

        data JSON.strinfy{
        iid :iid
        qty ; qty;
        }

        sucsess {}  // tot 0 kkrnn one   // aluth order id ganna one // cart array eka clear krnn one
        error
        }
        }

        })
      }
      }



* */


//     $('#cart').on('click', function (){
//         let iid = $('#itemSelect').val();
//         let description = $('#itemName').val();
//         let unitPrice = $('#unitPrice').val();
//         let qtyOnhand = $('#qtyOnHand').val();
//         let qty = $('#qty').val();
//
//         // console.log(iid,description,unitPrice,qtyOnhand,qty);
//
//         let cart = new CartModels(
//             iid,
//             description,
//             unitPrice,
//             qtyOnhand,
//             qty
//     )
//         total += qty*unitPrice;
//         console.log(total);
//         updateItem(iid ,qty);
//         $("#total1").val(total);
//         cart_array.push(cart);
//
//         loadOrdertbl();
//         clearItemdetailform();
//
//     });
//
// function updateItem(iid, quantity) {
//     for (let i = 0; i < item_array.length; i++) {
//         if (iid === item_array[i].code) {
//             item_array[i].qty = item_array[i].qty - quantity;  // Update quantity in itemary
//         }
//     }
// }
//
// const loadOrdertbl = () => {
//     $("#orderTableBody").empty();
//     cart_array.map((item, index) => {
//         console.log(item);
//         let data = `<tr><td>${item.icode}</td><td>${item.description}</td><td>${item.unitPrice}</td><td>${item.qtyOnHand}</td><td>${item.qty}</td></tr>`
//         $("#orderTableBody").append(data);
//     });
// };
//
// const clearItemdetailform  = () => {
//     $('#itemSelect').val("");
//     $('#itemName').val("")
//     $('#unitPrice').val("");
//     $('#qtyOnHand').val("");
//     $('#qty').val("");
// };
//
// $("#placeOrder").on('click' , function () {
//     let cid = $("#customerSelect").val();
//
//     $("#orderTableBody tr").each(function () {
//         let iid = $(this).find("td:eq(0)").text();
//         let unitprice = $(this).find("td:eq(2)").text();
//         let qty = $(this).find("td:eq(4)").text();
//
//         let itemtot = unitprice*qty;
//
//         let order = new OrderModels(
//             order_array.length+1,
//             formattedDate,
//             cid,iid,qty,itemtot
//         );
//         order_array.push(order);
//
//     });
//     total=0;
//     cart_array.splice(0 , cart_array.length);
//     $("#orderTableBody").empty();
//     console.log(order_array);
//     $('#orderID1').val(order_array.length+1);
//     $("#total1").val('');
//
//
// });