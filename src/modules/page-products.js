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
            <div style="color:white;">${item['name']}</div>
                <div class="big-img">
                <img style="background-color:${item['materialInfo']['telaColor']}" src=${item['image']} alt="picture">
                <div class="bot-img">
                ${item['materialInfo']['hiloColor'] ? this.exist(item['materialInfo']['hiloColor'],'hilo'):this.noExist('hilo')}
                ${item['materialInfo']['botonesColor'] ? this.exist(item['materialInfo']['botonesColor'],'botones'):this.noExist('botones')}
                </div>
                </div>
            </a>
        `)}
        </div>
        `;
        }

        exist(color, material){
            return html`
            <img style="background-color:${color}" src="../../imgs/${material}.png">`
        }
        noExist(material){
            return html`
            <img src="../../imgs/no${material}.png">`
        }
    }

customElements.define("page-new", pageProducts);
