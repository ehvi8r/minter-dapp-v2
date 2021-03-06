# Minting DAPP

## Table of Contents

- [RESOURCES](#resources)
- [INSTALLATION](#installation)
- [COMMANDS](#commands)
- [MIGRATION](#notes-for-migrating-from-testing-on-rinkeby-to-production-on-polygon)

## RESOURCES

Video: 

🌟 [EASY Minting dApp | Whitelisting | Entire Process!! Create an Entire NFT Collection (10,000+)](https://youtu.be/cLB7u0KQFIs)

Base art generator code is from [hashlips_art_engine](https://github.com/HashLips/hashlips_art_engine)

Contract uses [NFTPort](https://nftport.xyz)

Join the Discord server for more help from the community: [codeSTACKr Discord](https://discord.gg/A9CnsVzzkZ)

## INSTALLATION

### Backend

- Clone this repo or download the latest release zip file.
- Unzip, if needed, and open the folder in VS Code.
- From the terminal run: 
```
 npm install
```
- Copy your image layers into the `/backend/layers` folder.
- Use the `/backend/src/config.js` file to set up your layers and NFT information.

## COMMANDS

Generate: 
```
$ npm run generate
```
- Generates unique images based on the layers in the `/backend/layers` folder.
- WARNING: This command deletes the `/backend/build` folder if it exists!

Rarity (Hashlips): 
```
$ npm run rarity
```
- Calculates the rarity of NFT properties based on layer files.

Rarity (codeSTACKr): 
```
$ npm run rarity_md
```

- Calculates the rarity of NFT properties based on metadata.

Rarity Rank (codeSTACKr): 
```
$ npm run rarity_rank
```

- Provides ranking details through a user interface after calculating using the codeSTACKr Rarity command.

Update Info: 
```
$ npm run update_info
```

- Allows you to update `namePrefix`, `description`, and/or `baseUri` for metadata after it was already generated.

Create Generic Metadata: 
```
$ npm run create_generic
```

- Creates generic metadata using the settings from the `/backend/src/config.js` file.

Upload Files/Images: 
```
$ npm run upload_files
```

- Uploads all files in the `/backend/build/images` folder.

Upload Metadata: 
```
$ npm run upload_metadata
```

- Uploads all `.json` files in both the `/backend/build/json` folder and, if it exists, the `/backend/build/genericJson` folder as well. 

Deploy Contract: 
```
$ npm run deploy_contract
```

- Deploys a contract to the blockchain using the settings from the `/backend/src/config.js` file.

Get Contract: 
```
$ npm run get_contract
```

- Gets the deployed contract details using the transactions hash from the Deploy Contract command. 

Update Contract:
```
$ npm run update_public_mint_start_date
$ npm run update_presale_mint_start_date
$ npm run update_presale_whitelisted_addresses
$ npm run update_presale_whitelisted_addresses_remove
$ npm run update_royalty_share
$ npm run update_royalty_address
$ npm run update_base_uri
$ npm run update_prereveal_token_uri
```

- Updates specific fields of the contract using the settings from the `/backend/src/config.js` file.
- Available fields to update:
  - `prereveal_token_uri` - This will update the pre-reveal token uri for all NFTs. (Hidden image)
  - `base_uri` - This will update the base uri for all NFTs and reveal all.
  - `public_mint_start_date` - Eg: 2022-02-08T11:30:48+00:00
  - `presale_mint_start_date` - Eg: 2022-02-08T11:30:48+00:00
  - `presale_whitelisted_addresses` - Adds address(es) to the whitelist
  - `presale_whitelisted_addresses_remove` - Removes address(es) from the whitelist
  - `royalties_share` - Updates the royalty share
  - `royalties_address` - Updates the royalty wallet address

Refresh OpenSea: 
```
$ npm run refresh_os --start=1 --end=100
```

- Refreshes the listing for the specified editions on OpenSea.
- Both the `--start` and `--end` flags are required.

## Reference the [video](https://youtu.be/cLB7u0KQFIs) for more details.

### NOTES for migrating from testing on Rinkeby to production on Polygon:

// ***************************************************************************************************
// ** NOTES for migrating from testing on Rinkeby to production on Polygon:                          *
//    1. Change in config.js change 'rinkeby' chain to 'polygon'                                     *
//    2. Change .env for new NFTPort API if Required                                                 *
//    3. Change in config.js change wallet address/owner address/treasury address to production      *
//    4. Change in config.js mint price to 100 (MATIC) and freeze metadata METADATA-UPDATEABLE=false *
//    5. Change ETH price in index.html and home.html (.05 ETH =~100 MATIC)                          *
//    6. Change GrowEditionSize numbers for production                                               *
//    7. Change public mint start date to XX April (and other dates as required)                     *
//    8. Change frontend\js\constants chain to 'polygon'                                             *
//    9. Change app.js PUBLIC MINT 'rinkeby' to 'polygon' and rinkebyscan to polygonscan             *
//    10. Change app.js PRE-SALE MINT 'rinkeby' to 'polygon' and rinkebyscan to polygonscan          *
//    11. See changes in BACCapp.js code for 11. and 12.                                             *
//    12. Add contract address from \backend\contract to frontend\js\constants.js                    *
//    13. Remove testnets. in opensea links in index.html and home.html                              *
// ***************************************************************************************************
