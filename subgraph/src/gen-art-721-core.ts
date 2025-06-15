import {
  Transfer as TransferEvent,
  Mint as MintEvent,
} from '../generated/GenArt721Core/GenArt721Core';
import { NFT } from '../generated/schema';

export function handleMint(event: MintEvent): void {
  let entity = new NFT(event.params._tokenId.toString());
  entity.owner = event.params._to;
  entity.tokenId = event.params._tokenId;
  entity.contract = event.address;
  entity.save();
}
export function handleTransfer(event: TransferEvent): void {
  // Retrieve NFT entity by ID
  let entity = NFT.load(event.params.tokenId.toString());

  if (!entity) {
    entity = new NFT(event.params.tokenId.toString());
  }

  entity.owner = event.params.to;
  entity.contract = event.address;
  entity.tokenId = event.params.tokenId;

  entity.save();
}
