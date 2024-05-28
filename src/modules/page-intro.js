import { LitElement, css, html } from 'lit';

export class pageIntro extends LitElement {
    static styles = css`
    /* Estilos CSS opcionales */
  `;

  static properties = {
    data: { type: Array },// Propiedad para almacenar los datos obtenidos de la API
    newItem: { type: Object }, // Propiedad para el nuevo elemento que se va a crear
    editItem: { type: Object } // Propiedad para el elemento que se está editando
  };

  constructor() {
    super();
    this.data = [];
    this.newItem = { Name: '', City: '' }; //// Inicialización del nuevo elemento, aca se debe poner la estructura del objeto que se quiere crear
    this.editItem = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchData(); // Cargar datos al conectarse el componente
  }

  async fetchData() {
    try {
      const response = await fetch('https://664b70de35bbda10987cf5f7.mockapi.io/people');
      const data = await response.json();
      this.data = data;
      console.log(data[0])
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async createItem() {
    try {
      const response = await fetch('https://664b70de35bbda10987cf5f7.mockapi.io/people', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.newItem)
      });
      const newItem = await response.json();
      this.data = [...this.data, newItem];  // Añadir el nuevo elemento a la lista de datos
      this.newItem = { name: '', city: '' };  // Resetear el formulario, CAMBIAR ESTRUCTURA
    } catch (error) {
      console.error('Error creating item:', error);  // Manejo de errores
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


  render() {
    return html`
    <div>
    <h2>Datos de MockAPI</h2>

    <!-- Formulario para crear nuevo item -->
    <div>
      <input name="name" .value="${this.newItem.Name}" @input="${e => this.handleInputChange(e, 'new')}" placeholder="Nombre" />
      <input name="city" .value="${this.newItem.City}" @input="${e => this.handleInputChange(e, 'new')}" placeholder="Ciudad" />
      <button @click="${this.createItem}">Crear</button>
    </div>

    <!-- Lista de items -->
    <ul>
      ${this.data.map(item => html`
        <li>
          ${item.name} - ${item.city}
          <button @click="${() => this.setEditItem(item)}">Editar</button>
          <button @click="${() => this.deleteItem(item.id)}">Eliminar</button>
        </li>
      `)}
    </ul>

    <!-- Formulario para editar item -->
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
    `;
  }
}
customElements.define('page-intro', pageIntro);