import { LitElement, css, html } from "lit";
import data from "../data/pages-data.json";

export class pageCreate extends LitElement {
  static styles = css`
  .button-container {
    display: flex;
    justify-content: space-between;
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

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    
  }

  .title-create {
    text-transform: capitalize;
    font-size: 3.3em;
    text-align: center;
    font-weight: 600;
    background-image: linear-gradient(to right, #ffff 15%, #14e2cd);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .form-container div {
    display: flex;
    flex-direction: column;
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
  .warning {
    color: red;
    font-size: 1em;
    text-align: center;
    display: none; /* Hidden by default */
  }

  .warning.show {
    display: block; /* Show when form is invalid */
  }

  @media (min-width: 600px) {
    .form-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      width: 100%;
    }

  }
`;
connectedCallback() {
  super.connectedCallback();
  const pageData = document.querySelector("principal-pages");
  this.type = pageData.type;
  this.crudOption = pageData.option;
  this.Submit = {};
  this.materials = [];
  this.isReady = false;
}

render() {
  return html`
    <div class="container">
      <div class="title-create">${this.crudOption} ${this.type}</div>
      <form class="form-container" @input="${this.checkFormValidity}">
        ${Object.entries(data[this.type][this.crudOption]).map(
          ([key, item]) => {
            if (Array.isArray(item[1])) {
              return html`
                <div>
                  <label for="options">${item[0]}</label>
                  <select id="options" name="${key}">
                    ${item[1].map((element) => {
                      return html` <option>${element}</option> `;
                    })}
                  </select>
                </div>
              `;
            } else {
              return html`
              <div class="${key}">
                <label for="${key}" class="form__label">${item[0] === "date" || item[0] === "color" ? item[1] : item[1]}</label>
                <input type=${item[0]} class="form__field" required="" id="${key}" name="${key}"/>
              </div>
              `;
            }
          }
        )}
        ${this.type === "Products" ? this.newhtml() : ""}
      </form>
      <div class="warning">Please fill out all fields before submitting.</div>
      <button class="submit" disabled>Submit</button>
      <div class="back-button-container">
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

resetColorForm() {
  const materialUnits = this.shadowRoot.querySelectorAll('.utility');
  const materialColors = this.shadowRoot.querySelectorAll('.colorDisable');

  materialUnits.forEach(unit => {
    unit.disabled = true;
    unit.value = "";
  });

  materialColors.forEach(color => {
    color.disabled = true;
    color.value = "";
    color.style.backgroundColor = "transparent";
  });
}

firstUpdated() {
  if (this.type === "Products") {
    this.findData();
  }

  const backbutton = this.shadowRoot.querySelector(".back-button");
  backbutton.addEventListener("click", () => {
    const principalPage = `<principal-pages></principal-pages>`;
    this.parentNode.insertAdjacentHTML("beforeend", principalPage);
    this.parentNode.removeChild(this);
  });

  const submitButton = this.shadowRoot.querySelector(".submit");
  submitButton.addEventListener("click", async (event) => {
    event.preventDefault(); 
    const container = this.shadowRoot.querySelector(".form-container");
    const data = Object.fromEntries(new FormData(container).entries());
    const inputData = JSON.parse(JSON.stringify(data));
    if (this.type == "Inventory") {
      const {
        tag, name, description, category, supplier, price, unit,
        stock, buydate, duedate, location, notes, color
      } = inputData;
      this.Submit = {
        tag, name, description, category, supplier, price, unit,
        stock, adate: buydate, ddate: duedate, location, notes, color
      };
    } else if (this.type === "Products") {
      const { tag, image, name, ...materials } = inputData;
      const imgUrl = `/imgs/${image}.png`;
      this.Submit = {
        name, tag, image: imgUrl, materialInfo: materials, category: image
      };
    }
    try {
      const response = await fetch(`https://66560fd13c1d3b60293c1866.mockapi.io/${this.type}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.Submit),
        }
      );
      if (!response.ok) {
        throw new Error("Error al enviar POST al MockAPI");
      }
      const responseData = await response.json();
      console.log("Respuesta de la API:", responseData);
    } catch (error) {
      console.error("Error al enviar POST a la API:", error);
    }
    container.reset();
    this.resetColorForm();
    this.requestUpdate();
  });
}

async findData() {
  try {
    const response = await fetch(`https://66560fd13c1d3b60293c1866.mockapi.io/Inventory`);
    this.materials = await response.json();
    this.isReady = true;
    this.requestUpdate(); 
  } catch (error) {
    console.error("Error fetching materials:", error);
  }
}

newhtml() {
  return html`
  ${data["Inventory"]["create"]["category"][1].map((element) => {
    return html`${this.createMaterialsHtml(element)}`;
  })}
`;
}

createMaterialsHtml(material) {
  return html`
  <div>
    <label for=${material}>${material}</label>
    <select id=${material} name=${material} @change="${(event) => this.materialSelected(event, material)}" required>
      <option value="N/A">N/A</option>
      ${this.renderMaterials(material)}
    </select>
    <input type="number" class="form__field ${material}Cuantity utility" placeholder="" required="" id="${material}Cuantity" name="${material}Cuantity" disabled />
    <input id="${material}Unit" name="${material}Unit" class="${material}Unit utility" disabled />
    <input id="${material}Color" name="${material}Color" class="${material}color utility colorDisable" disabled />
  </div>
  `;
}

renderMaterials(materialType) {
  if (this.isReady) {
    return this.materials.map(material => {
      if (material['category'] === materialType) {
        return html`<option materialColor="${material['color']}" unit="${material['unit']}">${material['tag']}</option>`;
      }
    });
  }
  return html``;
}

materialSelected(event, material) {
  const isNA = event.target.value
  const selectedMaterial = event.target;
  const selectedOption = selectedMaterial.options[selectedMaterial.selectedIndex];
  const unit = selectedOption.getAttribute('unit');
  const color = selectedOption.getAttribute('materialColor');
  const materialUnit = this.shadowRoot.querySelector(`.${material}Unit`)
  const materialColor = this.shadowRoot.querySelector(`.${material}color`)
  const cuantityInput = this.shadowRoot.querySelector(`.${material}Cuantity`)
  if (isNA === "N/A") {
    cuantityInput.disabled = true
    materialColor.disabled = true
    materialUnit.disabled = true
    materialUnit.value = ""
    cuantityInput.value = ""
    materialColor.value = ""
    materialColor.style.backgroundColor = "transparent"
  } else {
    cuantityInput.disabled = false
    materialColor.disabled = false
    materialUnit.disabled = false
    materialUnit.setAttribute("readonly", "readonly")
    materialColor.setAttribute("readonly", "readonly")
    materialUnit.value = unit
    materialColor.value = color
    materialColor.style.color = (color)
    materialColor.style.backgroundColor = (color)
  }
  this.checkFormValidity();
}

checkFormValidity() {
  const form = this.shadowRoot.querySelector('.form-container');
  const submitButton = this.shadowRoot.querySelector('.submit');
  const warningMessage = this.shadowRoot.querySelector('.warning');

  if (form.checkValidity()) {
    submitButton.disabled = false;
    warningMessage.classList.remove('show');
  } else {
    submitButton.disabled = true;
    warningMessage.classList.add('show');
  }
}
}

customElements.define("page-create", pageCreate);
