// $(document).ready(function(){
//     attachListeners();
// });  
// function attachListeners () { 
//     addComment()
// } 
//     // var list = $("#comment-list");
//     // list.append(`<li>Hello</li>`);
//     // list.append(`<li>second Hello</li>`)
//     // console.log(list.children());
//     // $("p").click(function() {
//     //     console.log("You clicked a paragraph!");
//     // })

// // constructor function
// function Comment(content){
//     this.content = content;
// }
// // class Comment{

// //     constructor(content) {
// //         this.content = content
        
// //     }

// //     format() {
// //         return `<li class="comment"><strong>${this.content}</strong></li>`;
// //     }
// // }

//
// function addComment(){ 
//     $("#new_comment").submit(function(event){ 
//         // Stop form from submitting normally
//         event.preventDefault();
    
//         // Get some values from elements on the page:
//         var $form = $( this ),
//         token = $form.find("input[name='authenticity_token']").val(),
//         term = $form.find("textarea[name='comment[content]']").val(),
//         url = $form.attr("action"),
//         orderid = $form.find("input[name='comment[order_id]']").val();
    
//         // Send the data using post
//         var posting = $.post(url,{
//             accepts: 'application/json',
//             comment: {content:term, order_id: orderid},
            
//             authenticity_token: token 
//         });
        
//         posting.done(function(data) {
//            console.log(data)
//             var comment = data;
//             console.log(comment.content)
//             $("#comment-list").append(`Name: ${comment.content}`);
           
//         });
        
// })

// }