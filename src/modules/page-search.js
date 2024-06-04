import { LitElement, html, css } from 'lit';

export class pageSearch extends LitElement {
    static styles = css`
    .borrar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgb(20, 20, 20);
        border: none;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
        cursor: pointer;
        transition-duration: .3s;
        overflow: hidden;
        position: relative;
      }
      
      .svgIcon {
        width: 12px;
        transition-duration: .3s;
      }
      
      .svgIcon path {
        fill: white;
      }
      
      .borrar:hover {
        width: 140px;
        border-radius: 50px;
        transition-duration: .3s;
        background-color: rgb(255, 69, 69);
        align-items: center;
      }
      
      .borrar:hover .svgIcon {
        width: 50px;
        transition-duration: .3s;
        transform: translateY(60%);
      }
      
      .borrar::before {
        position: absolute;
        top: -20px;
        content: "Delete";
        color: white;
        transition-duration: .3s;
        font-size: 2px;
      }
      
      .borrar:hover::before {
        font-size: 13px;
        opacity: 1;
        transform: translateY(30px);
        transition-duration: .3s;
      }
      .edit-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgb(20, 20, 20);
        border: none;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
        cursor: pointer;
        transition-duration: 0.3s;
        overflow: hidden;
        position: relative;
        text-decoration: none !important;
      }
      
      .edit-svgIcon {
        width: 17px;
        transition-duration: 0.3s;
      }
      
      .edit-svgIcon path {
        fill: white;
      }
      
      .edit-button:hover {
        width: 120px;
        border-radius: 50px;
        transition-duration: 0.3s;
        background-color: #007bff;
        align-items: center;
      }
      
      .edit-button:hover .edit-svgIcon {
        width: 20px;
        transition-duration: 0.3s;
        transform: translateY(60%);
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
      }
      
      .edit-button::before {
        display: none;
        content: "Edit";
        color: white;
        transition-duration: 0.3s;
        font-size: 2px;
      }
      
      .edit-button:hover::before {
        display: block;
        padding-right: 10px;
        font-size: 13px;
        opacity: 1;
        transform: translateY(0px);
        transition-duration: 0.3s;
      }
      .buttons-container{
        display:flex;
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
      .container{
        padding:20px;
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
        width: 154px;
        height: 49px;
        color: #fff;
        border: none;
        font-size: 20px;
        transition: all 0.3s ease-in-out;
        z-index: 1;
        overflow: hidden;
        align-self: center;
        
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
      .form-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
        aling-items:center;
      }
    
      .form-container div {
        display: flex;
        flex-direction: column;
        align-items: center;}
    
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
    
      .form-container input[type="color"] {
        padding: 5px;
        width: 100%;
        height: 50px;
      }
      .editSection{
        display:flex;
        flex-direction:column;
      }
      .content, .search-bar{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
    ul{
        padding:0;
        display:flex;
        gap:30px;
        flex-wrap:wrap;
        align-items: center;
        justify-content: center;
        

    }
    .buttons-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .search-bar h2{
        font-size: 2em;
        text-transform: capitalize;
        text-align: center;
        font-weight: 700;
        background-image: linear-gradient(to right, #ffff 15%, #14e2cd);
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
    }
    .search-bar input{
        
        background-color: #f5f5f5;
        color: #242424;
        padding: .15rem .5rem;
        
        border-radius: 4px;
        outline: none;
        border: none;
        line-height: 1.15;
        box-shadow: 0px 10px 20px -18px;
    }
    .search-bar input:focus{  
        border-bottom: 2px solid #5b5fc7;
        border-radius: 4px 4px 2px 2px;
    }
    .search-bar input:focus{
        outline: 1px solid lightgrey;
    }
    .itemInfo{
        display:flex;
        flex-direction:column;
        gap:5px;
        background-color: gray;
        border-radius:20px;
        padding: 30px;
        width: 300px;
        justify-content: space-between;

    }
    .itemInfo h4{
        font-size:1.5em
    }
    .itemInfo p{
        font-size:1.2em
    }
    

      @media (min-width: 600px) {
        
        .submit{
            align-self: flex-end;
        }
        .search-bar h2{
            font-size: 4em;
        }
        .search-bar input{
            width:50vw;
            height:50px;
        }
        .content h3{
            font-size:2em
        }
        .itemInfo{
            background-color: transparent;
        }
        .itemInfo:hover{
            background-color: gray;
        }
        .submit{
            align-self:center;
        }
        .form-container{
          align-items:center;
        }
        }
    `;
    static get properties() {
        return {
            type: { type: String },  // Define una propiedad 'type' de tipo String
            data: { type: Array },   // Define una propiedad 'data' de tipo Array
            editItem: { type: Object },  // Define una propiedad 'editItem' de tipo Object
            searchItem: { type: String }  // Define una propiedad 'searchItem' de tipo String
        };
    }

    connectedCallback() {
        super.connectedCallback();  // Llama al método connectedCallback de la clase padre
        const pageData = document.querySelector('principal-pages');  // Obtiene el elemento 'principal-pages' del DOM
        this.type = pageData.type;  // Asigna el tipo de datos desde 'principal-pages'
        this.data = [];  // Inicializa 'data' como un array vacío
        this.editItem = null;  // Inicializa 'editItem' como null
        this.searchItem = '';  // Inicializa 'searchItem' como una cadena vacía
        this.fetchData();  // Llama a 'fetchData' para obtener los datos iniciales
        this.billInfo={} //informacion para cuando vaya a imprimir
    }
    async fetchData() {
        try {
          if (this.type === "Reports"){
            const response = await fetch(`https://665ce299e88051d60404f656.mockapi.io/Reports`);  // Realiza una solicitud fetch para obtener los datos
            const data = await response.json();  // Convierte la respuesta a JSON
            this.data = data;  // Asigna los datos obtenidos a 'data'
            this.requestUpdate();  // Solicita una actualización del componente
          } else {
            const response = await fetch(`https://66560fd13c1d3b60293c1866.mockapi.io/${this.type}`);  // Realiza una solicitud fetch para obtener los datos
            const data = await response.json();  // Convierte la respuesta a JSON
            this.data = data;  // Asigna los datos obtenidos a 'data'
            this.requestUpdate();  // Solicita una actualización del componente
          }
        } catch (error) {
            console.error('Error fetching data:', error);  // Muestra un error en caso de fallo
        }
    }

    async updateItem() {
        if (!this.editItem) return;  // Si no hay un elemento en edición, retorna

        let updatedItem = { ...this.editItem };  // Crea una copia del elemento en edición

        if (this.type === 'Inventory') {
            // Elimina los campos que no deben ser actualizados en Inventory
            delete updatedItem.id;
            delete updatedItem.tag;
            delete updatedItem.adate;
            delete updatedItem.ddate;
            delete updatedItem.image;
            delete updatedItem.category;
            delete updatedItem.unit;
            delete updatedItem.color;
        } else {
            // Mantén solo los campos permitidos para Product
            updatedItem = {
                name: updatedItem.name,
                time: updatedItem.time,
            };
        }

        try {
          
            const response = await fetch(`https://66560fd13c1d3b60293c1866.mockapi.io/${this.type}/${this.editItem.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },  // Establece el encabezado de tipo de contenido
                body: JSON.stringify(updatedItem)  // Convierte el objeto a JSON y lo envía en el cuerpo de la solicitud
            });
            const updatedResponse = await response.json();  // Convierte la respuesta a JSON
            // Actualiza el dato localmente
            this.data = this.data.map(item => item.id === this.editItem.id ? updatedResponse : item);
            this.editItem = null;  // Limpia el elemento en edición
            this.requestUpdate();  // Solicita una actualización del componente
          
        } catch (error) {
            console.error('Error updating item:', error);  // Muestra un error en caso de fallo
        }
    }

    async deleteItem(id) {
        try {
          if (this.type === "Reports"){

            await fetch(`https://665ce299e88051d60404f656.mockapi.io/Reports/${id}`, {
                method: 'DELETE'  // Realiza una solicitud DELETE para eliminar el elemento
            });
            // Elimina el dato localmente
            this.data = (this.data).filter(item => item.id !== id);
            this.requestUpdate();  // Solicita una actualización del componente

          } else {

            await fetch(`https://66560fd13c1d3b60293c1866.mockapi.io/${this.type}/${id}`, {
                  method: 'DELETE'  // Realiza una solicitud DELETE para eliminar el elemento
              });
              // Elimina el dato localmente
              this.data = (this.data).filter(item => item.id !== id);
              this.requestUpdate();  // Solicita una actualización del componente
            }
          
        } catch (error) {
            console.error('Error deleting item:', error);  // Muestra un error en caso de fallo
        }
        this.requestUpdate();  // Solicita una actualización del componente
    }

    handleInputChange(e, type) {
        const { name, value } = e.target;  // Obtiene el nombre y el valor del input
        if (type === 'edit') {
            if (name.includes('materialInfo.')) {
                const key = name.split('.')[1];
                this.editItem.materialInfo[key] = value;
            } else {
                this.editItem = { ...this.editItem, [name]: value };  // Actualiza el elemento en edición
            }
        } else if (type === 'search') {
            this.searchItem = value;  // Actualiza la cadena de búsqueda
            this.requestUpdate();  // Solicita una actualización del componente
        }
    }


    setEditItem(item) {
        this.editItem = { ...item };  // Configura el elemento a editar
    }

    firstUpdated(){
        const backbutton = this.shadowRoot.querySelector(".back-button");
        backbutton.addEventListener("click", () => {
            const principalPage = `<principal-pages></principal-pages>`;
            this.parentNode.insertAdjacentHTML("beforeend", principalPage);
            this.parentNode.removeChild(this);
        });
    }
   

    render() {
        return html`
        <div class='container'>
            <button class="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 5L3 12m0 0l7 7m-7-7h18" ></path>
                </svg>
                <p>Go back</p>
            </button>
            <div class="content">
                <div class="search-bar">
                    <label for="searcher"><h2>Type the ${this.type}'s id you're looking for!</h2></label>
                    <input type="text" id="searcher" @input="${e => this.handleInputChange(e, 'search')}" placeholder="Search">  
                </div>
                <h3>---- Results ----</h3>
                <ul>
                ${this.searchItem !== '' 
                    ? (this.data).filter(item => (item.tag).includes(this.searchItem)).map(item => this.renderItem(item))  
                    : (this.data).map(item => this.renderItem(item)) 
                }
                </ul>
            </div>
        </div>
        `;
    }

    renderItem(item) {
        return html`
        <div class="itemInfo">
            <li style="list-style-type: none;">
                <h4>${item.tag}</h4>${this.renderItemDetails(item)} 
                </li>
                <div class="buttons-container">
                ${(this.type !== "Reports") ? 
                  html`<button @click="${() => this.setEditItem(item)}"class="edit-button"><svg class="edit-svgIcon" viewBox="0 0 512 512">
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                </button>` : html`<a @click="${() => this.printBill(item)}"> Imprimir</a>`
                }
                <button @click="${() => this.deleteItem(item.id)}" class="borrar"><svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></button>  
                </div>
                ${this.editItem && this.editItem.id === item.id ? this.renderEditForm() : ''}
        </div>
        `;
    }

    renderItemDetails(item) {
        // Muestra los detalles según el tipo de dato
        if (this.type === 'Inventory') {
            return html`<p><strong>Name:</strong> ${item.name}<br><strong>Stock:</strong> ${item.stock}</p>`;
        } else if (this.type === "Products"){
            return html`<p><strong>Name:</strong> ${item.name}<br><strong>Category: </strong> ${item.category}</p>`;
        } else {
            return html`<p><strong>Quantity:</strong> ${item.quantity}<br><strong>Total of Employees:</strong> ${item.totalEmployees}<br><strong>Total of Indirect Costs:</strong> ${item.totalIndirect}<br><strong>Total of Products:</strong> ${item.totalProducts}<br><strong>Efectivity:</strong> ${item.efectivity}<br><strong>Total price:</strong> ${item.totalPrice}</p>`;
        }
    }

    renderEditForm() {
        return html`
            <div class="form-container">
                ${this.type === 'Inventory' ? this.renderInventoryEditForm() : this.renderProductEditForm()}  
                <button @click="${() => this.updateItem()}" class="submit">Guardar</button>  
            </div>
        `;
    }

    renderInventoryEditForm() {
        return html`
        <div class="editSection">
        <label for="name">Name</label> <input type="text" name="name" .value="${this.editItem.name}" @input="${e => this.handleInputChange(e, 'edit')}">
        </div>
        <div class="editSection">
        <label for="description">Description</label> <input type="text" name="description" .value="${this.editItem.description}" @input="${e => this.handleInputChange(e, 'edit')}">
        </div>
        <div class="editSection">
        <label for="supplier">Supplier</label><input type="text" name="supplier" .value="${this.editItem.supplier}" @input="${e => this.handleInputChange(e, 'edit')}">
        </div>
        <div class="editSection">
        <label for="price">Price</label> <input type="text" name="price" .value="${this.editItem.price}" @input="${e => this.handleInputChange(e, 'edit')}">
        </div>
        <div class="editSection">
        <label for="stock">Stock</label> <input type="text" name="stock" .value="${this.editItem.stock}" @input="${e => this.handleInputChange(e, 'edit')}">
        </div>
        <div class="editSection">
        <label for="location">Location</label> <input type="text" name="location" .value="${this.editItem.location}" @input="${e => this.handleInputChange(e, 'edit')}">
        </div>
        <div class="editSection">
        <label for="notes">Notes</label> <input type="text" name="notes" .value="${this.editItem.notes}" @input="${e => this.handleInputChange(e, 'edit')}">
        </div>  
          
        `;
    }

    renderProductEditForm() {
        return html`
            <label for="name">Name</label> <input type="text" name="name" .value="${this.editItem.name}" @input="${e => this.handleInputChange(e, 'edit')}">
            
        `;
    }

    printBill(item){
      this.billInfo=item
      console.log(this.billInffo)
      const newBill='<bill-print></bill-print>'
      this.parentNode.insertAdjacentHTML('beforeend',newBill)
      this.parentNode.removeChild(this)
    }
}

customElements.define('page-search', pageSearch);
