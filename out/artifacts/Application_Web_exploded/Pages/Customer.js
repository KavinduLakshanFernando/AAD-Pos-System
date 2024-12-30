const cleancustomerform  = () => {
    $('#customerId1').val("");
    $('#customerName1').val("")
    $('#customerAddress').val("");
    $('#customerTel').val("");
};

$('#customerTableBody').on('click', 'tr', (e) => {
    let id = $(e.target).closest('tr').find('td').eq(0).text();
    let name = $(e.target).closest('tr').find('td').eq(1).text();
    let address = $(e.target).closest('tr').find('td').eq(2).text();
    let tel = $(e.target).closest('tr').find('td').eq(3).text();
    $('#customerId1').val(id);
    $('#customerName1').val(name);
    $('#customerAddress').val(address);
    $('#customerTel').val(tel);
})

const fetchCustomerData = () => {
    // console.log("fetchCustomerData");
    $.ajax({
        url: "http://localhost:8080/Application_Web_exploded/customer",
        method: "GET",
        success: (res) => {
            $('#customerTableBody').empty();
            res.forEach(
                (customer) => {
                    $('#customerTableBody').append(`
                            <tr>
                                <td>${customer.id}</td>
                                <td>${customer.name}</td>
                                <td>${customer.address}</td>
                                <td>${customer.phone}</td>
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
fetchCustomerData();

$('#customer_save').click((e) => {
    e.preventDefault()

    const id = $('#customerId1').val()
    const name = $('#customerName1').val()
    const address = $('#customerAddress').val()
    const phone = $('#customerTel').val()

    $.ajax({
        url: "http://localhost:8080/Application_Web_exploded/customer",
        method: "POST",
        // contentType: "application/json",
        data: {
            id: id,
            name: name,
            address: address,
            phone:phone
        },
        success: ()=>{
            console.log("Customer added successfully");
            fetchCustomerData();
            cleancustomerform();
            alert("add customer successfully");
        },
        error: ()=>{
            // console.error("Error:", status, error);status
            alert("Failed to add customer. Please try again.");
        }
    })
})

$('#customer_update').click((e) =>{
    e.preventDefault()

    const id = $('#customerId1').val()
    const name = $('#customerName1').val()
    const address = $('#customerAddress').val()
    const phone = $('#customerTel').val()

    $.ajax({
        url: "http://localhost:8080/Application_Web_exploded/customer",
        method: "PUT",
        contentType: "application/json",
            data: JSON.stringify({
                id: id,
                name: name,
                address: address,
                phone: phone
            }),

        success: ()=>{
            console.log("Customer updated successfully");
            fetchCustomerData();
            cleancustomerform();
            alert("update customer successfully");
        },
        error: ()=>{
            // console.error("Error:", status, error);status
            alert("Failed to update customer. Please try again.");
        }
    })
})

$("#customer_delete").click((e) => {
    let id = $('#customerId1').val();
    $.ajax({
        url: `http://localhost:8080/Application_Web_exploded/customer?id=${id}`,
        method: "DELETE",
        success: () => {
            console.log("customer deleted successfully");
            fetchCustomerData();
            cleancustomerform();
            alert("Delete customer successfully");
        },
        error: () => {
            // console.error("Error:", status, error);status
            alert("Failed to delete customer. Please try again.");
        }
    })
})


