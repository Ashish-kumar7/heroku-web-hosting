// Node Server which will handle socket io connections
const io=require("socket.io")(8000);

const users={};

io.on('connection',socket=>{

    socket.emit('connected');

    socket.on('new-user-joined',name=>{
        console.log(name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit( 'receive',{ message:message , name:users[socket.id]} );
    });

    socket.on('disconnect',()=>{
        const name=users[socket.id];
        socket.broadcast.emit('left',name);
        delete users[socket.id];
    });
    
});