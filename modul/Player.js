class Player {
  constructor() {
    this._username = ""
    this.saldo = 20
  }

  generateToken() {
    const random = ~~(Math.random() * 10000)
    const token = this.username + random.toString()
    return token
  }

  set username(_username) {
    return this._username = _username

  }
  get username() {
    return this._username

  }

  cek() {
    let level = document.querySelector('#level').value
    if (level == 1) {
      box1.textContent = default_option[0]
      box2.textContent = default_option[1]
      box3.textContent = default_option[2]
      box4.style.display = "none"
      box5.style.display = "none"

    } else if (level == 2) {

      box1.textContent = default_option[0]
      box2.textContent = default_option[1]
      box3.textContent = default_option[2]
      box4.textContent = default_option[3]
      box5.style.display = "none"

    } else if (level == 3) {

      box1.textContent = default_option[0]
      box2.textContent = default_option[1]
      box3.textContent = default_option[2]
      box4.textContent = default_option[3]
      box5.textContent = default_option[4]

    }
  }

  get register() {
    sessionStorage.setItem('token', this.generateToken())
    onload()
    this.cek()
  }
  get logout() {
    sessionStorage.removeItem('token')
    location.reload()
  }
}
