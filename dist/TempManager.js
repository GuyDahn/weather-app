class TempManager {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        let data = await $.get('/cities')
        cityData = data
        console.log(cityData)
    }

    async getCityData(cityName) {
        try {
            let data = await $.get(`/city/:${cityName}`)
            let city = { ...data }
            this.cityData.push(city)
        } catch (e) {
            console.log(e)
        }
    }

    saveCity(cityName) {
        let city = this.cityData.filter(c => c.name === cityName)
        $.post('/city', city, () => console.log(`saved ${cityName}`))
    }

    removeCity(cityName) {
        $.ajax({
            method: 'delete',
            url: '/city',
            body: cityName,
            success: () => console.log(`removed ${cityName}`)
        })
    }
}

module.exports = TempManager