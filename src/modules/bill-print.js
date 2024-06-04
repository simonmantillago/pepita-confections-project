import { LitElement, css, html } from "lit";

export class billPrint extends LitElement{
    static styles = css`

    .grande{
        width: 95%;
        margin:2.5%;
    }

    .button-container {
        gap: 1em;
        margin: 2em;
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

    .back-button-container {
        align-self: center;
    }

    .submit {
        position: relative;
        background-color: #007bff !important;
        border-radius: 5px;
        box-shadow: #012bff 0px 4px 0px 0px;
        padding: 15px;
        background-repeat: no-repeat;
        cursor: pointer;
        box-sizing: border-box;
        width: 200px;
        height: 49px;
        color: #fff;
        border: none;
        font-size: 20px;
        transition: all 0.3s ease-in-out;
        z-index: 1;
    
    }

    .submit::before {
        content: "";
        background-color: #018bff !important;
        width: 0;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        transition: width 700ms ease-in-out;
        display: inline-block;
    }

    .submit:hover::before {
        width: 100%;
    }

    table {
        border-collapse: collapse;
        display: flex;
        text-align: center; 
    }

    
    
    td, th {
        border: 1px dotted #000;
        padding: 8px;
        text-align: left;
        background-color: #fff;
        color:#3c3c3c;
    }
    th {
        background-color: #ccc;
        color:#3c3c3c;
    }
    .materials{
        font-size:8px;
    }
    @media (min-width: 600px) {
        .materials{
            font-size:15px;
        }
    }
`

    connectedCallback(){
        super.connectedCallback();
        const billInfo=document.querySelector('page-search')
        this.billInfo=billInfo.billInfo
        this.notes=this.billInfo['notes']
        console.log(this.billInfo)
    }
    render(){
        return html`
        <div class="grande">
            <button id="backButton" type="button" class="back-button">Go back</button>
            <div>
                <h3>Bill ID: ${this.billInfo['tag']}</h3>
                
            </div>
            
            <div>
                <h3>Productos a fabricar: ${this.billInfo['quantity']}</h3>
            </div>
            
            <h2>Material's Info</h2>
            <div class="materials"> 
                ${this.ShowMaterials()} 
            </div>
            
            <h2>Efective Percent</h2>
            <div class="efective"> 
                ${this.ShowEfective()}  
            </div>
            
            <h2>Employees's Info</h2>
            <div class="employees">
                ${this.ShowEmployees()}
            </div>
            
            <h2>IndirectCost Info</h2>
            <div class="indirectCost">
                ${this.ShowIndirectCost()}
            </div>
            
            <h2>Total Info</h2>
            <div class="total">
                ${this.ShowTotal()}
            </div>
            
            <div class="notes">
                ${this.ShowNotes()}
            </div>
        </div>
        <div class="button-container">
            <a @click="${(event) => print()}"> Imprimir</a>
        </div>
        `
    }
    
    ShowMaterials(){
        const data = this.billInfo['product'];
        console.log(data)
        return html`
        <table>
            <tr>
                <th>Type</th>
                <th>Tag</th>
                <th>Quantity/unit</th>
                <th>Total quantity</th>
                <th>Unity</th>
                <th>Price/Unit</th>
                <th>Total Price</th>
            </tr>
            ${Object.entries(data).map(([key, item]) =>{
                return html`
                <tr>
                    <td>${key}</td>
                    <td>${item[0]}</td>
                    <td>${item[2]}</td>
                    <td>${item[5]}</td>
                    <td>${item[3]}</td>
                    <td>${item[4]}</td>
                    <td>${((item[4])*(item[5]))}</td>
                </tr>`
            } )}
        </table>
        `
    }

    ShowEmployees(){
        const data = this.billInfo['employeesData'];
        console.log(data)
        return html`
        <table>
            <tr>
                <th>Employee's Name</th>
                <th>Salary/h</th>
                <th>Hours</th>
                <th>Paycheck</th>
            </tr>
            ${Object.entries(data).map(([key, item]) =>{
                return html`
                <tr>
                    <td>${key}</td>
                    <td>${item['salary']}</td>
                    <td>${item['hours']}</td>
                    <td>${item['paycheck']}</td>

                </tr>`
            } )}
        </table>
        `
    }

    ShowIndirectCost(){
        const data = this.billInfo['indirectCost'];
        const hours = this.billInfo['totalHours']
        console.log(data)
        return html`
        <table>
            <tr>
                <th>Description</th>
                <th>Price per month</th>
                <th>Price/h</th>
                <th>Hours</th>
                <th>Total Price</th>
            </tr>
            ${Object.entries(data).map(([key, item]) =>{
                return html`
                <tr>
                    <td>${key}</td>
                    <td>${item}</td>
                    <td>${Number((item/720).toFixed(2))}</td>
                    <td>${((this.billInfo['totalHours']) > 0 ) ? hours : 720}</td>
                    <td>${((this.billInfo['totalHours']) > 0) ? Number(((item/720)*hours).toFixed(2)) : item}</td>

                </tr>`
            } )}
        </table>
        `
    }
    ShowTotal(){
        return html`
        <table>
            <tr>
                <th>Material Price</th>
                <th>Employees Salarys</th>
                <th>Indirect Cost</th>
                <th>Total Price</th>
            </tr>
            <tr>
                <td>${this.billInfo['totalProducts']}</td>
                <td>${this.billInfo['totalEmployees']}</td>
                <td>${Number((this.billInfo['totalIndirect']).toFixed(2))}</td>
                <td>${Number((this.billInfo['totalPrice']).toFixed(2))}</td>
            </tr>
        </table>
        `
    }
    ShowNotes(){
        if ((this.notes).length >= 1){
            return html`
                <h2>Advices</h2>
                <p>you need materials, you must have the necessary materials to continue</p>
                ${(this.notes).map(note =>{
                return html`
                <div>${note}</div>
                `
            })}`
        } else{
            return html`
            <h3>Ready to Upload</h3>
            `
        }
    }
    ShowEfective(){
            return html`
                    <table> 
                        <tr>
                            <th>Quantity</th>
                            <th>Defective</th>
                            <th>efficiency</th>
                        </tr>
                        <tr>
                            <td>${this.billInfo['quantity']}</td>
                            <td>${this.billInfo['defectiveProducts']}</td>
                            <td>${this.billInfo['efectivity']}</td>
                        
                        </tr>
                    </table>
                
                `
    }
    firstUpdated(){
        print()

        const backbutton = this.shadowRoot.querySelector(".back-button");
        backbutton.addEventListener("click", () => {
            const principalPage = `<principal-pages></principal-pages>`;
            this.parentNode.insertAdjacentHTML("beforeend", principalPage);
            this.parentNode.removeChild(this);
    })

}
}


customElements.define("bill-print", billPrint);