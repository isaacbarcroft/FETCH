

// (function(){

    const chatForm = document.querySelector('#chat-form');
    const messageList = document.querySelector('#message-list');
    const delButton = document.querySelector('.delete')
    const inputButton = document.querySelector('.message').value
    const senderButton = document.querySelector('.sender').value
    const editButton = document.querySelector('.edit')
    

    function generateHTML(message) {
        // construct the message html
        return `
        <br>
            <li>
                <p>${message.id}</p>
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
                // console.log(html);

            });
    }

    // fetchMessages;
    setInterval(fetchMessages, 3000);

    
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
            chatForm.reset();
        }) 
        .catch(error => console.log(error)) 
    }
    delButton.addEventListener('click', messageClear);

    chatForm.addEventListener('submit', function(){
        console.log('hit', editButton.value);
        if (editButton.value) {
            console.log('hit', editButton.value)
            editText(editButton.value);
        } else {
        addMessage();
    }
    });

        
   
function messageClear() {
    fetch("https://tiny-taco-server.herokuapp.com/Chatty")
    .then((response) => response.json())
    .then((data) =>  deleteMessages(data));
}
    function deleteMessages(arr) {
        for (let i = 0; i < arr.length; i++ ){
        
           fetch(`https://tiny-taco-server.herokuapp.com/Chatty'/${arr[i].id}`, {  
               method: 'DELETE',    
           })
           .then (response => {
               if (!response.ok) {
                   throw new Error('uh oh')
               }
               console.log ('DELETED');
           })
        }
    }
function editText(id){
    event.preventDefault();
const message = {
    id: id,
    text: event.target.message.value,
    username: event.target.sender.value,
}
console.log(message);
    fetch(`https://tiny-taco-server.herokuapp.com/Chatty'/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type':  'application/json',
        }, 
        body: JSON.stringify(message),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        html = generateHTML(data);
            messageList.insertAdjacentHTML('beforeend', html);
            chatForm.reset();
    })

    .then (response => {
        if(!response.ok){
            throw new ERROR ('OOPS')
        }
        console.log("DELTED")
        return response.json();
    })
}