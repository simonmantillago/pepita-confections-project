import { LitElement, css, html } from 'lit';
import { billPopUp } from './bill-pop-up';

export class pageForm extends LitElement {
    connectedCallback(){
        super.connectedCallback()
        const choiseData=document.querySelector('page-new')
        this.materialsPrice=choiseData.price
        this.productSelected=choiseData.productSelected // me sirve para el time, tag y name
        this.productAvailability=choiseData.availability
        this.inventory=choiseData.inventory
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
        }
        
        .form-container {
            display: flex;
            flex-direction: column;
            gap: 1em;
        }
        
        .form__group {
            display: flex;
            flex-direction: row;
            gap:1em;
        }

        .employeeForm, .costForm{
            display:flex;
            flex-direction:column;
            gap: .5em;
        }
    
        .form-container label {
            font-size: 1.2em;
            color: #fff;
            margin-bottom: 5px;
            text-transform: capitalize;
        }
    
        .form-container input, .form-container select {
            padding: 10px;
            font-size: 1em;
            border: 1px solid #ccc;
            border-radius: 5px;
            width:max-content;
        }
    
        .form-container input:focus, .form-container select:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }
        .cost{
            display:flex;
            flex-direction:row;
            gap: 1em;
        }


        .button-85 {
            padding: 0.6em 1em;
            border: none;
            outline: none;
            color: rgb(255, 255, 255);
            background: #111;
            cursor: pointer;
            position: relative;
            z-index: 0;
            border-radius: 10px;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
        }

        .button-85:before {
            content: "";
            background: linear-gradient(
                45deg,
                #ff0000,
                #ff7300,
                #fffb00,
                #48ff00,
                #00ffd5,
                #002bff,
                #7a00ff,
                #ff00c8,
                #ff0000
            );
            position: absolute;
            top: -2px;
            left: -2px;
            background-size: 400%;
            z-index: -1;
            filter: blur(5px);
            -webkit-filter: blur(5px);
            width: calc(100% + 4px);
            height: calc(100% + 4px);
            animation: glowing-button-85 20s linear infinite;
            transition: opacity 0.3s ease-in-out;
            border-radius: 10px;
        }

        @keyframes glowing-button-85 {
            0% {
                background-position: 0 0;
            }
            50% {
                background-position: 400% 0;
            }
            100% {
                background-position: 0 0;
            }
        }

        .divButtons{
            display:flex;
            gap:1em;
        }

        .button-85:after {
            z-index: -1;
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: #222;
            left: 0;
            top: 0;
            border-radius: 10px;
        }

        .button-container {
            display: flex;
            justify-content: space-between;
        }
        
        .back-button {
            padding: 0;
            color:#fff;
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
    `

    render(){
        return html`
        <div class="big-container">
            <div class="container">
                <form class="form-container customerForm">
                    <div class="form__group field customerName">
                        <label for="productQuantity" class="form__label">How many</label>
                        <input type="input" class="form__field" placeholder="How many products" required="" id="productQuantity" name="productQuantity">
                        <label for="defective" class="form__label">defective Products</label>
                        <input type="input" class="form__field" placeholder="Defective Products" required="" id="defective" name="defective">
                    </div>
                    <div>
                        <label for="generateHtml">¿Do you have employees?</label>
                        <button role="button" class="button-85" id="addEmployee" type="button">+</button>
                    </div>
                    <div class="employeeForm"></div>
                    <div>
                        <label for="generateHtml">¿Do you have indirect cost?</label>
                        <button role="button" class="button-85" id="generateCost" type="button">+</button>
                    </div>
                    <div class="costForm"></div>
                    <div class="divButtons">
                        <button class="back-button">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4" >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10 5L3 12m0 0l7 7m-7-7h18" ></path>
                            </svg>
                            <p>Go back</p>
                        </button>
                    <button class="submit" id="sendInfo" type="button">Generate</button>
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
                    <button role="button" class="button-85 removeCost" id="generateCost" type="button">-</button>
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
                    <button role="button" class="button-85 removeEmployee" id="generateCost" type="button">-</button>
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
            const {Salary,productQuantity,defective,...rest}=inputData
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
                }})})


            Object.entries(this.productAvailability).forEach(([item, value])=> {
                value.push((value[2]*productQuantity))
                if(value[1]<(value[2]*productQuantity)){
                    this.notes.push(`hace falta ${(parseFloat(value[2])*parseFloat(productQuantity)-value[1])} ${value[3]} de ${item} con el ID: ${value[0]}`)
                }})


            const indirectCostPerHour=indirectCostTotal/720
            const indirectCostTotalPerHour=parseFloat(indirectCostPerHour)*hoursTotal
            const indirectCostTotalPrice = ((parseFloat(hoursTotal)<1)? indirectCostTotal : indirectCostTotalPerHour)
            console.log(`indirectcostterniario ${indirectCostTotalPrice}`)
            let materialsPriceTotal=this.materialsPrice*productQuantity
            this.total=materialsPriceTotal+indirectCostTotalPrice+employeesTotal
            let tag= Date.now().toString(16)
            let efectivity= `${(((productQuantity)-(defective))/(productQuantity))*100}%`
            
            ;
            console.log(this.productAvailability)
            this.report={
                tag:tag,
                defectiveProducts:defective,//productos defectuosos
                quantity:productQuantity,//cuantos productos
                product:this.productAvailability,//  info de el producto, materiales y coostos por materiial
                indirectCost:indirectCostData, // info costos indirecctos, nombre y precio por mes
                employeesData:employeesData, // info empleados, salario, horas, nombre, paycheck
                totalEmployees:employeesTotal, // total que hay que pagar a empleados
                totalHours:hoursTotal,
                totalIndirect:indirectCostTotalPrice,
                totalProducts: materialsPriceTotal,
                totalPrice: this.total,
                efectivity:efectivity,
                notes:this.notes// precio total de todo
            }
            //

            const billPopUp = `<bill-pop-up></bill-pop-up>`;
            this.parentNode.insertAdjacentHTML("beforeend", billPopUp);
            this.parentNode.removeChild(this);
            



        })

        const backbutton = this.shadowRoot.querySelector(".back-button");
        backbutton.addEventListener("click", () => {
            const productsPage = `<page-new></page-new>`;
            this.parentNode.insertAdjacentHTML("beforeend", productsPage);
            this.parentNode.removeChild(this);
        });
    }
}

customElements.define("page-form", pageForm);