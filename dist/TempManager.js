class TempManager {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        let cities = await $.get('/cities')
        this.cityData = cities
    }

    async getCityData(cityName) {
        let data = await $.get(`/city/${cityName}`)
        try {
            if (data instanceof Error) {
                throw new Error(e)
            } else {
                let city = { ...data }
                this.cityData.push(city)
            }
        } catch(e) {
            console.log(e)
        }  
    }

	saveCity(cityName) {
		const city = this.cityData.find(c => c.name === cityName)
		$.post(`/city/`, city, () => console.log(`saved ${cityName}`))
	}

    removeCity(cityName) {
        $.ajax({
            method: 'delete',
            url: '/city',
            data: { city: cityName },
            success: () => console.log(`Removed ${cityName}`),
            error: (e) => console.log(e)
        })
    }
}

