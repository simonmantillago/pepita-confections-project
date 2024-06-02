import { LitElement, css, html } from 'lit';
import data from "../data/pages-data.json"

export class pageProducts extends LitElement {

    constructor(){
        super()
        this.products={}
        this.inventory={}
        this.price=0
        this.productSelected={}
        this.availability={}

    }
    static properties = {
        products: { type: Object },
    }
    firstUpdated(){
        this.readProducts()
        this.readInventory()
        const cardContainer=this.shadowRoot.querySelector('.cards-container')
        cardContainer.addEventListener('click',(event=>{
            const product=event.target.closest('.card')
            this.productSelected=this.products[product.id]
            const SelectedMaterials=this.productSelected['materialInfo']
            this.price=0
            if (SelectedMaterials){
            (data['Inventory']['create']['category'][1]).map(element => {
                let sum=this.catchMaterials(element,SelectedMaterials)
                if(typeof sum === 'number'){
                this.price+=sum
            }
            })}
            this.nextpage()
            

        }))
    }
    async readProducts() {
        const response = await fetch('https://66560fd13c1d3b60293c1866.mockapi.io/Products');
        this.products = await response.json();
    }
    async readInventory() {
        try {
            const response = await fetch(`https://66560fd13c1d3b60293c1866.mockapi.io/Inventory`);
            this.inventory = await response.json();
        } catch (error) {
            console.error('Error fetching materials:', error);
        }

        }
    catchMaterials(element,SelectedMaterials){
        let elementQuantity=0
        let productUnit=''
        let tagElement=""
        let priceElement=0;
        let total=0;
        let productAvailability
        
        Object.entries(SelectedMaterials).map(([key, item]) =>{
            if(key===`${element}Cuantity`){
                elementQuantity=item
                Object.entries(SelectedMaterials).map(([key, item]) =>{
                    if(key===`${element}` && item!='N/A'){
                        tagElement= item
                        Object.entries(this.inventory).map(([keys, items]) =>{
                            if((items['category']===element) && (items['tag']===tagElement)){
                                priceElement= items['price']
                                productAvailability=items['stock']
                                productUnit=items['unit']
                                this.availability[element]=[tagElement,parseInt(productAvailability),parseInt(elementQuantity),productUnit]        
                            }})}
                })
            }
            
            total=(elementQuantity*priceElement)          
        })
        return total
    }

    nextpage(){
        const formpage='<page-form></page-form>';
        this.parentNode.insertAdjacentHTML('beforeend',formpage);
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
            <div>${item['name']}</div>
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