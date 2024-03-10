const io = require("socket.io")(3000, {
  cors: {
    origin: [
      "http://localhost:3001",
    ],
    methods: ["GET", "POST"],
  },
});

let uniqueUsers = [];

io.on("connection", (socket) => {
  socket.on("user/new", (nickname) => {
    console.log(nickname, socket.id, " has joined");

    const user = new User(nickname, socket.id);
    uniqueUsers.push(user);
  });

  socket.on("click", ({ x, y, color }) => {
    console.log(x, y);

    io.emit("point", { x, y, color });
  });

  socket.on('message', (message) => {
    console.log('message: ', message)
    socket.broadcast.emit('message', message)
  })
});

class User {
  constructor(nickname, id) {
    this.nickname = nickname;
    this.id = id;
  }

  getNickname() {
    return this.nickname;
  }
}
