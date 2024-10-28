import { Server } from "http";
import { Socket } from "socket.io";
import { Server as SocketIOServer } from "socket.io";


interface IOnlineUserData {
    userId: string;
    socketId: string;
    lastActive: Date | string;
    isOnline: boolean;
}
const onlineUsers: IOnlineUserData[] = [];
const connectSocketIo = (server: Server) => {
    try {
        const io = new SocketIOServer(server, {
            cors: {
                origin: ["http://localhost:5173"],
                methods: ["GET", "POST"],
                credentials: true,
            },
        });

        io.on("connection", (socket: Socket) => {
            const userId = socket.handshake.query.userId as string;
            if (userId) {
                const existUserIndex=onlineUsers.findIndex((x)=>x.userId===userId)
                if(existUserIndex!==-1){
                    onlineUsers[existUserIndex].isOnline=true;
                    onlineUsers[existUserIndex].lastActive='';
                    onlineUsers[existUserIndex].socketId=socket.id;
                }else{
                    onlineUsers.push({
                        userId,
                        socketId: socket.id,
                        lastActive: '',
                        isOnline: true,
                    });
                }
            }
            console.log(onlineUsers, 'online users')

            socket.on('getOnlineStatus', () => { 
                io.emit('userStatus', onlineUsers);
                console.log('emtted online user to the front end');
            });
             
            // io.emit('getOnlineStatus',)

       
                io.emit('userStatus', onlineUsers);
                console.log('emitted user status whenever  loggins happnes')
               console.log(onlineUsers,'login emitted')
          

            socket.on("joinRoom", (chatId: string) => {
                if (chatId) {
                    socket.join(chatId);
                    console.log(`User ${userId} joined room ${chatId}`);
                }
            }); 
 
            socket.on("newMessage", (data) => {
                const { chatId } = data;
                if (chatId) {
                    io.to(chatId).emit("receiveMessage", data);
                } else {
                    console.log('failed to emit receive message');
                }  
            }); 
   
            socket.on("disconnect", () => {
                console.log('disconnected ')
                if (userId) {
                    const userIndex = onlineUsers.findIndex(user => user.userId === userId);
                    if (userIndex !== -1) {
                        onlineUsers[userIndex].isOnline = false;
                        onlineUsers[userIndex].lastActive = new Date().toISOString();
                        onlineUsers[userIndex].userId=userId
                     }
                    io.emit("userStatus", onlineUsers);
                } 
            });  
        

    
        });
                    // console.log(onlineUsers, 'online users')

 
    } catch (error) {
        console.log(error);
    }
};

export default connectSocketIo;  