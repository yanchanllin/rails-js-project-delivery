// $(() => {
//     orderClickHandlers()
//     seeOrders();
//     submitOrder();
//   })

//   const orderClickHandlers = () => {
//     $(document).on("click", ".js-nextOrder", function(event) {
//       event.preventDefault();
//       let orderId = $(this).attr('data-id')
//       let mealId = $('.mealOrders').attr("data-id")
//       let href = $(this).attr("href")
//       mealName(href);
//       seeNextOrder(mealId, orderId);
//     })
//   }

//   const seeOrders = () => {
//     $(document).on("click", "a#js-seeAllOrders", function(event){
//       event.preventDefault();
//       let href = $(this).attr("href")
//        history.pushState(null, null, "/orders")
//       seeAllOrders(href)
//     })
//   }

//   const submitOrder = () => {
//     $("form#new_order").on("submit", function(event){
//       event.preventDefault();
//       var $form = $(this)
//       var action = $form.attr("action");
//       var params = $form.serialize()
//       $.ajax({
//         url: action,
//         data: params,
//         dataType: "json",
//         method: "POST",
//       })
//       .success(function(json){
//         $('#app-container').html("")
//         orderFormat(json)
//       })
//     })
//   }

//   const mealName = (href) => {
//     $.ajax({
//       method: 'get',
//       url: href,
//       dataType: "json",
//       success: function(meal){
//         $("#app-container").html("")
//         let newMeal = new Meal(meal)
//         let mealNameHTML = newMeal.formatMealName();
//         $("#app-container").append(mealNameHTML)
  
//       }
//     })
//   }
  
//   Meal.prototype.formatMealName = function() {
//     const seeMealNameHTML = `
//       <h2><strong> Orders for ${this.name}</strong></h2>
//       `
//       return seeMealNameHTML
//     }
  
//   const seeAllOrders= (href) => {
//     $.ajax({
//       method: 'get',
//       url: href,
//       dataType: "json",
//       success: function(orders){
//         $("#app-container").html("")
  
//         orders.forEach(order => {
  
//            allordersHTML = `
//           <h3><strong>Order for ${order.meal.name}</strong></h3>
//           <p><strong>${order.user.username}</strong> says: </p>
//           <li><strong>Overall order satisfaction rating?:(1-5)  </strong> ${order.order_rating}</li>'
//           $("#app-container").append(allOrdersHTML).css({"border": "1px solid #999", "background": "#fff", "border-radius": "5px", "padding-top": "15px", "padding-bottom": "25px", "padding-left": "25px", "padding-right": "25px", "text-align": "left", "margin": "60px"})
//         })
//         }
//       })
//     }
  
//   const seeNextOrder = (mealId, orderId) => {
//     $.ajax({
//       method: 'get',
//       url: `/meals/${mealId}/orders/${orderId}/next_order.json`,
//       success: function(order) {
  
//           let newOrder = new Order(order)
//           let nextOrderHTML = newOrder.formatNextOrder();
//           $("#app-container").append(nextOrderHTML)
//           $("#app-container").css({"border": "1px solid #999", "background": "#fff", "border-radius": "5px", "padding-top": "15px", "padding-bottom": "25px", "padding-left": "25px", "padding-right": "25px", "text-align": "left", "margin": "60px"});
//           $(".js-nextOrder").css({"border": "1px solid #999", "color": "#4B0082", "border-color": "#4B0082", "font-size": "16px", "padding": "3px", "border-radius": "5px", "font-family": "serif"})
//         }
//       })
//   }
  
//   function Order(order, user) {
//     this.id = order.id
//     this.user_id = order.user_id
//     this.meal_id = order.meal_id
//     this.order_rating = order.order_rating
//     this.username = order.user.username
//   }
  
//   Order.prototype.formatNextOrder = function() {
  
//   let mealId = $('.mealOrders').attr("data-id")
  
//     seeNextOrderHTML = `
//     <p><strong>${this.username}</strong> says:</p>
//     <li><strong>Would you recommend a friend? </strong><br>${this.recommend}</li></br>
//     <li><strong>Overall order satisfaction rating?(1-5) </strong><br>${this.order_rating}</li></br>
//     <a class="mealOrders" data-id="${this.meal_id}">
//     <a class="js-nextOrder" data-id="${this.id}"><strong>See Next Order..</strong></a><br></br>
//     `
//     return seeNextOrderHTML
//   }
  
//   const orderFormat=(json)=> {
//     seeOrderHTML = `
//     <h2> Thank you for submitting your order! </h2>
//     <p><strong>Your order for ${json.meal.name}:</strong>
//     <li><strong>Would you recommend a friend?: </strong> ${json.recommend}</li>
//     <li><strong>Overall order satisfaction rating?:(1-5)  </strong> ${json.order_rating}</li>
//     </p>
//     <input type="button" onclick="location.href='/meals'" class="buttonTo" value="Main Page"</input><br>
//     `
//     $("#app-container").append(seeOrderHTML).css({"border": "1px solid #999", "background": "#fff", "border-radius": "5px", "padding-top": "15px", "padding-bottom": "25px", "padding-left": "25px", "padding-right": "25px", "text-align": "left", "margin": "60px"});
//   }