$(function () {
    console.log("orders.js loaded ...")
    listenForClick
});

function listenForClick(){
    $('button#ordersInfo').on('click',function(event){
        event.preventDefault()
        getOrders()
    })
}

function getOrders() {
	$.ajax({
           url: "http://localhost:3000/orders",
           method: 'get',
           dataType: 'json'
    }).done(function (response) {

		console.log("response: ", response);

		

        let myOrder = new Order(response[0])
        debugger
		let myOrderHTML = myOrder.orderHTML()
        // $('div#ajax-orders').html(myOrderHTML)
        document.getElementById('ajax-orders').innerHTML += myOrderHTML
		// debugger;
	})
}

class Order {
	constructor(obj) {
		this.id = obj.id
        this.quantity = obj.quantity
        this.meal_id = obj.meal_id
		this.user_id = obj.user_id
		this.comments = obj.comments
	}
}

Order.prototype.orderHTML = function () {
    return (`
       <div>${this.id}</div>
		<div>${this.quantity}</div>
	`)
}

Order.prototype.newOrderForm = function () {
	return (`
		<form>new order form</form>
	`)
}