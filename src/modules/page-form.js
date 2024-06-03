import { LitElement, css, html } from 'lit';
import { billPopUp } from './bill-pop-up';

export class pageForm extends LitElement {
    connectedCallback(){
        super.connectedCallback()
        const choiseData=document.querySelector('page-new')
        this.materialsPrice=choiseData.price
        this.productSelected=choiseData.productSelected // me sirve para el time, tag y name
        this.productAvailability=choiseData.availability
        this.notes=[]
        this.total=0
        this.report={}
    }

    static styles = css`
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        .container {
            position: absolute;
            width: 80vw;
            height: 60vh;
            right: 10vw;
            top: 20vh;
            background-color: #101010;
            border-radius: 50px;
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            overflow-y:scroll;
        }
        .customerForm {
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 10px;
            padding:5%;
            z-index:5;
        }
        .big-container {
            position: absolute;
            width: 100vw;
            height: 100vh;
            right: 0vw;
            top: 0vh;
            backdrop-filter: blur(5px);
            z-index: 1;
        }`

    render(){
        return html`
        <div class="big-container">
            <div class="container">
                <form class="customerForm">
                    <div class="form__group field customerName">
                        <label for="productQuantity" class="form__label">how Many</label>
                        <input type="input" class="form__field" placeholder="How many products" required="" id="productQuantity" name="productQuantity">
                    </div>
                    <div>
                    <label for="generateHtml">¿Do you have employees?   </label>
                    <label><button id="addEmployee" type="button">+</button></label>
                    </div>
                    <div class="employeeForm"></div>
                    <div>
                        <label for="generateHtml">¿Do you have indirect cost?   </label>
                        <label><button id="generateCost" type="button">+</button></label>
                    </div>
                    <div class="costForm"></div>
                    <div class="divButtons">
                        <button id="sendInfo" type="button">generate</button>
                        <button id="backButton" type="button">Go back</button>
                    </div>
                </form>
            </div>
        </div>
        `;
    }

    firstUpdated(){

        

        const costForm = this.shadowRoot.querySelector('.costForm');
        const isIndirectCost = this.shadowRoot.querySelector('#generateCost');
        
        isIndirectCost.addEventListener('click', (event) => {
            
            
            const costDiv = document.createElement('div');
            let idCost=Date.now().toString(8)
            costDiv.classList.add('IndirectCost');
            costDiv.innerHTML = `
                <div class="cost">
                    <label for="newKey" class="form-label">Which Cost</label>
                    <input type="text" class="form-control" name="newkey${idCost}" id="newKey">
                    <label for="newValue" class="form-label">Cost per month</label>
                    <input type="number" class="form-control" name="newValue${idCost}" id="newValue">
                    <button type="button" class="removeCost">-</button>
                </div>
                
            `;
            
            // Add event listener to the remove button
            const removeButton = costDiv.querySelector('.removeCost');
            removeButton.addEventListener('click', () => {
                costForm.removeChild(costDiv);
            });

            costForm.appendChild(costDiv);
        });




        const employees = this.shadowRoot.querySelector('.employeeForm');
        const addEmployee =this.shadowRoot.querySelector('#addEmployee')
        addEmployee.addEventListener('click', (event) => {
            
            
            const employeeDiv = document.createElement('div');
            let idEmployee=Date.now().toString(8)
            employeeDiv.classList.add('IndirectCost');
            employeeDiv.innerHTML = `
                <div class="cost">
                    <label for="newKey" class="form-label">New employee</label>
                    <input type="text" class="form-control" placeholder="Name" name="keyEmployee${idEmployee}" id="newKey">
                    <input type="number" class="form-control" placeholder="Salary per hour" name="ValueEmployee${idEmployee}" id="newValue">
                    <input type="number" class="form-control" placeholder="Hours" name="hoursEmployee${idEmployee}" id="newValue">
                    <button type="button" class="removeEmployee">-</button>
                </div>
                
            `;
            
            // Add event listener to the remove button
            const removeEmployee = employeeDiv.querySelector('.removeEmployee');
            removeEmployee.addEventListener('click', () => {
                employees.removeChild(employeeDiv);
            });

            employees.appendChild(employeeDiv);
        });

        const generateButton=this.shadowRoot.querySelector('#sendInfo')
        generateButton.addEventListener('click',(event)=>{
            const container = this.shadowRoot.querySelector(".customerForm");
            const data = Object.fromEntries(new FormData(container).entries());
            const inputData = JSON.parse(JSON.stringify(data));
            const {Salary,productQuantity,...rest}=inputData
            console.log(rest)
            const indirectCostData={}
            const employeesData={}
            let indirectCostTotal=0
            let employeesTotal=0
            let hoursTotal=0

            Object.keys(rest).forEach(key => {
                
                if (key.startsWith("newkey")) {// Verifica si key comienza con "newkey"
                    const valueKey = `newValue${key.slice(6)}`;// Obtener el valor de newValue con el valor de la key pero empezando desde la letra 6
                    indirectCostData[rest[key]] = rest[valueKey];// Agregar al nuevo objeto con la clave de newkey y el valor correspondiente de newValue
                }else if (key.startsWith("keyEmployee")){
                    const salary = `ValueEmployee${key.slice(11)}`
                    const hours = `hoursEmployee${key.slice(11)}`
                    employeesData[rest[key]]={
                        salary:rest[salary],
                        hours:rest[hours],
                        paycheck:parseFloat(rest[salary])*parseFloat(rest[hours])

                    }
                }
            });

            Object.values(indirectCostData).forEach(value=>{
                indirectCostTotal+=parseFloat(value)
            })
            
            Object.values(employeesData).forEach(employe=>{
                Object.entries(employe).forEach(([item, values])=>{
                if (item==='paycheck'){
                    employeesTotal+=values
                }
                if (item ==='hours'){
                    hoursTotal+=parseFloat(values)
                }
            })
            })

            const indirectCostPerHour=indirectCostTotal/720
            const indirectCostTotalPerHour=parseFloat(indirectCostPerHour)*hoursTotal
            this.total=(indirectCostTotalPerHour)+(this.materialsPrice*parseFloat(productQuantity))+parseFloat(employeesTotal)
            let materialsPriceTotal=this.materialsPrice*productQuantity
            
            
            Object.entries(this.productAvailability).forEach(([item, value])=> {

                
                value.push((value[2]*productQuantity))
                if(value[1]<(value[2]*productQuantity)){

                    this.notes.push(`hace falta ${(parseFloat(value[2])*parseFloat(productQuantity)-value[1])} ${value[3]} de ${item} con el ID: ${value[0]}`)
                }
                console.log(this.notes)
            })
            
            ;
            console.log(this.productAvailability)
            this.report={
                product:this.productAvailability,//  info de el producto, materiales y coostos por materiial
                indirectCost:indirectCostData, // info costos indirecctos, nombre y precio por mes
                employeesData:employeesData, // info empleados, salario, horas, nombre, paycheck
                totalEmployees:employeesTotal, // total que hay que pagar a empleados
                totalHours:hoursTotal, // total de horas
                totalIndirectHours:indirectCostTotalPerHour, // total costos indirectos
                totalIndirectMonth:indirectCostTotal, // total costos indirectos
                totalProducts: materialsPriceTotal,
                totalPrice: this.total,// precio total de todo
                notes:this.notes
            }
            //https://665ce299e88051d60404f656.mockapi.io/Reports

            const billPopUp = `<bill-pop-up></bill-pop-up>`;
            const createPage = document.querySelector('page-new')
            this.parentNode.insertAdjacentHTML("beforeend", billPopUp);
            this.parentNode.removeChild(createPage);
            this.parentNode.removeChild(this);
            



        })

        const backButton = this.shadowRoot.querySelector('#backButton');
        backButton.addEventListener('click', () => {
            this.parentNode.removeChild(this);
        });
    }
}

customElements.define("page-form", pageForm);