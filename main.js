const search = document.querySelector('.search')
const city = document.querySelector('.city')
const country = document.querySelector('.country')
const time = document.querySelector('.time')
const value = document.querySelector('.value')
const shortDesc = document.querySelector('.short-desc')
const visibility = document.querySelector('.visibility span')
const wind = document.querySelector('.wind span')
const cloud = document.querySelector('.cloud span')
const content = document.querySelector('.content')
const body = document.querySelector('body')

async function weatherChangeUi(capitalValue) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${capitalValue}&appid=80377f6ea45a48d2fbe9bc9b47934413`

  let data = await fetch(api).then((response) => response.json())
  console.log(data)

  if (data.cod === 200) {
    content.classList.remove('hide')

    city.innerText = data.name
    country.innerText = data.sys.country
    time.innerText = new Date().toLocaleString('vi')
    value.innerText = Math.round(data.main.temp - 273.15)
    shortDesc.innerText = data.weather[0] ? data.weather[0].main : ''
    visibility.innerText = `${data.visibility} (m)`
    wind.innerText = `${data.wind.speed} (m/s)`
    cloud.innerText = `${data.main.humidity} (%)`

    // hot and cold
    if (value.innerText <= 40) {
      body.setAttribute('class', 'hot')
    }
    if (value.innerText <= 23) {
      body.setAttribute('class', 'cold')
    }
  } else {
    content.classList.add('hide')
  }
}

search.onkeypress = function (e) {
  if (e.code === 'Enter') {
    let capitalValue = search.value.trim()
    weatherChangeUi(capitalValue)
  }
}

weatherChangeUi('Quy Nhon')
