import { Server } from "http";
import { Socket } from "socket.io";
import { Server as SocketIOServer } from "socket.io";

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
            console.log("Socket Connected", socket.id);

            socket.on("newMessage",(data)=>{
                 console.log(data)
            })

            const userId = socket.handshake.query.userId as string;
            if (userId) {
                console.log(`User ${userId} connected with socket ${socket.id}`);
            }
            socket.on("disconnect", (reason) => {
                console.log(`User disconnected: ${reason}`);
            });
        });

    } catch (error) {
        console.log(error);
    }
};

export default connectSocketIo;
