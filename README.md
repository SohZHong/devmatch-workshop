# Devmatch The Graph Workshop

> [!NOTE]
> This is the fourth checkpoint for our workshop. If you missed the first three checkpoints, check them out:
>
> 1. [`checkpoint-one` branch README](https://github.com/SohZHong/devmatch-workshop/blob/checkpoint-one/README.md)
> 2. [`checkpoint-two` branch README](https://github.com/SohZHong/devmatch-workshop/blob/checkpoint-two/README.md)
> 3. [`checkpoint-three` branch README](https://github.com/SohZHong/devmatch-workshop/blob/checkpoint-three/README.md)

## Checkpoint 4: Supporting Multiple Marketplaces

Now that we’ve successfully indexed ArtBlocks, we’ll expand our subgraph to support another NFT marketplace, [Foundation](https://foundation.app/).

Foundation uses a **proxy contract pattern**, so we’ll take special care when generating code and updating configurations.

### 1. Understand the Proxy + Implementation Setup

Foundation uses:

- [Proxy Contract](https://etherscan.io/token/0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405): The main entry point that users interact with.
- [Implementation Contract](https://etherscan.io/token/0xe7C29cba93ef8017C7824DD0f25923c38d08065c): The logic contract that contains ABI and bytecode.

Since The Graph uses ABI for codegen, but listens to events from the deployed address, we:

- Generate the subgraph from the implementation contract, but
- Point our `subgraph.yaml` and `networks.json` to the proxy address.

### 2. Generate Code Using the Implementation Address

Use the `graph add` CLI tool with the **implementation contract address** to generate code with the correct ABI:

```bash
graph add 0xe7C29cba93ef8017C7824DD0f25923c38d08065c
```

This step generates/updates:

- `schema.graphql`
- `subgraph.yaml`
- ABIs folder with correct ABI
- `generated/` and `mapping.ts` boilerplate

### 3. Point to the Proxy Address

Update your config files so the subgraph listens to actual on-chain events:

In `subgraph.yaml`:

Replace the `source.address` field under the name "FNDNFT721" with `0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405` (Proxy Contract Address).

```yaml
- kind: ethereum
  name: FNDNFT721
  network: mainnet
  source:
    address: '0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405' # 0xe7C29cba93ef8017C7824DD0f25923c38d08065c to 0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405
    abi: FNDNFT721
    startBlock: 14087953 # To be edited
```

In `networks.json`:

Also replace the `address` field here and add a `startBlock` field, leave it empty for now

```json
  "FNDNFT721": {
    "address": "0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405",
    // Newly added
    "startBlock": "<TO_BE_FILLED>"
  }
```

### 4. Find the Start Block on Etherscan

To reduce indexing time and avoid unnecessary data, we’ll find the earliest block where the proxy emitted events.

1. Go to Etherscan.
2. Click the "Transfers" tab.
3. Scroll down and navigate to the last page (oldest tx).
4. Copy the block number of the first ever transaction (this will be your startBlock).

![Last block example](/readme-images/foundation-start-block.png)

Paste this value into both:

- `subgraph.yaml` -> startBlock: <value>
- `networks.json` -> startBlock: <value>

Your final code snippets should look like this in both files:

- `subgraph.yaml`

```yaml
- kind: ethereum
  name: FNDNFT721
  network: mainnet
  source:
    address: '0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405'
    abi: FNDNFT721
    startBlock: 16158655
```

- `networks.json`

```json
    "FNDNFT721": {
      "address": "0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405",
      "startBlock": 16158655
    }
```

### 5. Updating the Schema and Mappings for Multi-Market Support

To handle NFTs from both ArtBlocks and Foundation in a unified way, we’ll refactor the schema and simplify our mappings. This ensures:

#### 5.1 Edit `schema.graphql`

We’ll keep only the NFT entity and introduce a new enum called `Protocol` to distinguish between marketplaces.

Remove all the unnecessary entities and fields since they will not be used. Your final code should look like this:

```graphql
enum Protocol {
  ARTBLOCKS
  FOUNDATION
}

type NFT @entity {
  id: ID!
  contract: Bytes! # address
  owner: Bytes! # address
  tokenId: BigInt! # uint256
  protocol: Protocol!
}
```

> [!NOTE]
> The protocol enum helps the frontend know which marketplace each NFT belongs to, enabling filtering or grouping.

#### 5.2 Run `graph codegen`

After updating `schema.graphql`, regenerate the TypeScript bindings:

```bash
graph codegen
```

> [!NOTE]
> This command ensures your TypeScript mappings recognize the updated entity fields (like protocol) and enum types.

#### 5.3 Clean up the newly generated `fndnft-721.ts` file under `/src` folder

Delete all auto-generated handlers that you don’t need (e.g. approvals or bid events). Similar to Artblocks, keep only the `handleMint` and `handleTransfer` and slightly update them to also assign the protocol.

Your code should look like this (very similar to Artblock's):

```typescript
import {
  Minted as MintedEvent,
  Transfer as TransferEvent,
} from '../generated/FNDNFT721/FNDNFT721';
import { NFT } from '../generated/schema';

export function handleMinted(event: MintedEvent): void {
  let entity = new NFT('Foundation-' + event.params.tokenId.toString());
  entity.owner = event.params.creator;
  entity.tokenId = event.params.tokenId;
  entity.contract = event.address;
  entity.protocol = 'FOUNDATION';
  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = NFT.load('Foundation-' + event.params.tokenId.toString());

  if (!entity) {
    entity = new NFT('Foundation-' + event.params.tokenId.toString());
  }
  entity.owner = event.params.to;
  entity.tokenId = event.params.tokenId;
  entity.contract = event.address;
  entity.protocol = 'FOUNDATION';

  entity.save();
}
```

> [!NOTE]
> The protocol specific prefix when creating the ID is to prevent collision of similar token ids and promote uniqueness.

#### 5.4 Modify the mappings file (`/src/gen-art-721-core.ts`) for Artblocks:

Modify the `handleMint` and `handleTransfer` functions in mapping.ts to include:

```typescript
entity.protocol = 'ARTBLOCKS';
```

Modify the creation of ids to include the protocol specific prefix, example:

```typescript
let entity = new NFT('Artblocks-' + event.params._tokenId.toString());
```

Your final code should look like this:

```typescript
import {
  Transfer as TransferEvent,
  Mint as MintEvent,
} from '../generated/GenArt721Core/GenArt721Core';
import { NFT } from '../generated/schema';

export function handleMint(event: MintEvent): void {
  let entity = new NFT('Artblocks-' + event.params._tokenId.toString());
  entity.owner = event.params._to;
  entity.tokenId = event.params._tokenId;
  entity.contract = event.address;
  entity.protocol = 'ARTBLOCKS';
  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  // Retrieve NFT entity by ID
  let entity = NFT.load('Artblocks-' + event.params.tokenId.toString());

  if (!entity) {
    entity = new NFT('Artblocsk-' + event.params.tokenId.toString());
  }

  entity.owner = event.params.to;
  entity.contract = event.address;
  entity.tokenId = event.params.tokenId;
  entity.protocol = 'ARTBLOCKS';

  entity.save();
}
```

> [!NOTE]
> Now the same GraphQL query can return NFTs from both sources, and your frontend can easily split them based on the `protocol` enum.

#### 5.5 Clean `subgraph.yaml`

Lastly, we will clean the subgraph yaml by/to:

- Remove handlers for unused events (e.g., Approval, ApprovalForAll)
- Ensure entities: contains only `NFT`
- Add the correct ABI and start block for Foundation
- Your event handlers should only include `Mint` and `Transfer`

Your final `subgraph.yaml` will look like this:

```yaml
specVersion: 1.2.0
indexerHints:
  prune: auto
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum
    name: GenArt721Core
    network: mainnet
    source:
      address: '0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270'
      abi: GenArt721Core
      startBlock: 11437151
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.9
      language: wasm/assemblyscript
      entities:
        - NFT
      abis:
        - name: GenArt721Core
          file: ./abis/GenArt721Core.json
      eventHandlers:
        - event: Mint(indexed address,indexed uint256,indexed uint256)
          handler: handleMint
        - event: Transfer(indexed address,indexed address,indexed uint256)
          handler: handleTransfer
      file: ./src/gen-art-721-core.ts
  # Edited section
  - kind: ethereum
    name: FNDNFT721
    network: mainnet
    source:
      address: '0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405'
      abi: FNDNFT721
      startBlock: 16158655
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.9
      language: wasm/assemblyscript
      # We only call NFT within the mappings file
      entities:
        - NFT
      abis:
        - name: FNDNFT721
          file: ./abis/FNDNFT721.json
      eventHandlers:
        # Leave Minted and Transfer only
        - event: Minted(indexed address,indexed uint256,indexed string,string)
          handler: handleMinted
        - event: Transfer(indexed address,indexed address,indexed uint256)
          handler: handleTransfer
      file: ./src/fndnft-721.ts
```

### 6. Deploy and test the Subgraph

Refer to [`checkpoint-one`](https://github.com/SohZHong/devmatch-workshop/blob/checkpoint-one/README.md) for detailed steps for deployment and testing.

Due to previous authentication, we do not have to reauthenticate and can just run:

```bash
graph build
graph deploy nft-tracker-ethereum
```

You can now test your subgraph with the following query:

- Query contracts from both protocols by not specific where clause

```graphql
{
  nfts(first: 5) {
    id
    contract
    owner
    tokenId
    protocol
  }
}
```

- Query contracts from Artblocks protocol

```graphql
{
  nfts(first: 5, where: { protocol: FOUNDATION }) {
    id
    contract
    owner
    tokenId
  }
}
```

- Query contracts from Foundation protocol

```graphql
{
  nfts(first: 5, where: { protocol: FOUNDATION }) {
    id
    contract
    owner
    tokenId
  }
}
```

Congratulations! You now have a subgraph that queries two protocols at once
