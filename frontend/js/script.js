// login elements
const login = document.querySelector(".login")
const loginForm = login.querySelector(".login__form")
const loginInput = login.querySelector(".login__input")

// chat elements
const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".chat__input")
const chatMessages = chat.querySelector(".chat__messages")

const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink"
]

const user = { id: "", name: "", color: "" }

let webSocket

const bot = {
    id: "bot-furia-001",
    name: "FURIOSO",
    color: "gold"
}

const createMessageSelfElement = (content) => {
    const div = document.createElement("div")
    div.classList.add("message--self")
    div.innerHTML = content
    return div
}

const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")
    div.classList.add("message--other")
    span.classList.add("message--sender")
    span.style.color = senderColor
    span.textContent = sender
    div.appendChild(span)
    const messageText = document.createElement("span")
    messageText.innerHTML = ` ${content}`
    div.appendChild(messageText)
    return div
}

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}

const commandList = document.getElementById("command-list")
chatInput.addEventListener("input", () => {
    commandList.style.display = chatInput.value.startsWith("!") ? "block" : "none"
})

const runBotCommand = (msg) => {
    const content = msg.toLowerCase()
    const commands = {
        "!proximojogo": "📅 O próximo jogo da FURIA é neste sábado às 18h contra a LOUD.",
        "!elenco": "🎮 Elenco atual: KSCERATO, yuurih, arT, chelo e FalleN.",
        "!resultados": "📊 Últimos resultados: FURIA 2x1 MIBR, FURIA 0x2 NAVI.",
        "!torcida": "🎺 A TORCIDA ESTÁ EM PESO! Grita junto: VAI FURIAAAA! 🔥💛🖤",
        "!historico": "📖 A FURIA já venceu 3 títulos importantes, incluindo ESL Pro League e CBCS Elite."
    }
    if (commands[content]) return commands[content]
    if (content === "!mascote") {
        const quotes = [
            "🐅 Ruge alto, FURIOSO!",
            "⚔️ Com garra e sangue nos olhos!",
            "🔥 Vamos pra cima que hoje é dia de vitória!",
            "🐾 Eu vi você aí na arquibancada, tá lindo de FURIA!"
        ]
        return quotes[Math.floor(Math.random() * quotes.length)]
    }
    return null
}

const processMessage = ({ data }) => {
    const { userId, userName, userColor, content } = JSON.parse(data)
    const isSelf = userId === user.id
    const message = isSelf 
        ? createMessageSelfElement(content) 
        : createMessageOtherElement(content, userName, userColor)
    chatMessages.appendChild(message)
    scrollScreen()
}

const handleLogin = (event) => {
    event.preventDefault()
    user.id = crypto.randomUUID()
    user.name = loginInput.value.trim()
    user.color = getRandomColor()

    if (!user.name) {
        alert("Por favor, insira um nome de usuário.")
        return
    }

    login.style.display = "none"
    chat.style.display = "flex"

    webSocket = new WebSocket("ws://localhost:8080")
    webSocket.onmessage = processMessage
}

const sendMessage = (event) => {
    event.preventDefault()
    const text = chatInput.value.trim()
    if (!text) return

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: text,
    }

    webSocket.send(JSON.stringify(message))

    const botReply = runBotCommand(text)
    if (botReply) {
        const botMessage = {
            userId: bot.id,
            userName: bot.name,
            userColor: bot.color,
            content: botReply
        }
        webSocket.send(JSON.stringify(botMessage))
    }

    chatInput.value = ""
    commandList.style.display = "none"
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)