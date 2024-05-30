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
    static styles = css` 
    img{
        width:100%;   
    }
    .card{
        display:inline-block;
        width:250px;
    }
    `
    
    render() {
        return html`
        <div class="cards-container "  >
        ${Object.entries(this.products).map(([key, item]) => html`    
            <a class="card" id="${key}" >
                <img style="background-color:${item['color']}" src=${item['image']} alt="picture">
                <p style="color:white;">${item['tag']}</p>
            </a>
        `)}
        </div>
        `;
        }
    }

customElements.define("page-new", pageProducts);
