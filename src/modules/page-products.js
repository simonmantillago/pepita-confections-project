import { LitElement, css, html } from 'lit';

export class pageProducts extends LitElement {

    constructor(){
        super()
        this.products={}
    }
    static properties = {
        products: { type: Object },
    }
    firstUpdated(){
        this.readProducts()
    }
    async readProducts() {
        const response = await fetch('https://66560fd13c1d3b60293c1866.mockapi.io/Products');
        this.products = await response.json();
    }
    
    render() {
        return html`
            <ul>
            ${Object.entries(this.products).map(([key, item]) => html`
            // <div>"${key} es igual a ${item.price} ${item.id}"</div>
            `)}
            </ul>
        `;
        }
    }

customElements.define("page-new", pageProducts);
