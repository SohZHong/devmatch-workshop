import { getNFTs } from '@/subgraph';
import Image from 'next/image';

const fetchMetadata = async (contract: string, tokenId: string) => {
  const res = await fetch(
    `http://localhost:3000/api/metadata?contract=${contract}&tokenId=${tokenId}`
  );

  if (!res.ok) return null;
  return res.json();
};

export default async function Home() {
  const nfts = await getNFTs(5);

  const enrichedNFTs = await Promise.all(
    nfts.map(async (nft) => {
      const meta = await fetchMetadata(nft.contract, String(nft.tokenId));
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
