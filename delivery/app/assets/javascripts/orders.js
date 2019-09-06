$(function () {
    console.log("orders.js loaded ...")
    listenForClick()
});

function listenForClick() {
    $('button#orders-data').on('click', function (event) {
        event.preventDefault()
        getOrders()
    })
    $('button#sort-orders').on('click', function (event) {
        event.preventDefault()
        sortOrders()
    })
    $(document).on('click', ".show_link", function (e) {
        e.preventDefault()
        $('div#notice.container').html('')
        let id = $(this).attr('data-id')
        getOrderShow(id)
    })
    $(document).on('click', "next-order", function () {
        let id = $(this).attr('data-id')
        fetch('orders/${id}/next')
    })
    // For the order new form page
    $("#new_order").on("submit", function (e) {
        e.preventDefault()
        const values = $(this).serialize()

        $.post("/orders", values).done(function (data) {
            $("form#new_order.new_order").html("")
            const newOrder = new Order(data)
            // console.log(newOrder)
            const htmlToAdd = newOrder.formatShow()
            $("form#new_order.new_order").html(htmlToAdd)
        })
    })
}

function sortOrders() {
    $.ajax({
        url: "http://localhost:3000/orders",
        method: 'get',
        dataType: 'json'
    }).done(function (response) {
        console.log("response: ", response);
        response.sort(function (a, b) {

            var nameA = a.meal.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.meal.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
        response.map(order => {
            let myOrder = new Order(order)
            let myOrderHTML = myOrder.orderHTML()
            document.getElementById('ajax-orders').innerHTML += myOrderHTML
        })
    })
}

// For the orders Show Page
const getOrderShow = (id) => {
    $.ajax({
        url: `http://localhost:3000/orders/${id}.json`,
        method: 'get'
    }).done(function (response) {
        console.log("response: ", response);

        let myOrder = new Order(response)
        let orderHTML = myOrder.formatShow()

        // clearout pg
        $('div#notice.container').append(orderHTML)
    })
}

// For the orders index page
// translate JSON responses from your Rails app
function getOrders() {
    $.ajax({
        url: "http://localhost:3000/orders",
        method: 'get',
        dataType: 'json'
    }).done(function (response) {
        console.log("response: ", response);

        response.map(order => {
            let myOrder = new Order(order)
            let myOrderHTML = myOrder.orderHTML()
            document.getElementById('ajax-orders').innerHTML += myOrderHTML
        })
    })
}
class Order {
    constructor(obj) {
        this.id = obj.id
        this.quantity = obj.quantity
        this.meal = obj.meal
        this.comments = obj.comments
    }
}

// For the orders Comments Page/has_many relationship 
Order.prototype.orderHTML = function () {
    let orderComments = this.comments.map(comment => {
        return (`
          <p>${comment.content}</p>      
    `)
    }).join('')

    let orderHTML = `
    <a href="/orders/${this.id}" data-id="${this.id}" class="show_link">
          <h2>${this.meal.name}</h2></a>
        <div>quantity:${this.quantity}</div> 
         <div>comments:${orderComments}</div> 
        `
    return orderHTML
}

Order.prototype.formatShow = function () {
    let orderComments = this.comments.map(comment => {
        return (`
          <p>${comment.content}</p>      
    `)
    }).join('')

    let orderHTML = `
    <input type="hidden" value="meal_id">
    <h2>${this.meal.name}</h2></a>
    <div>quantity:${this.quantity}</div> 
     <div>comments:${orderComments}</div> 
    
        <button class="next-order">Next</button>   
    `
    return orderHTML
}