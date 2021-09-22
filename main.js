

// (function(){

    const chatForm = document.querySelector('#chat-form');
    const messageList = document.querySelector('#message-list');
    const delButton = document.querySelector('.delete')

    function generateHTML(message) {
        // construct the message html
        return `
            <li>
                <p>${message.text}</p>
                <span>${message.username}</span>
            </li>
        `
    }

    function fetchMessages() {
        fetch('https://tiny-taco-server.herokuapp.com/Chatty/')
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                let html = "";
                for(let i = 0; i < data.length; i++){
                    html += generateHTML(data[i]);
                }
                messageList.innerHTML = html;
            });
    }

    fetchMessages();
    setInterval(fetchMessages, 3000);
    deleteMessages();
    

    function addMessage(event) {
        event.preventDefault();
        const message = {
            text: event.target.message.value,
            username: event.target.sender.value,
        }

        fetch('https://tiny-taco-server.herokuapp.com/Chatty/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        })
        .then(response => response.json())
        .then(data => {
            html = generateHTML(data);
            messageList.insertAdjacentHTML('beforeend', html);
        }) 
        .catch(error => console.log(error)) 
    }
    delButton.addEventListener('click',deleteMessages());

    chatForm.addEventListener('submit', addMessage);

// })
    function deleteMessages(id) {
        // for (let i = 0; i < 330; i++ ){
        // id = i.toString()
        
        // console.log(id);
           fetch('https://tiny-taco-server.herokuapp.com/Chatty' + "/" + id, {  
               method: 'DELETE',    
           })
           .then (response => {
               if (!response.ok) {
                   throw new Error('uh oh')
               }
               console.log ('DELETED');
           })
        }
    // }

//     $submit.addEventListener('click', submitMessage())

    
//     function submitMessage(){
//         let chatSent = message.value
//         let createMessages = {
//             messages: chatSent,
//             sender:  user,
//     }
//     console.log(chatSent)


// message.value= ""
// renderText(createMessages.messages)

//  }
    
//     fetch('https://tiny-taco-server.herokuapp.com/Chatty/')
//     .then(response => response.json())
//     .then(function(message){
//         renderText(message)
//         console.log(message)
//     })

//     function renderText(messages){
//             let length = messages.length;
//             console.log(messages);
//             let mostRecent = messages.slice(length -50);
//             const list = document.querySelector("#message-list");
//             let newList = ''
//             console.log(sender.value)
//             mostRecent.forEach(message => {
//                 if (!document.querySelector(`li[data-id ='${message.id}']`)){
//                     newList += makeLi(message)
//                     }
//                 })
//                 if (newList != ""){
//                     list.innerHTML += newList
//                     }
//                 }
//  function makeLi(messages){
//      let sender = document.querySelector('#sender').value
//      if (messages.sender == sender){
//          sender = "You"
//      } else {
//          sender = messages.sender
//      }
//      return `
//    <li data-id = '${message.id}' ><strong>${sender}:<strong> ${message.message}</li>
//    `

//  }

//  form.addEventListener('submit', postMessage(createMessages))


// fetch('https://tiny-taco-server.herokuapp.com/Chatty/137.', {
//     method: 'DELETE',

// })
// .then(response => response.json());
// .then (response => {
//     if(!response.ok){
//         throw new ERROR ('OOPS')
//     }
//     console.log("DELTED")
//     return response.json();
// 
