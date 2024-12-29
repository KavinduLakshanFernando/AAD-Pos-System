import {order_array} from "../../db/database.js";

$('#orderDetail-nav').on('click', function (){
   console.log("clicked");
   loadOrderDetailstbl();
});

const loadOrderDetailstbl = () => {
    $("#orderDetails").empty();
    order_array.map((item, index) => {
        console.log(item);
        let data = `<tr><td>${item.oid}</td><td>${item.iid}</td><td>${item.qty}</td><td>${item.total}</td></tr>`
        $("#orderDetails").append(data);
    });
};