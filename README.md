# Devmatch The Graph Workshop

> [!NOTE]
> This is the second checkpoint for our workshop. If you missed the first checkpoint, [check the `checkpoint-one` branch README](https://github.com/SohZHong/devmatch-workshop/blob/checkpoint-one/README.md)

## Checkpoint 2: Calling Subgraph From Next.js (Frontend)

This step walks you through setting up a Next.js app, installing dependencies, organizing subgraph query code, and rendering NFT responses from your subgraph using a simple page.

### 1. Create a New Next.js App

In the root folder, input the following command:

```bash
npx create-next-app@latest nft-subgraph-frontend --typescript
```

Choose:

- App Router: Yes
- Tailwind CSS: Yes
- TypeScript: Yes

### 2. Install Required Packages

```bash
yarn add graphql-request graphql
```

> `graphql-request`: lightweight GraphQL client
> `graphql`: required peer dependency

### 3. Project Folder Structure (inside Next.js folder)

Create a `subgraph` folder to organize query logic.

```
nft-subgraph-frontend/
├── app/
│   └── page.tsx         # Main page calling subgraph
├── subgraph/
│   ├── client.ts        # GraphQL client
│   ├── index.ts         # Central export
│   ├── types.ts         # NFT interface
│   └── queries/
│       └── getNFTs.ts   # Subgraph query
```

### 4. Create GraphQL Client

Inside `nft-subgraph-frontend/subgraph/client.ts`:

```typescript
import { GraphQLClient } from 'graphql-request';

const SUBGRAPH_URL = '<YOUR SUBGRAPH URL>';

// Initialize a GraphQL client pointing to your subgraph endpoint
const graphClient = new GraphQLClient(SUBGRAPH_URL);

export default graphClient;
```

You can find your Subgraph URL in the studio here:
![Endpoint URL](/readme-images/subgraph-endpoint-url.png)

### 5. Create Type Definition

Inside `nft-subgraph-frontend/subgraph/types.ts`:

```typescript
// Defines the shape of NFT data returned by the subgraph
export interface NFT {
  id: string;
  tokenId: number;
  owner: string;
  contract: string;
}
```

This interface helps enforce type safety in your query and component logic.

### 6. NFT Query Logic

Inside `nft-subgraph-frontend/subgraph/queries/getNFTs.ts`:

```typescript
import { gql } from 'graphql-request';
import graphClient from '../client';
import { NFT } from '../types';

// GraphQL query to fetch a list of NFT entities
const GET_NFTS_QUERY = gql`
  query GetNFTs($first: Int!, $skip: Int!) {
    nfts(first: $first, skip: $skip) {
      id
      tokenId
      owner
      contract
    }
  }
`;

// Interface for expected response from query
interface NFTSearchResults {
  nfts: NFT[];
}

// Function to execute the query and return an array of NFTs
export async function getNFTs(
  first: number = 10,
  skip: number = 0
): Promise<NFT[]> {
  const data: NFTSearchResults = await graphClient.request(GET_NFTS_QUERY, {
    first,
    skip,
  });
  return data.nfts;
}
```

This function lets you reuse `getNFTs()` anywhere in your frontend to fetch NFTs indexed by your subgraph.

### 7. Export All Functions with Helper

Inside `nft-subgraph-frontend/subgraph/index.ts`:

```typescript
export * from './queries/getNFTs';
```

Instead of importing each query manually, you can now do:

```typescript
import { getNFTs } from '@/subgraph';
```

### 8. Render NFTs on Frontend

Inside `nft-subgraph-frontend/app/page.tsx`:

```tsx
import { getNFTs } from '@/subgraph';

export default async function Home() {
  const nfts = await getNFTs(10); // Fetch first 10 NFTs

  return (
    <main className='p-8'>
      <h1 className='text-xl font-bold mb-4'>NFT List</h1>
      <ul className='space-y-2'>
        {nfts.map((nft) => (
          <li key={nft.id}>
            <p>
              <strong>ID:</strong> {nft.id}
            </p>
            <p>
              <strong>Token ID:</strong> {nft.tokenId}
            </p>
            <p>
              <strong>Owner:</strong> {nft.owner}
            </p>
            <p>
              <strong>Contract:</strong> {nft.contract}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

This is a simple SSR page that fetches and renders NFT data using the subgraph.

### 9. Run the App

```bash
yarn dev
```

Visit http://localhost:3000 in your browser. You should now see a list of NFTs pulled directly from your subgraph.
