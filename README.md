# Devmatch The Graph Workshop

> [!NOTE]
> This is the third checkpoint for our workshop. If you missed the first two checkpoints, check the [`checkpoint-one` branch README](https://github.com/SohZHong/devmatch-workshop/blob/checkpoint-one/README.md) or the [`checkpoint-two` branch README](https://github.com/SohZHong/devmatch-workshop/blob/checkpoint-two/README.md)

## Checkpoint 3: Enrich Subgraph NFTs with Token API

This step walks you through fetching the metadata (e.g. name, image, attribute) for each NFT from your subgraph using the Token API.

### Folder Structure

For this checkpoint, our folder structure will look like this:

```
nft-subgraph-frontend/
├── .env                              # Contains your GRAPH_TOKEN_API_KEY
├── app/
│   ├── api/
│   │   └── metadata/route.ts         # API route to fetch NFT metadata from Token API
│   └── page.tsx                      # Main page: fetch NFTs and metadata client-side
├── subgraph/
│   ├── client.ts                     # GraphQL client
│   ├── index.ts                      # Central export
│   ├── types.ts                      # NFT interface
│   └── queries/
│       └── getNFTs.ts                # Subgraph query
```

### 1. Get an API Token

Go to [The Graph Market](https://thegraph.market/dashboard) and log in with your preferred method.

Click on "Create New Key" under API Keys to generate an API token.
![API key creation](/readme-images/token-api-key.png)

Save it to your `.env` file:

```env
GRAPH_TOKEN_API_KEY=<your_api_key_here>
```

> [!IMPORTANT]
> This secret is not exposed to the client. Only the `/api/metadata` route will use it.

### 2. Token API Call Logic

Inside `app/api/metadata/route.ts`, we will store our server-side API handler that proxies Token API requests.

```typescript
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = process.env.GRAPH_TOKEN_API_KEY;
  const searchParams = req.nextUrl.searchParams;
  const contract = searchParams.get('contract');
  const tokenId = searchParams.get('tokenId');

  if (!apiKey) {
    return new Response('Missing api key', { status: 400 });
  }

  if (!contract || !tokenId) {
    return new Response('Missing params', { status: 400 });
  }

  const url = `https://token-api.thegraph.com/nft/items/evm/contract/${contract}/token_id/${tokenId}?network_id=mainnet`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!res.ok) {
      return new Response(`Token API Error: ${res.statusText}`, {
        status: 500,
      });
    }

    const json = await res.json();
    return Response.json(json);
  } catch (err) {
    return new Response('Fetch error', { status: 500 });
  }
}
```

### 3. Create the `fetchMetadata` Client Helper

At the top of your `app/page.tsx`, define this helper function. It calls your API route that fetches metadata securely via The Graph’s Token API:

```tsx
const fetchMetadata = async (contract: string, tokenId: string) => {
  const res = await fetch(
    `api/metadata?contract=${contract}&tokenId=${tokenId}`
  );

  if (!res.ok) return null;
  return res.json();
};
```

We want to keep our secret API key secure (on the server), so instead of calling the external Token API directly in the frontend, we route requests through our own `/api/metadata` API handler.

### 4. Display NFT + Metadata

Now, update the default exported page component to:

1. Fetch NFT data from your subgraph
2. For each NFT, fetch its metadata using the helper
3. Render the full result (including name and image, if available)

```tsx
// app/page.tsx (continued)
export default async function Home() {
  const nfts = await getNFTs(5);

  // Fetch data from the route we just created
  const enrichedNFTs = await Promise.all(
    nfts.map(async (nft) => {
      const meta = await fetchMetadata(nft.contract, String(nft.tokenId));
      // The endpoint returns a "data" array so we have to access it with 0 index
      return { ...nft, metadata: meta.data[0] };
    })
  );

  return (
    <main className='p-8'>
      <h1 className='text-xl font-bold mb-4'>NFTs with Metadata</h1>
      <ul className='space-y-6'>
        {enrichedNFTs.map((nft) => (
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
            {nft.metadata?.name && (
              <p>
                <strong>Name:</strong> {nft.metadata.name}
              </p>
            )}
            {/* We render the images of NFTs that have them */}
            {nft.metadata?.image && (
              <Image
                width={100}
                height={100}
                src={nft.metadata.image}
                alt={nft.metadata.name || 'NFT ' + nft.id}
                className='w-48 h-48 object-cover mt-2'
              />
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
```

### 5. Run the App

Now that we’ve added metadata and are displaying NFT images from The Graph Token API, it’s time to run the app:

```bash
yarn dev
```

However, when the NFT's are loaded, you may encounter the following error in the browser:
![NextJS Image Error](/readme-images/nextjs-config-image-error.png)

This happens becase Next.js uses image optimization and restricts image domains by default for performance/security reasons.

### 6. Fix Image Host Whitelisting in next.config.ts

To resolve the error, we need to explicitly allow the image domain used by the NFT metadata (e.g., ArtBlocks):

1. Open your `next.config.ts` file at the root.
2. Add the following configuration:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media-proxy.artblocks.io', // Change or add others according to the hostname specified in the error
        port: '',
      },
    ],
  },
};

export default nextConfig;
```

> [!IMPORTANT]
> If you’re indexing NFTs from multiple sources, you may need to add more `remotePatterns` entries for different domains.

### 7. Restart the Dev Server

After editing `next.config.ts`, you must restart your development server:

```bash
yarn dev
```

The images should now load properly!
