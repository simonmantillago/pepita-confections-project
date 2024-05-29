import { LitElement, css, html } from 'lit';
import data from "../data/pages-data.json"

export class pageCreate extends LitElement {

    connectedCallback(){
        super.connectedCallback();
        const pageData=document.querySelector('principal-pages')
        this.type=pageData.type
        this.crudOption=pageData.option
        this.Submit={}

    }
    render(){
        return html`

        <div>${this.crudOption.toUpperCase()} ${this.type.toUpperCase()}</div>
        <form class="form-container">
        ${Object.entries(data[this.type][this.crudOption]).map(([key, item]) =>{
            
            if (Array.isArray(item)){
                return html`
                <label for="options">${key}</label>
                <select id="options" name="${key}">
                ${item.map(element => {
                    return html`
                        <option>${element}</option>
            `})}
                    </select>
            `;

            } else {
            return html`
            <div class="${key}">
                <label for="${key}" class="form__label">${item==="date"? key : ""}</label>
                <input type=${item} class="form__field" placeholder="${key}" required="" id="${key}" name="${key}">
            </div>
            `}
        }
        )}
        </form>
        <a class="back-button">Go back</a>
        <a class="submmit">submmit</a>
        `
    }
    firstUpdated(){
        
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
                const {tag,name,description,category,suplier,price,unit,stock,buydate,duedate,ubication,notes} = inputData;
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
                    notes:notes
                }
            }else if(this.type==="Products"){
                const {tag,cuantity,time,salary}=inputData
                this.Submit={
                    tag:tag,
                    cuantity:cuantity,
                    time:time,
                    salary:salary
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

}


customElements.define("page-create", pageCreate);