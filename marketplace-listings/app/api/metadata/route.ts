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
