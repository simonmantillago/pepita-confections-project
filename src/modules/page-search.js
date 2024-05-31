import { LitElement, css, html } from 'lit';  // Importa LitElement, css y html desde la librería 'lit'

export class pageSearch extends LitElement {
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
    }

    async fetchData() {
        try {
            const response = await fetch(`https://66560fd13c1d3b60293c1866.mockapi.io/${this.type}`);  // Realiza una solicitud fetch para obtener los datos
            const data = await response.json();  // Convierte la respuesta a JSON
            this.data = data;  // Asigna los datos obtenidos a 'data'
            this.requestUpdate();  // Solicita una actualización del componente
        } catch (error) {
            console.error('Error fetching data:', error);  // Muestra un error en caso de fallo
        }
    }

    async updateItem() {
        if (!this.editItem) return;  // Si no hay un elemento en edición, retorna

        const updatedItem = { ...this.editItem };  // Crea una copia del elemento en edición
        // Elimina los campos que no deben ser actualizados
        delete updatedItem.id;
        delete updatedItem.tag;
        delete updatedItem.adate;
        delete updatedItem.ddate;
        delete updatedItem.image;
        delete updatedItem.category;

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
            await fetch(`https://66560fd13c1d3b60293c1866.mockapi.io/${this.type}/${id}`, {
                method: 'DELETE'  // Realiza una solicitud DELETE para eliminar el elemento
            });
            // Elimina el dato localmente
            this.data = this.data.filter(item => item.id !== id);
            this.requestUpdate();  // Solicita una actualización del componente
        } catch (error) {
            console.error('Error deleting item:', error);  // Muestra un error en caso de fallo
        }
    }

    handleInputChange(e, type) {
        const { name, value } = e.target;  // Obtiene el nombre y el valor del input
        if (type === 'edit') {
            this.editItem = { ...this.editItem, [name]: value };  // Actualiza el elemento en edición
        } else if (type === 'search') {
            this.searchItem = value;  // Actualiza la cadena de búsqueda
            this.requestUpdate();  // Solicita una actualización del componente
        }
    }
    BackButton(){
        const backbutton=this.shadowRoot.querySelector('.back-button')
        backbutton.addEventListener('click',()=>{
            const principalPage=`<principal-pages></principal-pages>`;
            this.parentNode.insertAdjacentHTML('beforeend',principalPage);
            this.parentNode.removeChild(this);
        })
    }

    setEditItem(item) {
        this.editItem = { ...item };  // Configura el elemento a editar
    }

    render() {
        return html`
        <div>
            
            <div class="search-bar">
                <label for="searcher"><h2>Type the ${this.type}'s id you're looking for!</h2></label>
                <input type="text" id="searcher" @input="${e => this.handleInputChange(e, 'search')}">  
            </div>
            <h3>---- Results ----</h3>
            <ul>
            ${this.searchItem !== '' 
                ? this.data.filter(item => item.tag.includes(this.searchItem)).map(item => this.renderItem(item))  
                : this.data.map(item => this.renderItem(item)) 
            }
            </ul>
        </div>
        `;
    }

    renderItem(item) {
        return html`
            <li>
                <h4>${item.tag}</h4>${this.renderItemDetails(item)} 
                <button @click="${() => this.setEditItem(item)}">Editar</button> 
                <button @click="${() => this.deleteItem(item.id)}">Eliminar</button>  
                ${this.editItem && this.editItem.id === item.id ? this.renderEditForm() : ''}
            </li>
        `;
    }

    renderItemDetails(item) {
        // Muestra los detalles según el tipo de dato
        if (this.type === 'Inventory') {
            return html`Name: ${item.name} - Stock: ${item.stock}`;
        } else {
            return html`Cuantity: ${item.cuantity} - Time: ${item.time}`;
        }
    }

    renderEditForm() {
        return html`
            <div>
                ${this.type === 'Inventory' ? this.renderInventoryEditForm() : this.renderProductEditForm()}  
                <button @click="${() => this.updateItem()}">Guardar</button>  
            </div>
        `;
    }

    renderInventoryEditForm() {
        return html`
            <label>Name: <input type="text" name="name" .value="${this.editItem.name}" @input="${e => this.handleInputChange(e, 'edit')}"></label>
            <label>Description: <input type="text" name="description" .value="${this.editItem.description}" @input="${e => this.handleInputChange(e, 'edit')}"></label>
            <label>Suplier: <input type="text" name="suplier" .value="${this.editItem.suplier}" @input="${e => this.handleInputChange(e, 'edit')}"></label>
            <label>Price: <input type="text" name="price" .value="${this.editItem.price}" @input="${e => this.handleInputChange(e, 'edit')}"></label>
            <label>Unit: <input type="text" name="unit" .value="${this.editItem.unit}" @input="${e => this.handleInputChange(e, 'edit')}"></label>
            <label>Stock: <input type="text" name="stock" .value="${this.editItem.stock}" @input="${e => this.handleInputChange(e, 'edit')}"></label>
            <label>Ubication: <input type="text" name="ubication" .value="${this.editItem.ubication}" @input="${e => this.handleInputChange(e, 'edit')}"></label>
            <label>Notes: <input type="text" name="notes" .value="${this.editItem.notes}" @input="${e => this.handleInputChange(e, 'edit')}"></label>
            <label>Color: <input type="color" name="color" .value="${this.editItem.color}" @input="${e => this.handleInputChange(e, 'edit')}"></label>
        `;
    }

    renderProductEditForm() {
        return html`
            <label>Cuantity: <input type="text" name="cuantity" .value="${this.editItem.cuantity}" @input="${e => this.handleInputChange(e, 'edit')}"></label>
            <label>Time: <input type="text" name="time" .value="${this.editItem.time}" @input="${e => this.handleInputChange(e, 'edit')}"></label>
            <label>Salary: <input type="text" name="salary" .value="${this.editItem.salary}" @input="${e => this.handleInputChange(e, 'edit')}"></label>
            <label>Color: <input type="color" name="color" .value="${this.editItem.color}" @input="${e => this.handleInputChange(e, 'edit')}"></label>
        `;
    }
}

customElements.define("page-search", pageSearch);  // Define el nuevo componente 'page-search'
