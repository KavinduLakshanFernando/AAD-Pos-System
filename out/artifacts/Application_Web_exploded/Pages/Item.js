//clear Form
const clearitemform  = () => {
    $('#itemCode').val("");
    $('#itemDescription').val("")
    $('#itemPrice').val("");
    $('#itemQty').val("");
}
$('#itemTableBody').on('click', 'tr', (e) => {
    let code = $(e.target).closest('tr').find('td').eq(0).text();
    let description = $(e.target).closest('tr').find('td').eq(1).text();
    let price = $(e.target).closest('tr').find('td').eq(2).text();
    let qty = $(e.target).closest('tr').find('td').eq(3).text();
    $('#itemCode').val(code);
    $('#itemDescription').val(description);
    $('#itemPrice').val(price);
    $('#itemQty').val(qty);
})

const fetchItemData = () => {
    $.ajax({
        url: "http://localhost:8080/Application_Web_exploded/item",
        method: "GET",
        success: (res) => {
            console.log(res)
            $('#itemTableBody').empty();
            res.forEach(
                (item) => {
                    $('#itemTableBody').append(`
                            <tr>
                                <td>${item.code}</td>
                                <td>${item.description}</td>
                                <td>${item.price}</td>
                                <td>${item.qty}</td>
                            </tr>
                        `)
                }
            )
        },
        error: (err) => {
            console.log(err)
        }
    })
}
fetchItemData()

$('#item_save').click((e) => {
    e.preventDefault()

    const code = $('#itemCode').val()
    const description = $('#itemDescription').val()
    const price = $('#itemPrice').val()
    const qty = $('#itemQty').val()

    $.ajax({
        url: "http://localhost:8080/Application_Web_exploded/item",
        method: "POST",
        // contentType: "application/json",
        data: {
            code: code,
            description: description,
            price: price,
            qty:qty
        },
        success: ()=>{
            console.log("Item added successfully");
            fetchItemData()
            clearitemform()
            alert("add Item successfully");
        },
        error: ()=>{
            // console.error("Error:", status, error);status
            alert("Failed to add Item. Please try again.");
        }
    })
})

$('#item_update').click((e) => {
    e.preventDefault()

    const code = $('#itemCode').val()
    const description = $('#itemDescription').val()
    const price = $('#itemPrice').val()
    const qty = $('#itemQty').val()

    $.ajax({
        url: "http://localhost:8080/Application_Web_exploded/item",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            code: code,
            description: description,
            price: price,
            qty: qty
        }),
        success: () =>{
            fetchItemData()
            clearitemform()
            alert("update item successfully");
        },
        error: () =>{
            alert("Failed to update customer. Please try again.");
        }
    })
})

$('#item_delete').click((e) => {
    let code = $('#itemCode').val()

    $.ajax({
        url: `http://localhost:8080/Application_Web_exploded/item?code=${code}`,
        method: "DELETE",
        success : () =>{
            fetchItemData()
            clearitemform()
            alert("Delete Item successfully");
        },
        error: () => {
            alert("Failed to delete item. Please try again.");
        }
    })
})