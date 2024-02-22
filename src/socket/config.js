import { Manager } from "socket.io-client"

class SocketService {
  constructor() {
    this.socket = null
  }

  connect(url, token, fcmToken) {
    if (!this.socket && url) {
      return new Promise((rs, rj) => {
        const clientManager = new Manager(url, {
          path: "/realtime/socket.io",
          extraHeaders: {
            token: `${token}`
          }
        })

        const optionAuth = {
          auth: {}
        }

        this.socket = clientManager.socket("/", optionAuth)

        if (this.socket && this.socket.connected) return rj()

        this.socket.on("connect", () => {
          console.log("connect socket =>", this.socket?.id)
          rs(this.socket)
        })

        this.socket.on("connect_error", (err) => {
          console.log("connect_error", err)
          rj(err)
        })
      })
    }
    return new Promise((rs, rj) => {
      rs(this.socket)
    })
  }

  sendDevice(payload) {
    this.socket?.emit("SEND_INFO_DEVICE_CSS", payload)
  }

  disconnect() {
    this.socket?.disconnect()
    this.socket = null
  }
}

export default new SocketService()
