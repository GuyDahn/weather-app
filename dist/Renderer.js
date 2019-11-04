class Renderer {
  render(cityData) {
    const source = $("#city-template").html()
    const template = Handlebars.compile(source)
    const newHTML = template({ cityData })
    $(".cities-container").empty().append(newHTML)
  }
}

