// $(document).on("click", ".seeMore", function(){
//     let id= ($(this).attr('data-id'))
//       seeMore(id);
//   }
// )

// $(() => {
//   $(document).on("click", "#sortedOrders", function(event) {
//     event.preventDefault();
//     console.log(event)
//     let href = $(this).attr("href")
//     seeSortedOrders(href);
//   })
// })


//   const seeSortedOrders = (href) => {
//     $.ajax({
//       method: 'get',
//       url: href,
//       dataType: "json",
//       success: function(meal) {

//       meal.orders.sort(function(a, b){
//         return a.meal_rating - b.meal_rating
//       })
//       meal.orders.forEach(order => {
//         let seeSortedOrders=
//         `
//          <p>${order.meal_rating}</p>
//          <p>${order.content}</p>
//         `
        
//         $(".sortedOrders").append(seeSortedOrders)
//       })
//     }
//   })
//   }
//   const seeMore = (id) => {
//     $.ajax({
//       method: 'get',
//       url: `/meals/${id}.json`,
//       success: function(meal) {
//       $("#descrip-" +id).html('')
//           let newMeal = new Meal(meal)
//           let seeMoreHTML = newMeal.formatSeeMore();

//           $('#descrip-' + id).append(seeMoreHTML);
//         }
//       })
//     }

// function Meal(meal) {
//   this.id= meal.id
//   this.name = meal.name
// }


//   Meal.prototype.formatSeeMore = function() {
//     console.log(this.name)
//   }