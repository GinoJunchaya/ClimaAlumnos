import React, {Component} from 'react';
import $ from 'jquery';
import "./clima.css";

class Clima extends Component{

    constructor(props, context){
        super(props);
        this.state = {
            loading: false,
            datosClima: undefined,
            apiKey: "894da49a97d24e28b9b225614190402",
            ciudad: "Asunción",
            medidaTemperatura: "c",
            temperaturaMostrar: undefined
        };
    }

    componentWillMount(){
        this.getClimaActual();
    }

    render(){

        var datosClima = this.state.datosClima;

        if(this.state.loading){
            var loading = require("./loading.gif");
            return(
                <section className="clima-container">
                    <img src={loading}/>     
                </section>
            );
        }

        if(datosClima === undefined){
            return(
                <span>Datos no encontrados</span>
            );                     
        }

        var diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        var fecha = new Date(datosClima.location.localtime);

        return(
            <section className="clima-container">
                <section className="clima-block">
                    <section>
                        <h3><b>{datosClima.location.name}</b></h3>
                        <h4>{diasSemana[fecha.getUTCDay()] + ", " + fecha.toLocaleTimeString()}</h4>
                        <h4>{datosClima.current.condition.text}</h4>
                    </section>
                    <section>
                        <img src={datosClima.current.condition.icon} />
                        <span className="temperatura-visor">{Math.ceil(this.state.temperaturaMostrar)}</span>
                        <a style={{fontWeight: this.state.medidaTemperatura === "c" ? "500" : "200"}} href="#" onClick={this.seleccionarCelsius.bind(this)} className="temperatura-u-medida">C°</a>&nbsp;
                        <a style={{fontWeight: this.state.medidaTemperatura === "f" ? "500" : "200"}} href="#" onClick={this.seleccionarFarenheit.bind(this)} className="temperatura-u-medida">F°</a>
                    </section>
                </section>
                <section className="clima-block-right">
                    <h4><b>Visibilidad:</b> {datosClima.current.vis_km} km</h4>
                    <h4><b>Humedad:</b> {datosClima.current.humidity}%</h4>
                    <h4><b>Velocidad del viento:</b> {datosClima.current.wind_kph} km/h</h4>
                    <button onClick={this.getClimaActual.bind(this)}>Actualizar</button>
                </section>
            </section>
        );
    }

    getClimaActual(){
        this.setState({
            loading: true
        });
        $.ajax({
            type: "GET",
            url: "http://api.apixu.com/v1/current.json?key=" + this.state.apiKey + "&q=" + this.state.ciudad,
            success: function (res) {
                console.log(res);
                this.setState({
                    datosClima: res,
                    temperaturaMostrar: res.current.temp_c,
                    loading: false
                });
            }.bind(this),
            error: function(xhr, status, err){
                this.setState({
                    datosClima: undefined,
                    loading: false
                });
            }.bind(this),
            timeout: 3000
        });
    }

    seleccionarCelsius(e){
        e.preventDefault();
        this.setState({
            medidaTemperatura: "c",
            temperaturaMostrar: this.state.datosClima.current.temp_c
        });
    }

    seleccionarFarenheit(e){
        e.preventDefault();
        this.setState({
            medidaTemperatura: "f",
            temperaturaMostrar: this.state.datosClima.current.temp_f
        });
    }

}

export default Clima;