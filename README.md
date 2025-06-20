# Devmatch The Graph Workshop

> [!NOTE]
> This is the fifth and final checkpoint for our workshop. If you missed the first four checkpoints, check them out:
>
> 1. [`checkpoint-one` branch README](https://github.com/SohZHong/devmatch-workshop/blob/checkpoint-one/README.md)
> 2. [`checkpoint-two` branch README](https://github.com/SohZHong/devmatch-workshop/blob/checkpoint-two/README.md)
> 3. [`checkpoint-three` branch README](https://github.com/SohZHong/devmatch-workshop/blob/checkpoint-three/README.md)
> 4. [`checkpoint-four` branch README](https://github.com/SohZHong/devmatch-workshop/blob/checkpoint-four/README.md)

## Checkpoint 5: Display NFTs by Protocol

Now that we’ve successfully indexed Foundation protocol with our subgraph, we want the frontend to be adjusted to show one or the other.

### 1. Reflect GraphQL Schema

If we look back at our `schema.graphql`, we can now see we have new entries and fields:

```graphql
# New enumerable
enum Protocol {
  ARTBLOCKS
  FOUNDATION
}

type NFT @entity {
  id: ID!
  contract: Bytes! # address
  owner: Bytes! # address
  tokenId: BigInt! # uint256
  protocol: Protocol! # New entry that points to the enum
}
```

Therefore, we have to reflect these changes in our `/subgraph/types.ts` to be aligned with the subgraph schema. we’ll manually define the `Protocol` enum and `NFT` interface in our `types.ts`.

```typescript
export enum Protocol {
  Artblocks = 'ARTBLOCKS',
  Foundation = 'FOUNDATION',
}

export interface NFT {
  id: string;
  tokenId: number;
  owner: string;
  contract: string;
  protocol: Protocol;
}
```

#### Why are we adding this?

Even though the enum and entity already exist in schema.graphql, TypeScript doesn’t automatically know about it.

So we manually define the same structure in `types.ts` to:

- Improve type safety when querying or rendering data
- Enable auto-complete and linting during development
- Prevent bugs from accidental typos (e.g., "artblocks" vs "ARTBLOCKS")

> [!NOTE]
> The enum must match exactly what the subgraph schema outputs (ARTBLOCKS, FOUNDATION).
> You can add more enum values later if you index additional marketplaces.

We’ll also add an export for this file in our `/subgraph/index.ts` so the `Protocol` enum can be reused across the project.

```typescript
export * from './types';
```

Once this is added, you can safely use the `protocol` field in your frontend code like this:

```typescript
import { Protocol } from '@/subgraph';

if (nft.protocol === Protocol.Foundation) {
  // Do something specific to Foundation NFTs
}
```

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

### 3. Create a Query Function for NFTs by Protocol

Now that we have defined our `Protocol` enum and schema, let’s create a reusable function that allows us to query NFTs by protocol.

#### 3.1 Create `getNFTbyProtocol.ts`

In the ``subgraph/queries` folder, create a new file `getNFTbyProtocol.ts`.

Paste the following code inside:

```typescript
import { gql } from 'graphql-request';
import graphClient from '../client';
import { NFT, Protocol } from '../types';

const GET_NFTS_BY_PROTOCOL_QUERY = gql`
  query GetNFTByProtocol($first: Int!, $skip: Int!, $protocol: Protocol!) {
    nfts(first: $first, skip: $skip, where: { protocol: $protocol }) {
      id
      tokenId
      owner
      contract
    }
  }
`;

interface NFTSearchResults {
  nfts: NFT[];
}

export async function getNFTByProtocol(
  first: number = 10,
  skip: number = 0,
  protocol: Protocol
): Promise<NFT[]> {
  const data: NFTSearchResults = await graphClient.request(
    GET_NFTS_BY_PROTOCOL_QUERY,
    {
      first,
      skip,
      protocol,
    }
  );
  return data.nfts;
}
```

- This function allows us to retrieve NFTs from a specific protocol (e.g., ARTBLOCKS, FOUNDATION)
- The GraphQL query uses the `Protocol!` type for queries to ensure compatibility with the schema enum we defined in `schema.graphql`

#### 3.2 Export the Function

Open your the `index.ts` file in your `subgraph` folder, add the following code:

```typescript
export * from './queries/getNFTByProtocol';
```

This allows you to import `getNFTByProtocol` easily in `page.tsx` or other files.

### 4. Update `page.tsx` to Use Protocol-Based Query

In this step, we’ll replace our old generic `getNFTs` call with the new `getNFTByProtocol` function.

This lets us fetch NFTs from a specific protocol like ARTBLOCKS or FOUNDATION.

Open your `app/page.tsx` and replace the following line:

```tsx
// const nfts = await getNFTs(5); // Old version
const nfts = await getNFTByProtocol(10, 0, Protocol.Foundation); // New version
```

> [!NOTE]
> Now your frontend is directly linked to the `protocol` enum, just change `Protocol.Foundation` to `Protocol.Artblocks` to switch.

#### Potential Errors on Image Rendering

> [!WARNING]
> Some NFTs (e.g. from Foundation) may include image URLs using the `ipfs://` format, which can’t be rendered directly by `<Image />` in Next.js.

This may result in an error like this:
![Image IPFS Error](/readme-images/ipfs-image-error.png)

This is expected because upon a simple `console.log` inside the codebase we find the `image` field to have this response:

![Image Link Response](/readme-images/ipfs-image-link.png)

Therefore, we can detect if the image link starts with ipfs:// and convert it to a usable HTTP link (`https://ipfs.io/ipfs/`).

We replace:

```tsx
<Image
  width={100}
  height={100}
  src={nft.metadata.image}
  alt={nft.metadata.name || 'NFT ' + nft.id}
  className='w-48 h-48 object-cover mt-2'
/>
```

With:

```tsx
<Image
  width={100}
  height={100}
  src={
    nft.metadata.image.startsWith('ipfs://')
      ? nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
      : nft.metadata.image
  }
  alt={nft.metadata.name || 'NFT ' + nft.id}
  className='w-48 h-48 object-cover mt-2'
/>
```

Last but not least, remember to add the configuration below into the `next.config.ts` file to allow `ipfs.io`:

```typescript
{
  protocol: 'https',
  hostname: 'ipfs.io',
  port: '',
},
```

### 5. Run the App

Save everything and run the app:

```bash
yarn dev
```

Visit http://localhost:3000 in your browser. You should now see a list of NFTs from Foundation. You can always change

```typescript
Protocol.Foundation;
```

to:

```typescript
Protocol.Artblocks;
```

to view NFTs from Artblock.
