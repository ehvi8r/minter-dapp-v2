// ** Notes for Polygon Production:
//    1. Change 'rinkeby' to 'polygon'
//    2. Change wallet address/owner address/treasury address
//    3. Change contract, remove rinkeby contract line 98 and uncomment line 97
//    4. Change GrowEditionSize numbers for production
//    5. Change public mint start date to XX April 

require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "THE BORED APE CANNABIS CLUB";
const description = "The Bored Ape Cannabis Club NFT Collection /n Flying High with Bored Apes";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [

  {
    // Code generated Apes from layers
    // For testing just use small numbers and 18 Genesis
    // For Polygon/Opensea.io Mainnet set to 9980 (+20 Genesis) = 10K for additional $$ (Max for NFTPro Free Tier = 5000 + an additional 500 from Johannes (ref: email 11 Mar 22)).
      growEditionSizeTo: 5,
      layersOrder: [
        { name: "Backgrounds" },
        { name: "Apes" },
        { name: "Tops" },
        { name: "Glasses" },
        { name: "Smokes" },
        { name: "Logos" },
      ],
    },
 
    {
    // Hand made Genesis Apes
    // There are only 18 Genesis Apes, and each is set to #1 so hopefully this works to generate one of each.
    // Note: add 18 to the growEdition # above, should be 5500 for polygon/Opensea.io Mainnet
       growEditionSizeTo: 20,
       layersOrder: [
      { name: "Genesis" },
      { name: "HandMade" },
    ],
    },
];

const shuffleLayerConfigurations = true;  // This will keep the Genesis collection separate from the rest of the collection

const debugLogs = false;

const format = {
  width: 600,
  height: 600,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://priceless-morse-1afff4.netlify.app/", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'rinkeby'; // only 'rinkeby' for testing or 'polygon' for production

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'THE BORED APE CANNABIS CLUB';
const CONTRACT_SYMBOL = 'BACC';
const CONTRACT_TYPE = 'erc721';
const METADATA_UPDATABLE = true; // set to true for testing
// const METADATA_UPDATABLE = false; // set to false if you don't want to allow metadata updates after minting, true if you're doing a reveal
const OWNER_ADDRESS = '0x91932159EeB1F5653c9c60C62B530A4d421e09F8';  // Contract Owner and Treasury Owner (keep the sqme)
const TREASURY_ADDRESS = '0x91932159EeB1F5653c9c60C62B530A4d421e09F8';  // This is where buyer funds will go, and will be stored in the contract until collected by the owner
const MAX_SUPPLY = 10000; // The maximum number of NFTs that can be minted. ** CANNOT BE UPDATED! **
// **************************************************************************************************************
// ****** Be careful with this on Polygon price is in MATIC and cannot be updated once contract is created ******.
// **************************************************************************************************************
const MINT_PRICE = 0.001; // Minting price per NFT. Rinkeby = ETH (set to .001 for testing), Polygon = MATIC. ** CANNOT BE UPDATED! **  Check MATIC prices on www.coionmarketcap.com
const TOKENS_PER_MINT = 10; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.

// Dates:
//         Whitelist:   11 Apr 2022  (Whitelist is not a date set in the code)
//         Presale:     16 Apr 2022
//         Public Sale: 20 Apr 2022
//
// ** For TESTING set the Dates to:
//         Whitelist:   1 April 2022  (Whitelist is not a date set in the code)
//         Presale:     1 April 2022
//         Public Sale: 2 April 2022
//
// Change the following line then: $ npm run update_public_mint_start_date ((Catch Error: NOK Contract is Frozen, need to create another contract))
const PUBLIC_MINT_START_DATE = "2022-04-05T13:00:45+00:00";
// const PUBLIC_MINT_START_DATE = "2022-04-03T13:00:45+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00 (+00:00 is UTC Time, EST is currently UTC - 4, we are at UTC -6 right now)
//                                 2022-04-03T13:00:45-06:00 would be my current local time (UTC -6)
//                                 April 03 2022 at 07:00 am local time Merida
 
// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-04-03T13:00:45+00:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00
//                                April 01 2022 at 07:00 am local time

const ROYALTY_SHARE = 1000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0x91932159EeB1F5653c9c60C62B530A4d421e09F8"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = [""]; // only update if you want to manually set the whitelisted addresses
//                              April 09 2022 at 10:00 am local time Launch date whitelisting available right away

// ** OPTIONAL **
// let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it, not necessary
// Contract Address from \backend\build\contract
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // This is the RINKEBY contract for testing, remove for production

// Removed Generic as I will not be doing a reveal, and if left in it causes an error when uploading Metadata (looking for Generic Metadata in _ipfsMetasGeneric and the file is not there).
// Generic Metadata is optional if you want to reveal your NFTs, I will NOT be doing a reveal
//    const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
//    const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
//    const GENERIC_DESCRIPTION = "REPLACE THIS"; // Replace with what you want the generic descriptions to say.
//    const GENERIC_IMAGE = "https://ipfs.io/ipfs/Qm..."; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK" && contractData.error === null) {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

// Will not be deploying yet on Solana (Solanart or Magic Eden), maybe later
const solanaMetadata = {
  symbol: "BACC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://priceless-morse-1afff4.netlify.app/",
  creators: [
    {
      address: "0x91932159EeB1F5653c9c60C62B530A4d421e09F8",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  //  Removed Generic as I will not be doing a reveal, and if left in it causes an error when uploading Metadata (looking for Generic Metadata and the file is not there)
  //  GENERIC,
  //  GENERIC_TITLE,
  //  GENERIC_DESCRIPTION,
  //  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  CONTRACT_TYPE,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
