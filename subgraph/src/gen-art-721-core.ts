import {
  Transfer as TransferEvent,
  Mint as MintEvent,
} from '../generated/GenArt721Core/GenArt721Core';
import { NFT } from '../generated/schema';

export function handleMint(event: MintEvent): void {
  let entity = new NFT('Artblocks-' + event.params._tokenId.toString());
  entity.owner = event.params._to;
  entity.tokenId = event.params._tokenId;
  entity.contract = event.address;
  entity.protocol = 'ARTBLOCKS';
  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  // Retrieve NFT entity by ID
  let entity = NFT.load('Artblocks-' + event.params.tokenId.toString());

  if (!entity) {
    entity = new NFT('Artblocsk-' + event.params.tokenId.toString());
  }

  entity.owner = event.params.to;
  entity.contract = event.address;
  entity.tokenId = event.params.tokenId;
  entity.protocol = 'ARTBLOCKS';

  entity.save();
}
