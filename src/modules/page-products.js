import { LitElement, css, html } from 'lit';

export class pageProducts extends LitElement {
    constructor(){
        super()
        this.data={}
    }
    
    firstUpdated(){
    
            try {
            // Enviar una solicitud GET a la API
            const response = await fetch('https://66560fd13c1d3b60293c1866.mockapi.io/:products');
        
            // Convertir la respuesta JSON a un objeto JavaScript
            this.data = await response.json();
        
            // Procesar los datos obtenidos
            data.forEach(item => {
                console.log(item.price)
    
    
            });
            } catch (error) {
            console.error(`No se pudo obtener los datos: ${error}`);
            }
        }
    }
    
    customElements.define("page-inventory", pageInventory);
