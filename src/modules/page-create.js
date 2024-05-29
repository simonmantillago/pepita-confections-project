import { LitElement, css, html } from 'lit';
import data from "../data/pages-data.json"

export class pageCreate extends LitElement {

    connectedCallback(){
        super.connectedCallback();
        const pageData=document.querySelector('principal-pages')
        this.type=pageData.type
        this.department=pageData.option
    }
    render(){

        console.log(data[this.type][this.department])
        return html`

        <div>" ${this.department} a new ${this.type}"</div>
        <div class="container">
        ${Object.entries(data[this.type][this.department]).map(([key, item]) =>{
            
            if (Array.isArray(item)){
                return html`
                <label for="options">${key}</label>
                <select id="options">
                ${item.map(element => {
                    return html`
                        <option>${element}</option>
            `})}
                    </select>
            `;

            } else {
            return html`
            <div class="form__group field">
                <input type="input" class="form__field" placeholder="${key}" required="" id="${key}" name="${key}">
                <label for="${key}" class="form__label"></label>
            </div>
            `}
        }
        )}
        </div>
        `
    }
}

customElements.define("page-create", pageCreate);