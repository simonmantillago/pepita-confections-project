import { LitElement, css, html } from 'lit';
import data from "../data/pages.json"

export class pages extends LitElement {
    static styles = css`
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
    }
    .title {
        font-size: 5em;
        text-align: center;
        
    }
    .buttons-container {
        display: flex;
        justify-content: center;
        gap: 20px;
        width: 100vw;
    }
    .button {
        padding: 10px 20px;
        font-size: 1.2em;
        text-decoration: none;
        color: white;
        background-color: #4CAF50;
        border-radius: 5px;
        transition: background-color 0.3s ease;
    }
    .button:hover {
        background-color: #45a049;
    }
    .back-button {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 1.2em;
        text-decoration: none;
        color: white;
        background-color: #f44336;
        border-radius: 5px;
        transition: background-color 0.3s ease;
        display: none;
    }
    .back-button:hover {
        background-color: #e53935;
    }
    `;
    constructor(){
        super();
        this.page="page-1"
        this.pageData={};
        this.type="";
        this.option="";

    }

    render() {
        this.pageData = data[this.page];
        return html`
        <div class="container">
            <div class="title">${this.pageData['title']}</div>
            <div class="buttons-container">
                ${this.pageData['options'].map((option) => html`
                <a class="button" id="${option}">${option}</a>
                `)}
            </div>
            <a class="back-button">← Go back</a>
        </div>
        `;} 
    
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

