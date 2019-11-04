let temp = new TempManager
let render = new Renderer

const loadPage = async function (){
   await temp.getDataFromDB()
   console.log(temp.cityData)
  render.render(temp.cityData)
}
loadPage()

handleSearch = async function(){
    let input = $('city-input').val()
    let cityData = await temp.getCityData(input)
    render.renderData({cityData})
}


