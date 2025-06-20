import { gql } from 'graphql-request';
import graphClient from '../client';
import { NFT, Protocol } from '../types';

const GET_NFTS_BY_PROTOCOL_QUERY = gql`
  query GetNFTByProtocol($first: Int!, $skip: Int!, protocol: Protocol!) {
    nfts(first: $first, skip: $skip, where: {protocol: $protocol}) {
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

export async function GetNFTByProtocol(
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
