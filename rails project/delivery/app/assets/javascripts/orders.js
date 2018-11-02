$(() => {
    orderClickHandlers()
    seeOrders();
    submitOrder();
  })

  const orderClickHandlers = () => {
    $(document).on("click", ".js-nextOrder", function(event) {
      event.preventDefault();
      let orderId = $(this).attr('data-id')
      let mealId = $('.mealOrders').attr("data-id")
      let href = $(this).attr("href")
      mealName(href);
      seeNextOrder(mealId, orderId);
    })
  }

  const seeOrders = () => {
    $(document).on("click", "a#js-seeAllOrders", function(event){
      event.preventDefault();
      let href = $(this).attr("href")
       history.pushState(null, null, "/orders")
      seeAllOrders(href)
    })
  }