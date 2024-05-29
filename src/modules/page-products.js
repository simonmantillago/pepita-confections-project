import { LitElement, css, html } from 'lit';

export class pageProducts extends LitElement {

    constructor(){
        super()
        this.books={}
    }
    static properties = {
        books: { type: Object },
    }
    firstUpdated(){
        this.fetchBooks()
    }
    async fetchBooks() {
        const response = await fetch('https://66560fd13c1d3b60293c1866.mockapi.io/products');
        this.books = await response.json();
    }
    
    render() {
        return html`
            <ul>
            ${Object.entries(this.books).map(([key, item]) => html`
            // <div>"${key} es igual a ${item.price} ${item.id}"</div>
            `)}
            </ul>
        `;
        }
    }

customElements.define("page-products", pageProducts);
