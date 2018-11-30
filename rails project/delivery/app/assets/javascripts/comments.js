$(document).ready(function(){
    attachListeners();
});  
function attachListeners () { 
    addComment()
} 
    // var list = $("#comment-list");
    // list.append(`<li>Hello</li>`);
    // list.append(`<li>second Hello</li>`)
    // console.log(list.children());
    // $("p").click(function() {
    //     console.log("You clicked a paragraph!");
    // })

// constructor function
function Comment(content){
    this.content = content;
}
// class Comment{

//     constructor(content) {
//         this.content = content
        
//     }

//     format() {
//         return `<li class="comment"><strong>${this.content}</strong></li>`;
//     }
// }

Comment.prototype.format = function() {
    return `<li class="comment"><strong>${this.content}</strong></li>`;
}
//new item page
$("#calculate").click(function(){
    
    var grams = document.getElementById("grams").value;
    var pounds = document.getElementById("pounds").value;
    if (grams !== "") {
        document.getElementById("pounds").value = (parseFloat(grams) * 0.00220462).toString();
    }
    else if (pounds !== "") {    
        document.getElementById("grams").value = (parseFloat(pounds) * 453.592).toString();
    } else {
        alert("Enter a number for either grams or pounds");
    }
});

function addComment(){ 
    $("#new_comment").submit(function(event){ 
        // Stop form from submitting normally
        event.preventDefault();
    
        // Get some values from elements on the page:
        var $form = $( this ),
        token = $form.find("input[name='authenticity_token']").val(),
        term = $form.find("textarea[name='comment[content]']").val(),
        url = $form.attr("action");
        
        // Send the data using post
        var posting = $.post(url,{
            accepts: 'application/json',
            data:{comment_content: term, authenticity_token: token} 
        });
        debugger
        posting.done(function(data){
            
            var newComment= data;
            var commentHTML = newComment.format()
            var list = $("#comment-list");
            list.append(commentHTML);
        });
})
}