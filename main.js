

(function(){
    let form = document.querySelector('#chat')
    let $message = document.querySelector('#inputBox').value
    form.addEventListener('submit', postMessage(createMessages))
   
   
    // get request

    fetch('https://tiny-taco-server.herokuapp.com/Chatty/')
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
    });
    let createMessages = {
        messages: $message,
        sender:  'isaac',
    }
    // POST
    function postMessage(){
    fetch('https://tiny-taco-server.herokuapp.com/Chatty/',{
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify($message),
    })
    .then(response => response.json())
    .then(data => console.log(data)) // (change this to show message, etc...)
    .catch(error => console.log(error)) // only fire if an error 
    // .finally(() => crossOriginIsolated.log('API\'sare awesome')); // will always fire
    }





    fetch('https://tiny-taco-server.herokuapp.com/Chatty/')
        .then(response => response.json())
        .then(function(messages){
            renderMessages(messages)
            console.log(messages[0].sender)
        })
    
        let user = "";
        while(user == "") {
            user = prompt("Please enter your name")
        }

        function renderMessages(messages){
            let length = messages.length;
            let mostRecent = messages.slice(length -50);
            const list = document.querySelector("#message-list");
            let newList = ''
            console.log("#sender".value)

        mostRecent.forEach(message => {
            if (!document.querySelector(`li[data-id ='${message.id}']`)){
                newList += makeLi(message)
            }
        })
        if (newList != ""){
            list.innerHTML += newList
        }
        }
 function makeLi(message){
     let sender = document.querySelector('#sender').value
     if (message.sender == sender){
         sender = "You"
     } else {
         sender = message.sender
     }
     return `
   <li data-id = '${message.id}' ><strong>${sender}:<strong> ${message.messages}</li>
   `
 }


})();