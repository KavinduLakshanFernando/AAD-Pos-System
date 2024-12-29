import OrderModels from "../../models/OrderModels.js"
import CartModels from "../../models/CartModels.js"
import {order_array,customer_array,item_array,cart_array} from "../../db/database.js";


let formattedDate;
let total=0;

//load customer id
const customerSelect = () => {
    console.log('0000000');
    $("#customerSelect").empty();
    $("#customerSelect").append('<option value="">Select Customer</option>');
    customer_array.map((item, index) => {
        let data = `<option>${item.id}</option>`
        $("#customerSelect").append(data);
    });
};

// load item id
const itemSelect = () => {
    $("#itemSelect").empty();
    $("#itemSelect").append('<option value="">Select Item</option>');
    item_array.map((item, index) => {
        let data = `<option>${item.code}</option>`
        $("#itemSelect").append(data);
    });
};

    $('#order-nav').on('click',function () {
        customerSelect();
        itemSelect();

        $('#orderID1').val(order_array.length+1);
        
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = today.getFullYear();
        formattedDate = `${year}-${month}-${day}`;

        // Set the current date to the date input field
        $("#date1").val(formattedDate);

    });



    $('#customerSelect').on('change', function (){
        let index = $(this).prop('selectedIndex');
        if(index>0){
            $('#customerName2').val(customer_array[index-1].name);
            $('#address').val(customer_array[index-1].address);
            $('#tel').val(customer_array[index-1].tel);
        }
    });

    $('#itemSelect').on('change', function (){
        let itemindex = $(this).prop('selectedIndex');
        if(itemindex>0){
            $('#itemName').val(item_array[itemindex-1].description);
            $('#unitPrice').val(item_array[itemindex-1].unitPrice);
            $('#qtyOnHand').val(item_array[itemindex-1].qty);
        }
    });



    $('#cart').on('click', function (){
        let iid = $('#itemSelect').val();
        let description = $('#itemName').val();
        let unitPrice = $('#unitPrice').val();
        let qtyOnhand = $('#qtyOnHand').val();
        let qty = $('#qty').val();

        // console.log(iid,description,unitPrice,qtyOnhand,qty);

        let cart = new CartModels(
            iid,
            description,
            unitPrice,
            qtyOnhand,
            qty
    )
        total += qty*unitPrice;
        console.log(total);
        updateItem(iid ,qty);
        $("#total1").val(total);
        cart_array.push(cart);

        loadOrdertbl();
        clearItemdetailform();

    });

function updateItem(iid, quantity) {
    for (let i = 0; i < item_array.length; i++) {
        if (iid === item_array[i].code) {
            item_array[i].qty = item_array[i].qty - quantity;  // Update quantity in itemary
        }
    }
}

const loadOrdertbl = () => {
    $("#orderTableBody").empty();
    cart_array.map((item, index) => {
        console.log(item);
        let data = `<tr><td>${item.icode}</td><td>${item.description}</td><td>${item.unitPrice}</td><td>${item.qtyOnHand}</td><td>${item.qty}</td></tr>`
        $("#orderTableBody").append(data);
    });
};

const clearItemdetailform  = () => {
    $('#itemSelect').val("");
    $('#itemName').val("")
    $('#unitPrice').val("");
    $('#qtyOnHand').val("");
    $('#qty').val("");
};

$("#placeOrder").on('click' , function () {
    let cid = $("#customerSelect").val();

    $("#orderTableBody tr").each(function () {
        let iid = $(this).find("td:eq(0)").text();
        let unitprice = $(this).find("td:eq(2)").text();
        let qty = $(this).find("td:eq(4)").text();

        let itemtot = unitprice*qty;

        let order = new OrderModels(
            order_array.length+1,
            formattedDate,
            cid,iid,qty,itemtot
        );
        order_array.push(order);

    });
    total=0;
    cart_array.splice(0 , cart_array.length);
    $("#orderTableBody").empty();
    console.log(order_array);
    $('#orderID1').val(order_array.length+1);
    $("#total1").val('');


});