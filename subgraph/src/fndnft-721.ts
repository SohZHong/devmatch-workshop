import {
  Minted as MintedEvent,
  Transfer as TransferEvent,
} from '../generated/FNDNFT721/FNDNFT721';
import { NFT } from '../generated/schema';

export function handleMinted(event: MintedEvent): void {
  let entity = new NFT('Foundation-' + event.params.tokenId.toString());
  entity.owner = event.params.creator;
  entity.tokenId = event.params.tokenId;
  entity.contract = event.address;
  entity.protocol = 'Foundation';
  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = NFT.load('Foundation-' + event.params.tokenId.toString());

  if (!entity) {
    entity = new NFT('Foundation-' + event.params.tokenId.toString());
  }
  entity.owner = event.params.to;
  entity.tokenId = event.params.tokenId;
  entity.contract = event.address;
  entity.protocol = 'Foundation';

  entity.save();
}
