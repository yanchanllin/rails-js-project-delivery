$(function () {
    console.log("orders.js loaded ...")
    listenForClick()
    listenForNewOrderFormClick()
});

function listenForClick() {
    $('button#orders-data').on('click', function (event) {
        event.preventDefault()
        getOrders()
        // showNewOrderForm()
    })
}

function getOrders() {
    $.ajax({
        url: "http://localhost:3000/orders",
        method: 'get',
        dataType: 'json'
    }).done(function (response) {
        // $('button#orders-data').json(response)

        console.log("response: ", response);


        response.map(order => {
            let myOrder = new Order(response[0])

            let myOrderHTML = myOrder.orderHTML()
            document.getElementById('ajax-orders').innerHTML = myOrderHTML
        })
    })
    // $(document).on('click', ".show_link", function (e) {
    //     e.preventDefault()
    //     // history.pushState(null, null, "${id}")
    //     $('div#notice.container').html('')
    //     let id = $(this).attr('data-id')
    //     fetch('/orders/${id}.json')
    //         .then(res => res.json())
    //         .then(order => {
    //             console.log(order)

    //             let myOrder = new Order(order)
    //             console.log(myOrder)
    //             let orderHTML = myOrder.formatShow()

    //             //console.log('you just hit getOrders ')
    //             // clearout pg
    //             $('div#notice.container').append(orderHTML)

    //         })
    // })
}

function listenForNewOrderFormClick() {
    $('button#ajax-new-order').on('click', function (event) {
        event.preventDefault()
        let newOrderForm = Order.newOrderForm()
        document.querySelector('div#new-order-form-div').innerHTML = newOrderForm

    })
}

class Order {
    constructor(obj) {
        this.comments = obj.comments
        this.quantity = obj.quantity
        this.meal = obj.meal
        this.user = obj.user
    }
    static newOrderForm() {
        return (`

     <form>    
     Order: <input type="text" name="ordernameform">
     quantity:<input type="text" name="quantityform">
             <input type="submit" name="commit" value="Create Order" />
    </form>
          `)
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
    let orderComments = this.comments.map(comment => {
        return (`
          <p>${comment.content}</p>      
    `)
    }).join('')

    let orderHTML = `
        <h2>${this.meal.name}</h2>
        <div>quantity:${this.quantity}</div> 
        <div>comments:${orderComments}</div>     
    `
    return orderHTML
}