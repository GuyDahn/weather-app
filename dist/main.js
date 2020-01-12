let temp = new TempManager
let render = new Renderer

const loadPage = async function () {
  await temp.getDataFromDB()
  render.render(temp.cityData)
}
loadPage()

handleSearch = async function (cityName) {
  await temp.getCityData(cityName)
  render.render( temp.cityData )
}

$('#search-btn').on('click', function(){
  let cityName = $('#city-input').val()
  $(".city-input").val("")
  handleSearch(cityName)
})


$('.cities-container').on('click', '.save', function(){
let cityName = $(this).siblings('.cname').text()
temp.saveCity(cityName)
})

$('.cities-container').on('click', '.remove', function() {
  let cityName = $(this).siblings(".cname").text()
  temp.removeCity(cityName)
  loadPage()
})