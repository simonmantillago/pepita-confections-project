import { LitElement, css, html } from "lit";
import data from "../data/pages-data.json";

export class pageCreate extends LitElement {
    static styles = css`
    .back-button,
    .submmit {
      display: inline-block;
      margin-top: 16px;
      padding: 10px 20px;
      color: #fff;
      background-color: #007bff;
      border: none;
      border-radius: 4px;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
    }
    .back-button:hover,
    .submmit:hover {
      background-color: #0056b3;
    }
    .back-button {
      background-color: #6c757d;
    }
    .back-button:hover {
      background-color: #5a6268;
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
      <div>${this.crudOption} ${this.type}</div>
      <div style="display:flex;">
        <form class="form-container">
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
                    <label for="${key}" class="form__label"
                      >${item[0] === "date" || item[0] === "color"
                              ? item[1]
                              : ""}</label
                    >
                    <input
                      type=${item[0]}
                      class="form__field"
                      placeholder="${item[1]}"
                      required=""
                      id="${key}"
                      name="${key}"
                    />
                  </div>
                  `;
                  }
              }
          )}
          <div>${this.type === "Products" ? this.newhtml() : ""}</div>
          </form>
          <div style="width: max-content; background-color:">
            <img style="width: 15%;" src="../imgs/T-shirt.png">
          </div>
        </div>
      <a class="back-button">← Go back</a>
      <a class="submmit">Submit</a>
    `;
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

        const submmitButton = this.shadowRoot.querySelector(".submmit");
        submmitButton.addEventListener("click", async (event) => {
            const container = this.shadowRoot.querySelector(".form-container");
            const data = Object.fromEntries(new FormData(container).entries());
            const inputData = JSON.parse(JSON.stringify(data));
            if (this.type == "Inventory") {
                const {
                    tag,
                    name,
                    description,
                    category,
                    suplier,
                    price,
                    unit,
                    stock,
                    buydate,
                    duedate,
                    ubication,
                    notes,
                    color,
                } = inputData;
                this.Submit = {
                    tag: tag,
                    name: name,
                    description: description,
                    category: category,
                    suplier: suplier,
                    price: price,
                    unit: unit,
                    stock: stock,
                    adate: buydate,
                    ddate: duedate,
                    ubication: ubication,
                    notes: notes,
                    color: color,
                };
            } else if (this.type === "Products") {
                const { tag, image, name, ...materials } = inputData;
                const imgUrl = `/imgs/${image}.png`;
                this.Submit = {
                    name: name,
                    tag: tag,
                    image: imgUrl,
                    materialInfo: materials,
                };
            }
            try {
                const response = await fetch(
                    `https://66560fd13c1d3b60293c1866.mockapi.io/${this.type}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
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
        });
    }
    async findData() {
        try {
            const response = await fetch(
                `https://66560fd13c1d3b60293c1866.mockapi.io/Inventory`
            );
            this.materials = await response.json();
            this.isReady = true;
            this.requestUpdate(); // Trigger a re-render to display materials
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
        <select
          id=${material}
          name=${material}
          @change="${(event) => this.materialSelected(event, material)}"
        >
          <option value="N/A">N/A</option>
          ${this.renderMaterials(material)}
        </select>
        <input
          type="number"
          class="form__field ${material}Cuantity"
          placeholder=""
          required=""
          id="${material}Cuantity"
          name="${material}Cuantity"
          disabled
        />
        <input
          id="${material}Unit"
          name="${material}Unit"
          class="${material}Unit"
          disabled
        />
        <input
          id="${material}Color"
          name="${material}Color"
          class="${material}color"
          disabled
        />
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
                            
        materialSelected(event, material){
            const isNA = event.target.value
            const selectedMaterial = event.target;
            const selectedOption = selectedMaterial.options[selectedMaterial.selectedIndex];
            const unit = selectedOption.getAttribute('unit');
            const color = selectedOption.getAttribute('materialColor');
            const materialUnit = this.shadowRoot.querySelector(`.${material}Unit`)
            const materialColor = this.shadowRoot.querySelector(`.${material}color`)
            const cuantityInput = this.shadowRoot.querySelector(`.${material}Cuantity`)
            if(isNA==="N/A"){
                cuantityInput.disabled=true
                materialColor.disabled=true
                materialUnit.disabled=true
                materialUnit.value= ""
                cuantityInput.value= ""
                materialColor.value =""
                materialColor.style.backgroundColor="transparent"
                
            }else{
                cuantityInput.disabled=false
                materialColor.disabled=false
                materialUnit.disabled=false
                materialUnit.setAttribute("readonly", "readonly")
                materialColor.setAttribute("readonly", "readonly")
                materialUnit.value= unit
                materialColor.value =color
                materialColor.style.color=(color)
                materialColor.style.backgroundColor=(color)}
        }
    }


customElements.define("page-create", pageCreate);
