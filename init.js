const username = document.getElementById('username')
const carus = document.querySelector('.carus')
const regis = document.querySelector('.regis')
const starts = document.getElementById('start')
const kembali = document.querySelector('.kembali')

const logoutForm = document.getElementById('logout')
const box1 = document.getElementById('box1')
const box2 = document.getElementById('box2')
const box3 = document.getElementById('box3')
const box4 = document.getElementById('box4')
const box5 = document.getElementById('box5')

const player = new Player()
let default_option = ["💛", "💖", "💥", "🔯", "🐱"]

const allEqual = (arr) => arr.every((val) => val === arr[0]);

function dice() {
  const level = this.sessionStorage.getItem('level')
  let gatcha = []
  if (level == 1) {
    for (let i = 0; i < default_option.length; i++) {
      const roll = default_option[~~(Math.random() * 3)]
      gatcha.push(roll)
    }
    return gatcha
  } else if (level == 2) {
    for (let i = 0; i < default_option.length; i++) {
      const roll = default_option[~~(Math.random() * 4)]
      gatcha.push(roll)
    }
    return gatcha
  } else if (level == 3) {
    for (let i = 0; i < default_option.length; i++) {
      const roll = default_option[~~(Math.random() * 5)]
      gatcha.push(roll)
    }
    return gatcha
  }
}
function reward() {
  fetch("https://zoo-animal-api.herokuapp.com/animals/rand")
    .then((x) => x.json())
    .then((result) => {
      document.querySelector('.hadiah').src = result.image_link
      document.querySelector('.textHadiah').innerHTML = 'Anda belum beruntung <br>Mendapatkan souvenir <br>' + result.name
    });
}

function winner() {
  const level = this.sessionStorage.getItem('level')
  if (level == 1) {
    let arr = [box1.textContent, box2.textContent, box3.textContent];
    if (allEqual(arr)) {
      document.querySelector('audio').src = "win.mp3"
      document.querySelector('.hadiah').src = "win.png"
      document.querySelector('.textHadiah').innerHTML = "Selamat anda Jackpot!!! <br> Saldo anda bertamabh 50"
      document.querySelector('.gambar').classList.toggle('d-none')
      player.saldo += 50
      return;
    }
    document.querySelector('.gambar').classList.toggle('d-none')
    reward();
  } if (level == 2) {
    let arr = [box1.textContent, box2.textContent, box3.textContent, box4.textContent];
    if (allEqual(arr)) {
      document.querySelector('audio').src = "win.mp3"
      document.querySelector('.hadiah').src = "win.png"
      document.querySelector('.textHadiah').innerHTML = "Selamat anda Jackpot!!! <br> Saldo anda bertamabh 100"
      document.querySelector('.gambar').classList.toggle('d-none')
      player.saldo += 100
      return;
    }
    document.querySelector('.gambar').classList.toggle('d-none')
    reward();
  } if (level == 3) {
    let arr = [box1.textContent, box2.textContent, box3.textContent, box4.textContent, box5.textContent];
    if (allEqual(arr)) {
      document.querySelector('audio').src = "win.mp3"
      document.querySelector('.hadiah').src = "win.png"
      document.querySelector('.textHadiah').innerHTML = "Selamat anda Jackpot!!! <br> Saldo anda bertamabh 200"
      document.querySelector('.gambar').classList.toggle('d-none')
      player.saldo += 200
      return;
    }
    document.querySelector('.gambar').classList.toggle('d-none')
    reward();
  }
}
function start() {
  if (player.saldo != 0) {
    this.document.querySelector('.stop').toggleAttribute('disabled')
    this.document.querySelector('.startButton').toggleAttribute('disabled')
    document.querySelector('.startButton').classList.toggle('blink')
    document.querySelector('.stop').classList.toggle('blink')
    document.querySelector('.stop').innerHTML = "Tekan!"
    document.querySelector('.startButton').innerHTML = "Tunggu"
    document.querySelector('audio').src = "play.mp3"
    const rolling = setInterval(function () {
      const result = dice()
      box1.textContent = result[0]
      box2.textContent = result[1]
      box3.textContent = result[2]
      box4.textContent = result[3]
      box5.textContent = result[4]
    }, 100)

    document.querySelector('.stop').onclick = function () {
      document.querySelector('.startButton').toggleAttribute('disabled')
      document.querySelector('.stop').toggleAttribute('disabled')
      document.querySelector('.startButton').classList.toggle('blink')
      document.querySelector('.stop').classList.toggle('blink')
      document.querySelector('.startButton').innerHTML = "Putar!"
      document.querySelector('.stop').innerHTML = "Tunggu"
      document.querySelector('audio').src = ""
      clearInterval(rolling)
      winner()
      player.saldo -= 10
      document.querySelector('.kredit1').innerHTML = "Saldo Anda " + player.saldo
    }
  } else {
    document.querySelector('.mod').classList.toggle('d-none')
  }
}

onload = function () {
  const token = this.sessionStorage.getItem('token')
  if (token && token != null) {
    starts.style.display = "block"
    carus.classList.toggle('d-none')
    regis.classList.toggle('d-none')
    this.document.querySelector('.prof').classList.toggle('d-none')
    document.querySelector('.tok').innerHTML = "Selamat Bermain " + token
    document.querySelector('.kredit1').innerHTML = "Saldo Anda " + player.saldo
    document.querySelector('.kredit2').style.display = "none"
    document.querySelector('.kredit3').style.display = "none"
    document.querySelector('.kredit4').classList.toggle("d-none")
    this.document.querySelector('.gambBank').classList.toggle('d-none')
    cek()
  }
}
function cek() {
  const level = this.sessionStorage.getItem('level')
  console.log(level)
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

function logout() {
  carus.classList.toggle('d-none')
  regis.classList.toggle('d-none')
  this.document.querySelector('.prof').classList.toggle('d-none')
  this.document.querySelector('.gambBank').classList.toggle('d-none')
  sessionStorage.removeItem('token')
  location.reload()
}

kembali.onclick = function () {
  document.querySelector('.gambar').classList.toggle('d-none')
  document.querySelector('.hadiah').src = ""
  document.querySelector('.textHadiah').innerHTML = ""
}

document.querySelector('.modBatal').onclick = function () {
  document.querySelector('.mod').classList.toggle('d-none')
}

document.querySelector('.lanjut').onclick = function () {
  if (document.querySelector('#depo').value == 1) {
    let sald = 50
    player.saldo = sald
  } else if (document.querySelector('#depo').value == 2) {
    let sald = 100
    player.saldo = sald
  } else if (document.querySelector('#depo').value == 3) {
    let sald = 200
    player.saldo = sald
  }
  document.querySelector('.mod').classList.toggle('d-none')
  document.querySelector('.kredit1').innerHTML = "Saldo Anda " + player.saldo
  document.querySelector('.alrt').classList.toggle('d-none')
  setTimeout(() => {
    document.querySelector('.alrt').classList.toggle('d-none')
  }, 2000);
}


function register() {
  if (username.value != "" && username.value != null) {
    player.username = username.value
    sessionStorage.setItem('nama', document.querySelector('#username').value)
    const level = document.querySelector('#level').value
    sessionStorage.setItem('level', level)
    const random = ~~(Math.random() * 10000)
    const token = player.username + random.toString()
    sessionStorage.setItem('token', token)

    onload()
  }
}
setInterval(() => {
  document.querySelector('.depoBank').innerHTML = 'Dapatkan<br>Hadiah'
  setTimeout(() => {
    document.querySelector('.depoBank').innerHTML = 'Pesan<br>Sekarang'
  }, 3000);
}, 2000);

function conKeluar() {
  document.querySelector('.kelu').classList.toggle('d-none')
}
document.querySelector('.batKeluar').onclick = function () {
  document.querySelector('.kelu').classList.toggle('d-none')
}

function ambilPro() {
  const nama = this.sessionStorage.getItem('nama')
  const level = this.sessionStorage.getItem('level')
  document.querySelector('.proff').classList.toggle('d-none')
  document.querySelector('.profText').innerHTML = "Nama : " + nama +
    "<br> Level : " + level + "<br> Token : " + player.saldo

}
document.querySelector('.profExit').onclick = function () {
  document.querySelector('.proff').classList.toggle('d-none')

}