const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
// app.get("/", (req, res) => {
//   res.send("<h1>Hello World!</h1>")
// })
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/templates/index.html")
})
io.on("connection", (socket) => {
  console.log("a user connected")

  socket.on("chat message", (msg) => {
    console.log("The message is:" + msg)
    io.emit("chat message", msg)
  })
  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
})
server.listen(4500, () => {
  console.log("http://localhost:4500/")
})
