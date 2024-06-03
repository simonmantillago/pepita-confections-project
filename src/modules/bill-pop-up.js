import { LitElement, css, html } from "lit";

export class billPopUp extends LitElement{
    connectedCallback(){
        super.connectedCallback();
        const formPage = document.querySelector('page-form');
        this.billInfo = formPage.report;
    }
    render(){
        return html`
            <h2>aaa</h2>
        <div>
            <hr>
            <div class="materials">
                ${this.ShowMaterials()}
            </div>
            <hr>
            <div class="employees">
                ${this.ShowEmployees()}
            </div>
            <hr>
            <div class="indirectCost">
                ${this.ShowIndirectCost()}
            </div>
            <hr>
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
        <button class="Sent" disabled>Sent to data base</button>
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
                <th>Cuantity</th>
                <th>Unity</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
            ${Object.entries(data).map(([key, item]) =>{
                return html`
                <tr>
                    <td>${key}</td>
                    <td>${item[0]}</td>
                    <td>${item[2]}</td>
                    <td>${item[3]}</td>
                    <td>${item[4]}</td>
                    <td>${item[5]}</td>
                </tr>`
            } )}
        </table>
        <div>ToTal: ${this.billInfo['totalProducts']}</div>
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
        <div>Total: ${this.billInfo['totalEmployees']}</div>
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
                    <td>${(item/720)}</td>
                    <td>${(this.billInfo['employeesData'].lenght >= 1) ? hours : 720}</td>
                    <td>${(this.billInfo['employeesData'].lenght >= 1) ? ((item/720)*hours) : item}</td>

                </tr>`
            } )}
        </table>
        ${(this.billInfo['employeesData'].lenght >= 1) ? html`<div>Total: ${this.billInfo['totalIndirectHours']}</div>`
        : html`<div>Total: ${this.billInfo['totalIndirectMonth']}</div>` }


        `
    }
    ShowTotal(){
        const data = this.billInfo['indirectCost'];
        const total = ((this.billInfo['totalProducts'])+(this.billInfo['totalEmployees'])+((this.billInfo['employeesData'].lenght >= 1) ? this.billInfo['totalIndirectHours'] : this.billInfo['totalIndirectMonth']))
        console.log(data)
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
                <td>${(this.billInfo['employeesData'].lenght >= 1) ? this.billInfo['totalIndirectHours'] : this.billInfo['totalIndirectMonth']}</td>
                <td>${total}</td>
            </tr>
        </table>
        `
    }
    ShowNotes(){
        const data = this.billInfo['notes'];
        const senta = this.shadowRoot.querySelector(".Sent")
        if (data.lengt >= 1){
            return html`
                <h2>Advices</h2>
                ${data.map(note =>{
                return html`
                <div>${note}</div>
                `
            })}`
        } else{
            senta.disabled=false;
            return html`
            <h3>Ready to Upload</h3>
            `
        }
    }
}


customElements.define("bill-pop-up", billPopUp);
