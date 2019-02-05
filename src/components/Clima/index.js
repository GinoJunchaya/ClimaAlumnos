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
            ciudad: "Asunción"
        };
    }

    componentWillMount(){
        this.getClimaActual();
    }

    render(){

        var datosClima = this.state.datosClima;

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
                        <h4>{diasSemana[fecha.getUTCDay()]}</h4>
                        <h4>{datosClima.current.condition.text}</h4>
                    </section>
                    <section>
                        <span className="temperatura-visor">30</span>
                        <a className="temperatura-u-medida">C°</a> 
                        <a className="temperatura-u-medida">F°</a>
                    </section>
                </section>
                <section className="clima-block">
                    <h4><b>Visibilidad:</b> 20 km</h4>                    
                    <h4><b>Humedad:</b> 50%</h4>
                    <h4><b>Velocidad del viento:</b> 20 km/h</h4>
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
                this.setState({
                    datosClima: res,
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

}

export default Clima;