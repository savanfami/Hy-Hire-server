import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

interface IRoomParams {
  roomId: string;
  userId: string;
}

const handleCallEvents = (socket: Socket, io: any, rooms: Record<string, string[]>) => {
    socket.on('create-videocall-room',(userId)=>{
        const roomId=uuidV4()
        console.log(roomId,'(-------------------')
        rooms[roomId] = [];
        socket.emit('room-created',roomId)
        // console.log('emitted')
       })


  socket.on("join-call-room", ({ roomId, userId }: IRoomParams) => {
    console.log('join room called')
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    rooms[roomId].push(userId);
    console.log(rooms,'rooooooooooooooms')
    socket.join(roomId);
    socket.to(roomId).emit("user-joined-room", userId);
    io.to(socket.id).emit("existing-users", rooms[roomId].filter((id) => id !== userId));

    // Send streams from existing users to the new user
    rooms[roomId].forEach((existingUserId) => {
      if (existingUserId !== userId) {
        socket.to(existingUserId).emit("new-user-joined", userId);
      }
    });

    socket.on("disconnect", () => {
      // Add a check to make sure roomId exists before accessing rooms[roomId]
      if (rooms[roomId]) {
        rooms[roomId] = rooms[roomId].filter((id) => id !== userId);
        if (rooms[roomId].length === 0) {
          delete rooms[roomId]; // Optionally delete the room if it's empty
        }
      }
      socket.to(roomId).emit("user-disconnected", userId);
    });
  });
};

export default handleCallEvents;