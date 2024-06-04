import { LitElement, css, html } from 'lit';
import data from "../data/pages-data.json"

export class pageProducts extends LitElement {
    static styles = css` 
    img{
        width:100%;   
    }
    .card{
        display:inline-block;
        width:250px;
    }
    .big-img{
        position:relative;
        border-radius:20px;
    }
    .product-img{
        width:250px;
    }
    .bot-img{
        display:flex;
        position:absolute;
        width:30%;
        bottom:1.5%;
        left:0px;
    }
    .title{
        position:absolute;
        width:max-content%;
        height:max-content;
        bottom:1.5%;
        top:-22px;
        left:10px;
        font-weight:bold;
        color:white;
    }
    .back-button {
        padding: 0;
        margin: 0;
        border: none;
        background: none;
        cursor: pointer;
        --primary-color: #ffff;
        --hovered-color: #ffff;
        position: relative;
        display: flex;
        font-weight: 600;
        font-size: 20px;
        gap: 0.5rem;
        align-items: center;
      }
    
      .back-button p {
        margin: 0;
        position: relative;
        font-size: 20px;
        color: var(--primary-color);
      }
    
      .back-button::after {
        position: absolute;
        content: "";
        width: 0;
        right: 0;
        bottom: -7px;
        background: var(--hovered-color);
        height: 2px;
        transition: 0.3s ease-out;
      }
    
      .back-button p::before {
        position: absolute;
        content: "Go back";
        width: 0%;
        inset: 0;
        color: var(--hovered-color);
        overflow: hidden;
      }
    
      .back-button:hover::after {
        width: 100%;
        left: auto;
        right: 0;
      }
    
      .back-button:hover p::before {
        width: 100%;
      }
      .ropa{
        display:flex;
        justify-content:center;
        aling-items:center;
        height:40vh;
      }
    
      .back-button:hover svg {
        transform: translateX(-4px);
        color: var(--hovered-color);
      }
    
      .back-button svg {
        color: var(--primary-color);
        transition: 0.2s;
        position: relative;
        width: 15px;
        transition-delay: 0.2s;
      }
      .content{
        padding:20px;

      }
      .titleTop{
        font-size: 2em;
        text-transform: capitalize;
        text-align: center;
        font-weight: 700;
        background-image: linear-gradient(to right, #ffff 15%, #14e2cd);
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
    }
    .cards-container{
        display: flex;
        justify-content:center;
        flex-wrap:wrap;
        align-items: center;
        gap: 50px;
    }
    .bot-img {
        display: flex;
        position: absolute;
        width: 30%;
        bottom: 7px;
        left: 15px;
    }
    .product-img{
        border-radius:20px;
    }
    @media (min-width: 600px) {
        .titleTop {
            font-size: 4vw;
        }
    
      }
    
    `

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
        const backButton =this.shadowRoot.querySelector('.back-button')
        backButton.addEventListener('click',()=>{
            const generateComponent = `<principal-pages></principal-pages>`;
            this.parentNode.insertAdjacentHTML("beforeend", generateComponent);
            this.parentNode.removeChild(this);
        })

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
                                this.availability[element]=[tagElement,parseInt(productAvailability),parseInt(elementQuantity),productUnit,priceElement]        
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
        this.parentNode.removeChild(this);
    }
    
    render() {
        return html`
        <div class="content">
        <button class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4" >
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 5L3 12m0 0l7 7m-7-7h18" ></path>
        </svg>
        <p>Go back</p>
        </button>
        <h2 class="titleTop">Select the product to report</h2>
        <div class="cards-container "  >
        ${Object.entries(this.products).map(([key, item]) => html`
                
            <a class="card" id="${key}" >
            <div class="big-img">
                <div class="title">${item['name']}</div>
                <div class="ropa">
                <img class="product-img" style="background-color:${item['materialInfo']['fabricColor']}" src=${item['image']} alt="picture">
                </div>
                <div class="bot-img">
                ${item['materialInfo']['threadColor'] ? this.exist(item['materialInfo']['threadColor'],'hilo'):this.noExist('hilo')}
                ${item['materialInfo']['buttonsColor'] ? this.exist(item['materialInfo']['buttonsColor'],'botones'):this.noExist('botones')}
                </div>
                </div>
            </a>
        `)}
        </div>
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