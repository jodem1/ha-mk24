type HassEntity = {
  state: string;
  attributes?: Record<string, unknown>;
};

type HomeAssistant = {
  states: Record<string, HassEntity>;
};

type LovelaceCardConfig = {
  type: string;
  title?: string;
  entity?: string;
};

class Mk24HelloCard extends HTMLElement {
  private _hass?: HomeAssistant;
  private _config?: LovelaceCardConfig;

  setConfig(config: LovelaceCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = config;
    this.render();
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this.render();
  }

  getCardSize(): number {
    return 2;
  }

  private render(): void {
    if (!this._config) {
      return;
    }

    const title = this._config.title || "MK24 Hello Card";
    const entityId = this._config.entity;
    const stateText =
      entityId && this._hass?.states[entityId]
        ? this._hass.states[entityId].state
        : "No entity selected";

    this.innerHTML = `
      <ha-card header="${title}">
        <div class="card-content">
          <p>Card is loaded correctly.</p>
          <p><strong>State:</strong> ${stateText}</p>
        </div>
      </ha-card>
    `;
  }
}

customElements.define("mk24-hello-card", Mk24HelloCard);

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "mk24-hello-card",
  name: "MK24 Hello Card",
  description: "Simple test card to validate custom card setup."
});
