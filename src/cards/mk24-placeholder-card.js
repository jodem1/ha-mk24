class Mk24PlaceholderCard extends HTMLElement {
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

    const title = this._config.title || "MK24 Placeholder Card";

    this.innerHTML = `
      <ha-card header="${title}">
        <div class="card-content">
          <p>This is a placeholder for your next custom card.</p>
          <p>Copy this file and customize behavior as needed.</p>
        </div>
      </ha-card>
    `;
  }
}

customElements.define("mk24-placeholder-card", Mk24PlaceholderCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "mk24-placeholder-card",
  name: "MK24 Placeholder Card",
  description: "Starter placeholder card for future features."
});
