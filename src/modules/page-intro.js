import { LitElement, css, html } from 'lit';
import data from "../data/pages.json"

export class pages extends LitElement {

    constructor(){
        super();
        this.page="page-1"
        this.pageData={};
        this.type="";
        this.option="";

    }

    render(){
        this.pageData=data[this.page]
        return html`
        <div>${this.pageData['title']}</div>
        <div class="buttons-container">
        ${this.pageData['options'].map((option)=> html`
        <a class="button" id="${option}">${option}</a>
        `)}
        </div>
        <a class="back-button" style="display:none;">go back</a>
        `} 
    
    firstUpdated(){
        
        const backbutton=this.shadowRoot.querySelector('.back-button')
        backbutton.addEventListener('click',()=>{
            this.page="page-1"
            backbutton.style.display="none"
            this.requestUpdate()
        })

        
        const divContainer=this.shadowRoot.querySelector('.buttons-container')
        divContainer.addEventListener('click',(e)=>{
            const button = e.target.closest('.button');
            if (button.id==="Inventory"){
                this.page="page-2"
                backbutton.style.display="block"
                this.requestUpdate()
            }
            else if( button.id==="Products"){
                this.page="page-3"
                backbutton.style.display="block"
                this.requestUpdate()
            }
            else if(button.id==="Reports"){
                this.page="page-4"
                backbutton.style.display="block"
                this.requestUpdate()
            }
            else{
                this.otherOPtions(button.id, this.pageData['title'])
            }
        })


    }

    otherOPtions(option,type){
            this.option=option
            this.type=type
            const generateComponent=`<page-${option}></page-${option}>`;
            this.parentNode.insertAdjacentHTML('beforeend',generateComponent);
            this.parentNode.removeChild(this);
        
    }
    
}
customElements.define("principal-pages", pages);

