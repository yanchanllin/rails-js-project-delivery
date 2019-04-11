$(function () {
    console.log("orders.js loaded ...")
    listenForClick()
    listenForNewOrderFormClick()
});

function listenForClick() {
    $('button#orders-data').on('click', function (event) {
        event.preventDefault()
        getOrders()
        // console.log('you just hit getOrders ')
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
            // $('div#ajax-orders').html(myOrderHTML)
            document.getElementById('ajax-orders').innerHTML += myOrderHTML
            // debugger;
        })
    })
    $(document).on('click', ".show_link", function (e) {
        e.preventDefault()
        let id = $(this).attr('data-id')
        fetch('/orders/${id}.json')
            .then(res => res.json)
            .then(order => {

            })
    })
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
        this.quantity = obj.quantity
        this.meal_id = obj.meal_id
        this.user_id = obj.user_id
        this.comments = obj.comments
    }
    static newOrderForm() {
        return (`

     <form class="new_order" id="new_order" action="/orders" method="post">
     <input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="authenticity_token" value="qfhU44jawhG7iYV6/y0aEq0JirCOVhMJtou6Odagf2U2n20SNT7m5W7VjyUMYn2VgyMzQrqmHuDTpsNtZY7JPg==" />    
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

    return (`
        <div>meal:${this.meal_id}</div>
        <div>quantity:${this.quantity}</div> 
        <div>comments:${orderComments}</div>
        
	`)
}

Order.prototype.formatShow = function () {
    let orderHtml = `
    <div>meal:${this.meal_id}</div>
    <div>quantity:${this.quantity}</div> 
    <div>comments:${orderComments}</div>     
    `
    return orderHtml
}