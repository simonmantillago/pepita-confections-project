import { LitElement, css, html } from 'lit';

export class pageSearch extends LitElement{

    connectedCallback(){
        super.connectedCallback();
        this.fetchData();
        const pageData = document.querySelector('principal-pages');
        this.type = pageData.type
        this.department = pageData.option
        this.Modified = {}
        this.tag
    }

    async fetchData() {
        try {
          const response = await fetch(`https://66560fd13c1d3b60293c1866.mockapi.io/${this.type}`);
          const data = await response.json();
          this.data = data;
          console.log(data[0])
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    async updateItem() {
        if (!this.editItem) return;

        try {
            const response = await fetch(`https://664b70de35bbda10987cf5f7.mockapi.io/people/${this.editItem.id}`, {
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
            await fetch(`https://664b70de35bbda10987cf5f7.mockapi.io/people/${id}`, {
            method: 'DELETE'
            });
            this.data = this.data.filter(item => item.id !== id);  // Actualizar la lista de datos eliminando el elemento
        } catch (error) {
            console.error('Error deleting item:', error);  // Manejo de errores
        }
    }
    handleInputChange(e, type) {
        const { name, value } = e.target;
        if (type === 'new') {
            this.newItem = { ...this.newItem, [name]: value };  // Actualizar el nuevo elemento
        } else if (type === 'edit') {
            this.editItem = { ...this.editItem, [name]: value };  // Actualizar el elemento en edición
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
                    <label for="searcher">Type the ${zzz}'s id you're looking for!</label>
                    <input type="text" id="searcher">
                </div>
                <ul>
                    Results
                    ${this.data[this.type].filter(item => item.value === this.pageData[this.tag], html`
                    <li>
                        ${bla} - ${bla} - ${bla} - ${bla} - ${bla}
                        <button @click="${() => this.setEditItem(item)}">Editar</button>
                        <button @click="${() => this.deleteItem(item.id)}">Eliminar</button>        
                    </li>
                    `)}
                </ul>
            
                ${this.editItem ? html`
                    <div>
                    <h3>Editar Item</h3>
                    <input name="name" .value="${this.editItem.name}" @input="${e => this.handleInputChange(e, 'edit')}" placeholder="Nombre" />
                    <input name="city" .value="${this.editItem.city}" @input="${e => this.handleInputChange(e, 'edit')}" placeholder="Ciudad" />
                    <button @click="${this.updateItem}">Actualizar</button>
                    <button @click="${() => this.editItem = null}">Cancelar</button>
                    </div>
                ` : ''}  
            </div>
        `
    }
}

// async deleteItem(id) {
//     try {
//       await fetch(`https://664b70de35bbda10987cf5f7.mockapi.io/people/${id}`, {
//         method: 'DELETE'
//       });
//       this.data = this.data.filter(item => item.id !== id);  // Actualizar la lista de datos eliminando el elemento
//     } catch (error) {
//       console.error('Error deleting item:', error);  // Manejo de errores
//     }
//   }
customElements.define("page-search", pageSearch);