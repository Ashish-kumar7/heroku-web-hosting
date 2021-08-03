const socket=io('http://process.env.HOST:process.env.PORT');

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');

var audio=new Audio('ting.mp3');

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerHTML=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',messageInput.value);
    messageInput.value='';
})

const user_name=prompt("Enter Your name to join!!");

socket.emit('new-user-joined',user_name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`, 'center');
});

socket.on('receive',data=>{
    console.log(data);
    append(data.name + ":" + data.message , 'left');
});

socket.on('connected',()=>{
    append('Messages are not encypted end to end' ,'center');
});

socket.on('left',name=>{
    append(`${name} left the chat`,'center');
});