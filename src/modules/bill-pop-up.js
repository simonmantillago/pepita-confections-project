import { LitElement, css, html } from "lit";

export class billPopUp extends LitElement{

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
        const formPage = document.querySelector('page-form');
        this.billInfo = formPage.report;
        this.notes=formPage.notes
        this.inventory=formPage.inventory
        
    }
    render(){
        return html`
        <div class="button-container">
            <button class="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 5L3 12m0 0l7 7m-7-7h18" ></path>
                </svg>
                <p>Go back</p>
            </button>
        </div>
        <div class="grande">
            
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
            <button class="submit" disabled>Sent to data base</button>
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
    isNote(){
        const sentButton = this.shadowRoot.querySelector(".submit");
        if (sentButton) {
            // Now you can access and manipulate the button
            if ((this.notes).length >= 1){
                sentButton.disabled = true; // Enable the button when there are notes
            } else {
                sentButton.disabled = false; // Disable the button when there are no notes
            }
        }
    };


    firstUpdated(){
        this.isNote()

        const backButton =this.shadowRoot.querySelector('.back-button')
        backButton.addEventListener('click',()=>{

            const goBack = `<page-new></page-new>`;
            this.parentNode.insertAdjacentHTML("beforeend", goBack);
            this.parentNode.removeChild(this);
        })

        const sendButton =this.shadowRoot.querySelector('.submit')
        const materialInfo=this.billInfo['product']
        const newReport =this.billInfo
        sendButton.addEventListener('click',async ()=>{
            try {
                const response = await fetch(
                    `https://665ce299e88051d60404f656.mockapi.io/Reports`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newReport),
                    }
                );

                if (!response.ok) {
                    throw new Error("Error al enviar POST al MockAPI");
                }

                const responseData = await response.json();
                console.log("Respuesta de la API:", responseData);
            } catch (error) {
                console.error("Error al enviar POST a la API:", error);
            }

            (Object.entries(materialInfo)).map(([key,item])=>{
                (Object.values(this.inventory)).map((items)=>{
                    if((key===items['category']) && (items['tag']===item[0])){
                        items['stock']=(item[1]-(item[2]*this.billInfo['quantity']))
                        this.uploadInventory(items['id'],items)
                    }
                })
                
                
            })



            const pageIntro = `<principal-pages></principal-pages>`;
            this.parentNode.insertAdjacentHTML("beforeend", pageIntro);
            this.parentNode.removeChild(this);
        }
    
    
    )
    }
    async uploadInventory (keys,items){
        await fetch((`https://66560fd13c1d3b60293c1866.mockapi.io/Inventory/${keys}`), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(items)
        });
    }
    
}


customElements.define("bill-pop-up", billPopUp);
