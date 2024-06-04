import { LitElement, css, html } from "lit";

export class billPopUp extends LitElement{
    connectedCallback(){
        super.connectedCallback();
        const formPage = document.querySelector('page-form');
        this.billInfo = formPage.report;
        this.notes=formPage.notes
        this.inventory=formPage.inventory
        
    }
    render(){
        return html`
            <h2>aaa</h2>
        <div>
            <hr>
            <div>
            <h3>Productos a fabricar: ${this.billInfo['quantity']}</h3>
                
            </div>
            <hr>
            <h2>Material's Info</h2>
            <div class="materials">
            ${this.ShowMaterials()}
            </div>
            <hr>
            <h2>employees's Info</h2>
            <div class="employees">
            ${this.ShowEmployees()}
            </div>
            <hr>
            <h2>indirectCost Info</h2>
            <div class="indirectCost">
            ${this.ShowIndirectCost()}
            </div>
            <hr>
            <h2>Total Info</h2>
            <div class="total">
                ${this.ShowTotal()}
            </div>
            <hr>
            <div class="notes">
                ${this.ShowNotes()}
            </div>
        </div>
        <div>
        <button class="Back">Go back</button>
        <button class="Send" disabled>Sent to data base</button>
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
    isNote(){
        const sentButton = this.shadowRoot.querySelector(".Send");
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

        const backButton =this.shadowRoot.querySelector('.Back')
        backButton.addEventListener('click',()=>{

            const goBack = `<page-new></page-new>`;
            this.parentNode.insertAdjacentHTML("beforeend", goBack);
            this.parentNode.removeChild(this);
        })

        const sendButton =this.shadowRoot.querySelector('.Send')
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
