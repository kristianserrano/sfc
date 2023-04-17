import * as SFC_CONFIG from "./sfc-config.js";
import { Utils } from "./utils.js";

export class CoinConfig extends FormApplication {
    constructor() {
        super();
        this.initialMap = Utils.getSetting(SFC_CONFIG.SETTING_KEYS.coinMap);
        this.workingCoinMap = duplicate(this.initialMap);
    }
    
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: 'coin-config',
            title: game.i18n.localize('SFC.CoinConfig.Name'),
            template: SFC_CONFIG.DEFAULT_CONFIG.templates.coinConfig,
            classes: ['setting-config', 'sheet'],
            tabs: [
                {
                    navSelector: '.tabs',
                    contentSelector: '.sheet-body',
                    initial: 'basics',
                },
            ],
            scrollY: ['.sheet-body .tab'],
            width: 600,
            height: 700,
            resizable: false,
            closeOnSubmit: false
        });
    }

    getData() {
        const coinMap = this.workingCoinMap;
        const data = {
            coinMap
        };
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
        const inputs = html.find("input");
        inputs.on("change", event => this.onChangeInputs(event));
        html.find('#reset').click(() => this.restoreDefaults());
        html.find('#submit').click(() => this.close());
        html
            .find('.attributes')
            .on('click', '.attribute-control', (e) => this._onClickAttributeControl(e));
    }

    async _updateObject(event, formData) {
        Utils.setSetting(SFC_CONFIG.SETTING_KEYS.coinMap, this.workingCoinMap);
    }

    async restoreDefaults() {
        const dialog = new Dialog({
            title: game.i18n.localize("SFC.CoinConfig.RestoreDefaultsTitle"),
            content: game.i18n.localize("SFC.CoinConfig.RestoreDefaultsContents"),
            buttons: {
                yes: {
                    icon: `<i class="fa fa-check"></i>`,
                    label: game.i18n.localize("WORDS._Yes"),
                    callback: async event => {
                        const defaultMap = Utils.getSetting(SFC_CONFIG.SETTING_KEYS.defaultCoinMap);
                        this.initialMap = defaultMap;
                        this.workingCoinMap = duplicate(this.initialMap);
                        this.render();
                    }
                },
                no :{
                    icon: `<i class="fa fa-times"></i>`,
                    label: game.i18n.localize("WORDS._No"),
                    callback: event => {}
                }
            },
            default: "no"
        });
        dialog.render(true);
        this.render(true);
    }

    async onChangeInputs(event) {
        const name = event.target.name;
        const row = event.target.name.split("-").pop();
        if (!row) {
            return;
        }

        event.preventDefault();
        
        let coin = this.workingCoinMap[row];

        if (name.startsWith("icon-path")) {
            coin.img = event.target.value;
        } else if (name.startsWith("coin-name")) {
            coin.name = event.target.value;
        } else if (name.startsWith("coin-value")) {
            coin.flags.sfc.value = event.target.value;
        } else if (name.startsWith("coin-weight")) {
            coin.system.weight = event.target.value;
        } else if (name.startsWith("coin-enabled")) {
            coin.flags.sfc.enabled = event.target.checked;
        }

        return this.render();
    }
}