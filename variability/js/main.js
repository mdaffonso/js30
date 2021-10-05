const $$ = selector => document.querySelectorAll(selector)

function handleChange () { 
  if (this.value === this.dataset.prev) return
  document.documentElement.style.setProperty(this.dataset.var, this.value + (this.dataset.suffix || ""))
  this.dataset.prev = this.value
}

$$('.input-group > input').forEach(input => {
  input.addEventListener("change", handleChange)
  input.addEventListener("mousemove", handleChange)
})