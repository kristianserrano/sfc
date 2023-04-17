export const NAME = "sfc";

export const TITLE = "SWADE Fantasy Currencies";

export const PATH = "modules/sfc";


export const DEFAULT_CONFIG = {
    templates: {
        coinsDisplay: `${PATH}/templates/coins-display.hbs`,
        coinConfig: `${PATH}/templates/coin-config.hbs`,
        initActorsButton: `${PATH}/templates/init-actors-button.hbs`,
        initActorsDialog: `${PATH}/templates/init-actors-dialog.hbs`,
    },
    coins: {
        icons: {
            copper: "icons/commodities/currency/coins-wheat-stack-copper.webp",
            silver: "icons/commodities/currency/coins-shield-sword-stack-silver.webp",
            gold: "icons/commodities/currency/coins-crown-stack-gold.webp",
            plat: "icons/commodities/currency/coins-assorted-mix-platinum.webp"
        },
        names: {
            copper: "Copper coins",
            silver: "Silver coins",
            gold: "Gold coins",
            plat: "Platinum coins"
        },
        values: {
            copper: 0.01,
            silver: 0.1,
            gold: 1,
            plat: 10
        },
        weight: 0.02
    }
}

export const FLAGS = {
    copperCount: "copperCount",
    silverCount: "silverCount",
    goldCount: "goldCount",
    platCount: "platCount",
}

export const SETTING_KEYS = {
    coinMap: "coinMap",
    defaultCoinMap: "defaultCoinMap",
}
