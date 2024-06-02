import { LitElement, css, html } from 'lit';

export class pageForm extends LitElement {
    connectedCallback(){
        super.connectedCallback()
        const choiseData=document.querySelector('page-new')
        this.price=choiseData.price
        this.productSelected=choiseData.productSelected
        console.log(this.price)
        console.log(this.productSelected)
        this.total=0
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
                        <label for="Salary" class="form__label">Salary</label>
                        <input type="input" class="form__field" placeholder="Salary per hour" required="" id="Salary" name="Salary">
                        <label for="productQuantity" class="form__label">how Many</label>
                        <input type="input" class="form__field" placeholder="How many products" required="" id="productQuantity" name="productQuantity">
                    </div>
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
            let id=Date.now().toString(8)
            costDiv.classList.add('IndirectCost');
            costDiv.innerHTML = `
                <div class="cost">
                    <label for="newKey" class="form-label">Which Cost</label>
                    <input type="text" class="form-control" name="newkey${id}" id="newKey">
                    <label for="newValue" class="form-label">Cost per month</label>
                    <input type="number" class="form-control" name="newValue${id}" id="newValue">
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


        const generateButton=this.shadowRoot.querySelector('#sendInfo')
        generateButton.addEventListener('click',(event)=>{
            const container = this.shadowRoot.querySelector(".customerForm");
            const data = Object.fromEntries(new FormData(container).entries());
            const inputData = JSON.parse(JSON.stringify(data));
            const {Salary,productQuantity,...rest}=inputData
            console.log(rest)
            let indirectCostTotal=0
            const transformedData={}
            Object.keys(rest).forEach(key => {
                
                if (key.startsWith("newkey")) {// Verifica si key comienza con "newkey"
                    const valueKey = `newValue${key.slice(6)}`;// Obtener el valor de newValue con el valor de la key pero empezando desde la letra 6
                    transformedData[data[key]] = data[valueKey];// Agregar al nuevo objeto con la clave de newkey y el valor correspondiente de newValue
                }
            });
            Object.values(transformedData).forEach(value=>{
                indirectCostTotal+=parseFloat(value)
            })

            const indirectCostPerHour=indirectCostTotal/730
            this.total=(((parseFloat(Salary)+parseFloat(indirectCostPerHour))*(this.productSelected['time']))+this.price)*productQuantity
            console.log(this.total)



        })

        const backButton = this.shadowRoot.querySelector('#backButton');
        backButton.addEventListener('click', () => {
            this.parentNode.removeChild(this);
        });
    }
}

customElements.define("page-form", pageForm);
