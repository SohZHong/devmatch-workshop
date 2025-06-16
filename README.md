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
  --network mainnet \
  --index-events \
  nft-tracker-subgraph
```

**What Each Flag Means**
| Flag | Meaning |

---

| `--from-contract` | Tells The Graph CLI to auto-fetch the contract ABI and scaffold the subgraph around it. Saves you time. |
| `--network` | Specifies which Ethereum network to use. Must match the chain the contract is on.
| `--index-events` | Automatically detects all events from the ABI and creates stubs in `subgraph.yaml` and `mapping.ts`. You’ll edit these later. |
| `nft-tracker-subgraph` | Your local folder name AND the internal project name for the CLI. |

Then, press `Enter` on subsequent inputs to use default values. Your CLI should look like this:
[Subgraph Initialization](/readme-images/subgraph-initialization.png)

Then:

```bash
cd nft-tracker-subgraph
```
