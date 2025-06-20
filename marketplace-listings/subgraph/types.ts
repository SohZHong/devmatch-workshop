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
