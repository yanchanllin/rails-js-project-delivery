$(function () {
    console.log("orders.js loaded ...")
    listenForClick()
});

function listenForClick() {
    $('button#orders-data').on('click', function (event) {
        event.preventDefault()
        getOrders()
    })

    $(document).on('click', ".show_link", function (e) {
        e.preventDefault()
        $('div#notice.container').html('')
        let id = $(this).attr('data-id')
        getOrderShow(id)
    })

    $(document).on('click', "#next-order", function () {
        let id = $(this).attr('data-id')
        fetch('orders/${id}/next')
    })
    $("#new_order").on("submit", function (e) {
        // debugger
        e.preventDefault()
        const values = $(this).serialize()

        $.get("/orders", values).done(function (data) {
            $("form#new_order.new_order").html("")
            const newOrder = new Order(data)
            console.log(newOrder)
            const htmlToAdd = newOrder.formatShow()
            $("form#new_order.new_order").html(htmlToAdd)
        })
    })
}

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
    // let orderComments = this.comments.map(comment => {
    //     return (`
    //       <p>${comment.content}</p>      
    // `)
    // }).join('')

    let orderHTML = `
    
    <div>quantity:${this.quantity}</div> 
    
        <button class="next-order">Next</button>   
    `
    return orderHTML
}