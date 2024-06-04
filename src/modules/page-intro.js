import { LitElement, css, html } from "lit";
import data from "../data/pages.json";

export class pages extends LitElement {
  static styles = css`
    .container{
        padding-top:25vh;   
        display:flex;
        flex-direction:column;
        justify-content:center;
    }
    .title{
        font-size:3.3em;
        text-align:center;
        font-weight: 600;
        background-image: linear-gradient(to right, #ffff 15%, #14e2cd);
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;

    }
    .buttons-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .button {
        margin: 10px;
        padding: 10px 20px;
        background-color: #007bff!important;
        color: white;
        text-decoration: none;
        border-radius: 5px;
    }
    .back-button {
        display: none;
        margin: 20px auto;
        text-align: center;
        text-decoration: none;
        color: #007bff;
    }
    .buttons-container {
        flex-direction: column;
        align-items: center;
    }
    .button {
        width: 80%;
        text-align: center;
    }
    .button {
        font-family: 'Poppins' !important;
        position: relative;
        padding: 10px 20px;
        border-radius: 7px;
        border: 1px solid rgb(61, 106, 255);
        font-size: 1em;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 2px;
        background: transparent;
        color: #fff;
        overflow: hidden;
        box-shadow: 0 0 0 0 transparent;
        -webkit-transition: all 0.2s ease-in;
        -moz-transition: all 0.2s ease-in;
        transition: all 0.2s ease-in;
      }
      
      .button:hover {
        background: rgb(61, 106, 255);
        box-shadow: 0 0 30px 5px rgba(0, 142, 236, 0.815);
        -webkit-transition: all 0.2s ease-out;
        -moz-transition: all 0.2s ease-out;
        transition: all 0.2s ease-out;
      }
      
      .button:hover::before {
        -webkit-animation: sh02 0.5s 0s linear;
        -moz-animation: sh02 0.5s 0s linear;
        animation: sh02 0.5s 0s linear;
      }
      
      .button::before {
        content: '';
        display: block;
        width: 0px;
        height: 86%;
        position: absolute;
        top: 7%;
        left: 0%;
        opacity: 0;
        background: #fff;
        box-shadow: 0 0 50px 30px #fff;
        -webkit-transform: skewX(-20deg);
        -moz-transform: skewX(-20deg);
        -ms-transform: skewX(-20deg);
        -o-transform: skewX(-20deg);
        transform: skewX(-20deg);
      }
      
      @keyframes sh02 {
        from {
          opacity: 0;
          left: 0%;
        }
      
        50% {
          opacity: 1;
        }
      
        to {
          opacity: 0;
          left: 100%;
        }
      }
      
      .back-button {
        padding: 0;
        margin: 0;
        border: none;
        background: none;
        cursor: pointer;
      }
      
      .back-button {
        --primary-color: #ffff;
        --hovered-color: #ffff;
        position: relative;
        display: none;
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
      .back-button-container{
        align-self:center;
      }
      @media (min-width: 600px) {
        .title{
          font-size:6em;
        }
        .button{
          font-size:1.5em;
        }
      }
`;
  constructor() {
    super();
    this.page = "page-1";
    this.pageData = {};
    this.type = "";
    this.option = "";
  }

  render() {
    this.pageData = data[this.page];
    return html`
      <div class="container">
        <div class="title">${this.pageData["title"]}</div>
        <div class="buttons-container">
          ${this.pageData["options"].map(
            (option) => html`
              <button class="button" id="${option}">${option}</button>
            `
          )}
        </div>
        <div class = "back-button-container">
          <button class="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4" >
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 5L3 12m0 0l7 7m-7-7h18" ></path>
            </svg>
            <p>Go back</p>
          </button>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    const backbutton = this.shadowRoot.querySelector(".back-button");
    backbutton.addEventListener("click", () => {
      this.page = "page-1";
      backbutton.style.display = "none";
      this.requestUpdate();
    });

    const divContainer = this.shadowRoot.querySelector(".buttons-container");
    divContainer.addEventListener("click", (e) => {
      const button = e.target.closest(".button");
      if (button.id === "Inventory") {
        this.page = "page-2";
        backbutton.style.display = "flex";
        this.requestUpdate();
      } else if (button.id === "Products") {
        this.page = "page-3";
        backbutton.style.display = "flex";
        this.requestUpdate();
      } else if (button.id === "Reports") {
        this.page = "page-4";
        backbutton.style.display = "flex";
        this.requestUpdate();
      } else {
        this.otherOPtions(button.id, this.pageData["title"]);
      }
    });
  }

  otherOPtions(option, type) {
    this.option = option;
    this.type = type;
    const generateComponent = `<page-${option}></page-${option}>`;
    this.parentNode.insertAdjacentHTML("beforeend", generateComponent);
    this.parentNode.removeChild(this);
  }
}
customElements.define("principal-pages", pages);
