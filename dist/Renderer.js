class Renderer {
    render(citiesData) {
        const source = $("#city-template").html()
        const template = Handlebars.compile(source)
        const newHTML = template({ citiesData })
        $(".cities-container").empty().append(newHTML)
    }
}

module.exports = Renderer