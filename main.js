

// (function(){

const chatForm = document.querySelector('#chat-form');
const messageList = document.querySelector('#message-list');
const delButton = document.querySelector('.delete');
const inputButton = document.querySelector('.message').value;
const senderButton = document.querySelector('.sender').value;



function deleteMessage(event) {
    console.log('delete function')
    fetch(`https://tiny-taco-server.herokuapp.com/Chatty/${event.target.dataset.id}/`, {
        method: 'DELETE',
    })
        .then(response => console.log(response));
}



function generateHTML(message) {
    // construct the message html
    console.log(message.id)
    console.log(message)
    return `
        <br>
            <li data-id=${message.id}>
            <span><p>${message.username} said</p></span>
                <p>${message.text}</p>
                <input class="userEdit" type="text" name="user" placeholder="new user">
                <input class="messageEdit" type="text" name="edit" placeholder="new message">
                <button class="edit" data-id=${message.id}>Edit Me</button>
                <button class="deleteButton" data-id=${message.id}>Delete Me</button>
            </li>
        `
}

function fetchMessages(event) {
    fetch('https://tiny-taco-server.herokuapp.com/Chatty/')
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            let html = "";
            for (let i = 0; i < data.length; i++) {
                html += generateHTML(data[i]);
            }
            messageList.innerHTML = html;
        });
}

// fetchMessages;
setInterval(fetchMessages, 10000);


function addMessage(event) {
    event.preventDefault();
    const message = {
        text: event.target.message.value,
        username: event.target.sender.value,
    }

    fetch('https://tiny-taco-server.herokuapp.com/Chatty/', {
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
chatForm.addEventListener('submit', addMessage);






// function messageClear() {
//     fetch("https://tiny-taco-server.herokuapp.com/Chatty")
//         .then((response) => response.json())
//         .then((data) => deleteMessages(data));
// }
// function deleteMessages(arr) {
//     for (let i = 0; i < arr.length; i++) {

//         fetch(`https://tiny-taco-server.herokuapp.com/Chatty'/${arr[i].id}`, {
//             method: 'DELETE',
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('uh oh')
//                 }
//                 console.log('DELETED');
//             })
//     }
// }
function editText(event, editInput, username) {
    console.log('input', editInput.target)
    event.preventDefault();
    console.log('edit',event.target.dataid)
    const message = {
        username: username,
        text: editInput,
    }
    console.log({message});
    console.log(event.target.value);
    fetch(`https://tiny-taco-server.herokuapp.com/Chatty/${event.target.dataset.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    })
        .then(response => response.json())
        // .then(data => {
        //     html = generateHTML(data);
        //     messageList.insertAdjacentHTML('beforeend', html);
        //     chatForm.reset();
        // })

        .then(response => {
            if (response.ok) {
                return response.json();
            }
            console.log("DELTED")
            throw new ERROR('OOPS')
        })
}


document.body.addEventListener('click', function(event){
    console.log(event.target)
    console.log(event.target.dataset.id)
    if (event.target.classList.contains('deleteButton')){
        console.log('delete')
        deleteMessage(event);
    }
    else if(event.target.classList.contains('edit')){
        console.log('edit')
        const editInput = document.querySelector('.messageEdit');
        const userEdit = document.querySelector('.userEdit');
        console.log({editInput})
        console.log(editInput.value)
        console.log({event})
        const messageId = event.target.dataset.id
        deleteElement(messageId)
        editText(event, editInput.value, userEdit.value);
    }
});

function deleteElement (id) {
    const element = document.querySelector(`[data-id='${id}']`)
    element.remove()
    console.log({element})
}
