// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs

 //= require_tree .
//= require comments


$(function () {
    var orderArray = [];
    var id = parseInt($(".js-next").attr("data-id"));
  
    if ($("#orderInfo").length) {
      loadAllOrders();
    }
  
    function loadAllOrders() {
        $.ajax({
          url: "/orders.json",
          method: 'GET'
        })
        // promise
        .then(function(data) {
           orderArray = data;
           $.each(
             orderArray, function(index, order) {
               var orderData = "<p><a href='/orders/" + order.id + "'>"
                + order.title + "</a><div id='content-" + order.id + "'>"
                + order.content.substring(0, 250) + "..."
                + "<a href='#' data-id='" + order.id + "' class='js-more'>Read More</a></div><br>";
               $('#ordersInfo').append(orderData);
             }
           )
         });
      }

      // For the orders index page

  $("#ordersInfo").on('click', '.js-more', function(e) {
    e.preventDefault();
    var id = this.dataset.id;
    $.get("/orders/" + id + ".json", function(data) {
      $("#content-" + id).html(data.content)
    });
  });

// For the Users Orders Page

  $("#userOrdersInfo").on('click', '.js-more', function(e) {
    e.preventDefault();
    var id = this.dataset.id;
    $.get("/orders/" + id + ".json", function(data) {
     $("#content-" + id).html(data.content);

    });
  });

  // For the Users Show Page

  $("#userOrdersShowInfo").on('click', '.js-more', function(e) {
    e.preventDefault();
    var id = this.dataset.id;
    $.get("/orders/" + id + ".json", function(data) {
     $("#content-" + id).html(data.content);

    });
  });

  // For the Orders Show page

  function loadOrder(data) {
    history.pushState({}, "", "/orders/" + data.id)
    var orderCommentPath = '/orders/' + data.id + '/comments/';
    $("#new_comment").attr('action', orderCommentPath);
    $(".orderUserName").text(data["user"]["name"]);
    $(".orderFoodName").text(data["food"]["name"]);
    $(".orderFoodCategory").text(data["food"]["category"]);
    $(".orderContent").text(data["content"]);
    $(".orderRecommendation").text(data["recommendation"]);
    $(".js-next").attr("data-id", data["id"]);
    $(".js-previous").attr("data-id",data["id"]);
    $("#submitted-comments").empty();
    data["comment_list"].forEach(function(element){
      var comment = new Comment(element);
      comment.renderDisplay();
    });


}

$(".js-next").on("click", function(event) {
  var id = $(".js-next").attr("data-id")
  $.get("/orders/" + id + "/next", function(data) {
    console.log(data)
    loadOrder(data);
  });
  event.preventDefault();
});

$(".js-previous").on("click", function(event) {
  var id = $(".js-previous").attr("data-id")
  $.get("/orders/" + id + "/previous", function(data) {
    console.log(data)
    loadOrder(data);
  });
  event.preventDefault();

});

});



function Comment(data) {
this.id = data.id;
this.content = data.content;
this.user = data.user;
}

Comment.prototype.renderDisplay = function() {
  var html = "" ;
  html += "<div class=\'well well-white\' id=\'comment-\' + comment.id + '\'>" +  "<strong>" + this.user.name + "</strong>" + " says: " + this.content + "</div>";
  $("#submitted-comments").append(html);
}

$(function() {
  $("form#new_comment").on("submit", function(event) {
    event.preventDefault();
    var $form = $(this);
    var action = $form.attr("action");
    // in order to process the comment(form data), its need to be converted from an object to a string.
    var params = $form.serialize();
    $.ajax({
      url: action,
      data: params,
      dataType: "json",
      method: "POST"
    })
    .success(function(json) {
      $(".commentBox").val("");
      var comment = new Comment(json);
      comment.renderDisplay();

    })
  })
})