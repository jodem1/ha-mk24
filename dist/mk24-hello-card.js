// src/mk24-hello-card.ts
var Mk24HelloCard = class extends HTMLElement {
  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = config;
    this.render();
  }
  set hass(hass) {
    this._hass = hass;
    this.render();
  }
  getCardSize() {
    return 2;
  }
  render() {
    if (!this._config) {
      return;
    }
    const title = this._config.title || "MK24 Hello Card";
    const entityId = this._config.entity;
    const stateText = entityId && this._hass?.states[entityId] ? this._hass.states[entityId].state : "No entity selected";
    this.innerHTML = `
      <ha-card header="${title}">
        <div class="card-content">
          <p>Card is loaded correctly.</p>
          <p><strong>State:</strong> ${stateText}</p>
        </div>
      </ha-card>
    `;
  }
};
customElements.define("mk24-hello-card", Mk24HelloCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "mk24-hello-card",
  name: "MK24 Hello Card",
  description: "Simple test card to validate custom card setup."
});
//# sourceMappingURL=mk24-hello-card.js.map
