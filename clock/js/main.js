import BG from "./backgrounds.js"

const $ = selector => document.querySelector(selector)

const setBg = () => {
  const day = getTime().d
  const index = day % (BG.length-1)

  const data = BG[index]
  $("body").style.setProperty("background-image", `url("${data.url}")`)
  $("#artist").href = data.profile
  $("#artist").innerText = data.artist
}

const getTime = () => {
  const now = new Date()
  const d = now.getDate()
  const h = now.getHours()
  const m = now.getMinutes()
  const s = now.getSeconds()

  return {d, h, m, s}
}

const rotateHand = (what, rotation) => {
  if (rotation === 0) {
    what.classList.add("no-transition")
  }
  what.style.transform = `translateX(-50%) rotate(${rotation}deg)`
  setTimeout(() => what.classList.remove("no-transition"), 1)
}

const setHands = () => {
  const funcMatrix = [
    { hand: $("#second"), rotation: getTime().s / 60 * 360 },
    { hand: $("#minute"), rotation: getTime().m / 60 * 360 },
    { hand: $("#hour"), rotation: getTime().h / 12 * 360 },
  ]

  for (let {hand, rotation} of funcMatrix) {
    rotateHand(hand, rotation)
  }
}

const getFormatted = int => {
  const string = `${int}`
  if (string.length > 2) return "00"
  return string.length === 2 ? string : `0${string}`
}

const setDisplay = () => {
  const hour = getFormatted(getTime().h)
  const minute = getFormatted(getTime().m)
  const second = getFormatted(getTime().s)

  $("#d-hour").innerText = hour
  $("#d-minute").innerText = minute
  $("#d-second").innerText = second
}

const setTime = () => {
  setHands()
  setDisplay()
}

setInterval(setTime, 1000)
setBg()