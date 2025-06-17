import { gql } from 'graphql-request';
import graphClient from '../client';
import { NFT } from '../types';

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

interface NFTSearchResults {
  nfts: NFT[];
}

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
