const $ = selector => document.querySelector(selector)

const playAudio = key => {
  const audio = $(`audio[data-key="${key.toLowerCase()}"]`)
  if(!audio) return

  audio.currentTime = 0
  audio.play()
}

const animate = (what, force = null) => {
  if (force === true) return what.classList.add("active")
  if (force === false) return what.classList.remove("active")
  what.classList.toggle("active")
}

const execute = key => {
  const audio = $(`audio[data-key="${key}"]`)
  const keyElement = $(`.drum-piece > button[data-key="${key}"]`)
  
  if(!audio) return

  animate(keyElement)

  audio.currentTime = 0
  audio.play()
}

const keyboardExecute = event => {
  if (!event.code) return

  const key = event.code.toLowerCase()
  execute(key)
}

const drumPieces = document.querySelectorAll(".drum-piece > button")
drumPieces.forEach(drumPiece => {
  drumPiece.addEventListener("click", () => execute(drumPiece.getAttribute("data-key")))
  drumPiece.addEventListener("focus", () => drumPiece.blur())
  drumPiece.addEventListener("transitionend", () => animate(drumPiece, false))
})
window.addEventListener("keydown", keyboardExecute)