import { LitElement, css, html } from 'lit';

export class pageSearch extends LitElement{

    connectedCallback(){
        super.connectedCallback();
        this.fetchData();
        const pageData = document.querySelector('principal-pages');
        this.type = pageData.type
        this.department = pageData.option
        this.Modified = {}
        this.tag = ''
        this.searchItem = ''
        this.requestUpdate();
    }
    
    async fetchData() {
        try {
            const response = await fetch(`https://6657bc775c3617052645bc99.mockapi.io/Inventory`);
            const data = await response.json();
            this.data = data;
            console.log(this.data);
            this.requestUpdate();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async updateItem() {
        if (!this.editItem) return;

        try {
            const response = await fetch(`https://664b70de35bbda10987cf5f7.mockapi.io/Inventory/${this.editItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.editItem)
            });
            const updatedItem = await response.json();
            this.data = this.data.map(item => item.id === this.editItem.id ? updatedItem : item);  // Actualizar la lista de datos
            this.editItem = null;  // Limpiar el formulario de edición
        } catch (error) {
            console.error('Error updating item:', error);  // Manejo de errores
        }
    }

    async deleteItem(id) {
        try {
            await fetch(`https://664b70de35bbda10987cf5f7.mockapi.io/Inventory/${id}`, {
                method: 'DELETE'
            });
            this.data = this.data.filter(item => item.id !== id);  // Actualizar la lista de datos eliminando el elemento
        } catch (error) {
            console.error('Error deleting item:', error);  // Manejo de errores
        }
    }
    

    handleInputChange(e, type) {
        const { name, value } = e.target;
        if (type === 'edit') {
            this.editItem = { ...this.editItem, [name]: value };  // Actualizar el elemento en edición
        } else if (type === 'search') {
            this.searchItem = value
            this.requestUpdate();
        }
    }

    // Método para establecer el elemento que se está editando
    setEditItem(item) {
        this.editItem = { ...item };
    }
    
    render(){

        return html`
            <div>
                <div class="search-bar">
                    <label for="searcher"><h2>Type the ${this.type}'s id you're looking for!</h2></label>
                    <input type="text" id="searcher" @input="${e => this.handleInputChange(e, 'search')}">
                    </div>
                    <h3>---- Results ----</h3>
                    <ul>

                    ${this.searchItem !== '' ? (this.data).filter(item => item.tag.includes(this.searchItem)).map(item => html`
                    <li>
                        <h4>${item.tag}</h4> - ${item.name} - ${item.stock}
                        <button @click="${() => this.setEditItem(item)}">Editar</button>
                        <button @click="${() => this.deleteItem(item.id)}">Eliminar</button>                     
                    </li>
                        `) : (this.data).map(item => html`
                        <li>
                        <h4>${item.tag}</h4> - ${item.name} - ${item.stock}
                        <button @click="${() => this.setEditItem(item)}">Editar</button>
                        <button @click="${() => this.deleteItem(item.id)}">Eliminar</button> 
                        
                        </li>`) }
                        </ul>
                        </div>
        `
    }
}

customElements.define("page-search", pageSearch);