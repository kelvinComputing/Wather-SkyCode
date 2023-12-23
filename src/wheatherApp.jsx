import { useState } from "react"



export const WheaterApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = import.meta.env.VITE_CLIMA_API_KEY
    const difKelvin = 273.15

    

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(ciudad.length > 0)  fetchClima() 
    }

    const fetchClima = async () => {
        try{
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        } catch (error) {
            console.error ('ocurrio el siguiente problema: ', error)
        }        
    }
    







    return (
        <div className="container">


            <h1>Aplicación Del Clima</h1>

            <form onSubmit={handleSubmit} 
                action="">
                <input type="text"
                value={ciudad}
                onChange={handleCambioCiudad}
                />
                <button type="submit">Buscar</button>
            </form>

            {
                dataClima && (
                    <div> 
                        <h2>{dataClima.name}</h2>
                        <p>Estado: {dataClima.sys.country}</p>
                        <p className="temp">Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                        <p>Temp-min: {parseInt(dataClima?.main?.temp_min - difKelvin)}°C <span>Temp-max: {parseInt(dataClima?.main?.temp_max - difKelvin)}°C</span> </p>
                        <p>Condición meteorológica: {dataClima.weather[0].description}</p>
                        <div className="img-center"> 
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
                        </div>
                    </div>
                )
            }



        </div>
    )
}
