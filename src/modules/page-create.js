import { LitElement, css, html } from 'lit';
import data from "../data/pages-data.json"

export class pageCreate extends LitElement {

    connectedCallback(){
        super.connectedCallback();
        const pageData=document.querySelector('principal-pages')
        this.type=pageData.type
        this.crudOption=pageData.option
        this.Submit={}
        this.materials={}

    }
    render(){
        return html`

        <div>${this.crudOption.toUpperCase()} ${this.type.toUpperCase()}</div>
        <form class="form-container">
        ${Object.entries(data[this.type][this.crudOption]).map(([key, item]) =>{
            
            if (Array.isArray(item[1])){
                return html`
                <div>
                <label for="options">${item[0]}</label>
                <select id="options" name="${key}">
                ${item[1].map(element => {
                    return html`
                        <option>${element}</option>
            `})}
                    </select>
                    </div>
            `;

            } else {
            return html`
            <div class="${key}">
                <label for="${key}" class="form__label">${(item[0]==="date" || item[0]==="color")? item[1] : ""}</label>
                <input type=${item[0]} class="form__field" placeholder="${item[1]}" required="" id="${key}" name="${key}">
            </div>
            `}})
        }
            
        </form>
        <a class="back-button">Go back</a>
        <a class="submmit">submmit</a>
        `
    }
    firstUpdated(){
        this.selectMaterial()
        console.log(this.materials)
        
        const backbutton=this.shadowRoot.querySelector('.back-button')
        backbutton.addEventListener('click',()=>{
            const principalPage=`<principal-pages></principal-pages>`;
            this.parentNode.insertAdjacentHTML('beforeend',principalPage);
            this.parentNode.removeChild(this);
        })
        
        const submmitButton=this.shadowRoot.querySelector('.submmit')
        submmitButton.addEventListener('click',async (event)=>{
            const container=this.shadowRoot.querySelector('.form-container')
            const data = Object.fromEntries(new FormData(container).entries());
            const inputData = JSON.parse(JSON.stringify(data));
            if(this.type=="Inventory"){
                const {tag,name,description,category,suplier,price,unit,stock,buydate,duedate,ubication,notes,color} = inputData;
                this.Submit={
                    tag:tag,
                    name:name,
                    description:description,
                    category:category,
                    suplier:suplier,
                    price:price,
                    unit:unit,
                    stock:stock,
                    adate:buydate,
                    ddate:duedate,
                    ubication:ubication,
                    notes:notes,
                    color:color
                }
            }else if(this.type==="Products"){
                const {tag,cuantity,time,salary,image,color}=inputData
                const imgUrl=`../../public/imgs/${image}.png`
                this.Submit={
                    tag:tag,
                    cuantity:cuantity,
                    time:time,
                    salary:salary,
                    image:imgUrl,
                    color:color

                }
            }
            try {
                const response = await fetch(`https://66560fd13c1d3b60293c1866.mockapi.io/${this.type}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.Submit)
                });

                if (!response.ok) {
                    throw new Error('Error al enviar POST al MockAPI');
                }

                const responseData = await response.json();
                console.log('Respuesta de la API:', responseData);
            } catch (error) {
                console.error('Error al enviar POST a la API:', error);
            }
            

            
        })
    }
    async selectMaterial(){
        const response = await fetch(`https://66560fd13c1d3b60293c1866.mockapi.io/Inventory`);
            const data = await response.json();
            this.materials = data;
            console.log(this.materials)
    }
    
}


customElements.define("page-create", pageCreate);