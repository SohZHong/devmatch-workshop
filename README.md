# Devmatch The Graph Workshop

## Checkpoint One

### NFT Tracker Subgraph

This subgraph indexes `Mint` and `Transfer` events from Artblock's [ERC-721 contract](https://etherscan.io/address/0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270) deployed on **Ethereum mainnet**. It stores NFT ownership and token data, which can then be queried or enriched using **The Graph Token API**.

#### 🚀 Prerequisites

Make sure you have the following installed:

- Node.js v18+
- `yarn` package manager
- [The Graph CLI](https://thegraph.com/docs/en/developing/quick-start/#installing-the-graph-cli)

```bash
yarn global @graphprotocol/graph-cli
```

#### 1. Initialize the Subgraph

```bash
graph init \
  --from-contract 0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270 \
  --protocol ethereum \
  --network mainnet \
  --index-events \
  nft-tracker-subgraph
```
