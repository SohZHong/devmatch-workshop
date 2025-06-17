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
