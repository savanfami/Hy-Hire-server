import { Server } from "http";
import { ChatMessage } from "../../infrastructure/database/mongo/model/chatMessageSchema";
import { Chat } from "../../infrastructure/database/mongo/model/chatSchema";
import { Socket } from "socket.io";
import { Server as SocketIOServer } from "socket.io";
import handleCallEvents from "./handleCallEvents";
interface IOnlineUserData {
    userId: string;
    socketId: string;
    lastActive: Date | string;
    isOnline: boolean;
}
const onlineUsers: IOnlineUserData[] = [];
const activeUsersInRooms: { [key: string]: Set<any> } = {};
const rooms: Record<string, string[]> = {};
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
            console.log('socket-connected')
            const userId = socket.handshake.query.userId as string;
            if (userId) {
                const existUserIndex = onlineUsers.findIndex((x) => x.userId === userId)
                if (existUserIndex !== -1) {
                    onlineUsers[existUserIndex].isOnline = true;
                    onlineUsers[existUserIndex].lastActive = '';
                    onlineUsers[existUserIndex].socketId = socket.id;
                } else {
                    onlineUsers.push({
                        userId,
                        socketId: socket.id,
                        lastActive: '',
                        isOnline: true,
                    });
                }
            }

            socket.on('getOnlineStatus', () => {
                io.emit('userStatus', onlineUsers);
            });




            // io.emit('getOnlineStatus',)


            io.emit('userStatus', onlineUsers);


            socket.on("joinRoom", (chatId: string) => {
                if (chatId) {
                    socket.join(chatId);
                    if (!activeUsersInRooms[chatId]) {
                        activeUsersInRooms[chatId] = new Set();
                    }
                    activeUsersInRooms[chatId].add(userId);

                }
                console.log(activeUsersInRooms, 'activ euser isn room')
            });


            socket.on("newMessage", async (data) => {
                const { chatId } = data;
                if (chatId) {
                    io.to(chatId).emit("receiveMessage", data);
                    try {
                        const updatedChat = await Chat.findById(chatId);
                        console.log(updatedChat,'update chat')
                        if (updatedChat) {
                            const senderId = updatedChat.messageSender.toString()
                            const usersInRoom = activeUsersInRooms[chatId];
                            if (usersInRoom) {
                                const recipientId = [...usersInRoom].find(userId => userId !== senderId);
                                if (usersInRoom.has(senderId) && usersInRoom.has(recipientId)) {
                                    console.log('both users in the chat')
                                    updatedChat.unreadCount = 0
                                    await updatedChat.save()
                                    await ChatMessage.updateMany(
                                        {
                                            chatId,
                                            isRead: false
                                        },
                                        {
                                            isRead: true
                                        },
                                        { new: true }
                                    );
                                    socket.emit('updatedMessageStatus', chatId)
                                    socket.emit('lastMessageUpdated',{chatId,messageSender:updatedChat.messageSender,lastMessage:updatedChat.lastMessage})
                                } else {
                                    io.emit("unreadCountUpdated", {
                                        chatId,
                                        unreadCount: updatedChat.unreadCount,
                                        messageSender: updatedChat.messageSender,
                                        lastMessage: updatedChat.lastMessage,
                                    });
                                    console.log(`Unread count for chat ${chatId} updated to ${updatedChat.unreadCount}`);
                                }
                            } else {
                                console.log("Room has insufficient users or does not exist.");
                            }
                        } else {
                            console.log('no data')
                        }

                        // if (updatedChat && (!activeUsersInRooms[chatId] )) {
                        //     io.emit("unreadCountUpdated", {
                        //         chatId,
                        //         unreadCount: updatedChat.unreadCount,
                        //         messageSender: updatedChat.messageSender,
                        //         lastMessage: updatedChat.lastMessage,
                        //     });
                        //     console.log(`Unread count for chat ${chatId} updated to ${updatedChat.unreadCount}`);
                        // }
                    } catch (error) {
                        console.error("Failed to update unread count:", error);
                    }

                } else {
                    console.log('failed to emit receive message');
                }
            });

            socket.on("leaveRoom", (chatId: string) => {
                if (chatId && userId) {
                    const usersInRoom = activeUsersInRooms[chatId];
                    if (usersInRoom) {
                        usersInRoom.delete(userId);
                        console.log(`User ${userId} left room ${chatId}`);
                        if (usersInRoom.size === 0) {
                            delete activeUsersInRooms[chatId];
                            console.log(`Room ${chatId} is now empty and removed from activeUsersInRooms`);
                        }
                    }
                }
            });

            socket.on('openChat', async (chatId, userId) => {
                const unreadMessages = await ChatMessage.find({
                    chatId,
                    senderId: { $ne: userId },
                    isRead: false   
                });

                console.log(unreadMessages, 'unread messges')
                // if (unreadMessages.length===0) {
                //     return;
                // }
                await ChatMessage.updateMany(
                    {
                        chatId,
                        senderId: { $ne: userId },
                        isRead: false
                    },
                    {
                        isRead: true
                    }
                );


                await Chat.findOneAndUpdate(
                    { _id: chatId, messageSender: { $ne: userId } },
                    { unreadCount: 0 }, 
                    { new: true } 
                  );
                socket.emit('updatedMessage', chatId)
                console.log('emitted')
            })



            //video call events

            handleCallEvents(socket, io, rooms);


            socket.on("disconnect", () => {
                if (userId) {
                    const userIndex = onlineUsers.findIndex(user => user.userId === userId);
                    if (userIndex !== -1) {
                        onlineUsers[userIndex].isOnline = false;
                        onlineUsers[userIndex].lastActive = new Date().toISOString();
                        onlineUsers[userIndex].userId = userId;
                    }
                    for (const chatId in activeUsersInRooms) {
                        const usersInRoom = activeUsersInRooms[chatId];
                        if (usersInRoom) {
                            usersInRoom.delete(userId);
                            console.log(`User ${userId} removed from room when disconnected ${chatId}`);
                            if (usersInRoom.size === 0) {
                                delete activeUsersInRooms[chatId];
                                console.log(`Room ${chatId} is now empty and removed from activeUsersInRooms`);
                            }
                        }
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