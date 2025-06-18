import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  BaseURIUpdated as BaseURIUpdatedEvent,
  Minted as MintedEvent,
  NFTCreatorMigrated as NFTCreatorMigratedEvent,
  NFTMarketUpdated as NFTMarketUpdatedEvent,
  NFTMetadataUpdated as NFTMetadataUpdatedEvent,
  NFTOwnerMigrated as NFTOwnerMigratedEvent,
  PaymentAddressMigrated as PaymentAddressMigratedEvent,
  ProxyCallContractUpdated as ProxyCallContractUpdatedEvent,
  TokenCreatorPaymentAddressSet as TokenCreatorPaymentAddressSetEvent,
  TokenCreatorUpdated as TokenCreatorUpdatedEvent,
  TokenIPFSPathUpdated as TokenIPFSPathUpdatedEvent,
  Transfer as TransferEvent,
} from '../generated/FNDNFT721/FNDNFT721';
import {
  Approval,
  ApprovalForAll,
  BaseURIUpdated,
  Minted,
  NFTCreatorMigrated,
  NFTMarketUpdated,
  NFTMetadataUpdated,
  NFTOwnerMigrated,
  PaymentAddressMigrated,
  ProxyCallContractUpdated,
  TokenCreatorPaymentAddressSet,
  TokenCreatorUpdated,
  TokenIPFSPathUpdated,
  Transfer,
} from '../generated/schema';

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleBaseURIUpdated(event: BaseURIUpdatedEvent): void {
  let entity = new BaseURIUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.baseURI = event.params.baseURI;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMinted(event: MintedEvent): void {
  let entity = new Minted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.creator = event.params.creator;
  entity.tokenId = event.params.tokenId;
  entity.indexedTokenIPFSPath = event.params.indexedTokenIPFSPath;
  entity.tokenIPFSPath = event.params.tokenIPFSPath;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNFTCreatorMigrated(event: NFTCreatorMigratedEvent): void {
  let entity = new NFTCreatorMigrated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.originalAddress = event.params.originalAddress;
  entity.newAddress = event.params.newAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNFTMarketUpdated(event: NFTMarketUpdatedEvent): void {
  let entity = new NFTMarketUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.nftMarket = event.params.nftMarket;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNFTMetadataUpdated(event: NFTMetadataUpdatedEvent): void {
  let entity = new NFTMetadataUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.name = event.params.name;
  entity.symbol = event.params.symbol;
  entity.baseURI = event.params.baseURI;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNFTOwnerMigrated(event: NFTOwnerMigratedEvent): void {
  let entity = new NFTOwnerMigrated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.originalAddress = event.params.originalAddress;
  entity.newAddress = event.params.newAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaymentAddressMigrated(
  event: PaymentAddressMigratedEvent
): void {
  let entity = new PaymentAddressMigrated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.originalAddress = event.params.originalAddress;
  entity.newAddress = event.params.newAddress;
  entity.originalPaymentAddress = event.params.originalPaymentAddress;
  entity.newPaymentAddress = event.params.newPaymentAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleProxyCallContractUpdated(
  event: ProxyCallContractUpdatedEvent
): void {
  let entity = new ProxyCallContractUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.proxyCallContract = event.params.proxyCallContract;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTokenCreatorPaymentAddressSet(
  event: TokenCreatorPaymentAddressSetEvent
): void {
  let entity = new TokenCreatorPaymentAddressSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.fromPaymentAddress = event.params.fromPaymentAddress;
  entity.toPaymentAddress = event.params.toPaymentAddress;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTokenCreatorUpdated(
  event: TokenCreatorUpdatedEvent
): void {
  let entity = new TokenCreatorUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.fromCreator = event.params.fromCreator;
  entity.toCreator = event.params.toCreator;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTokenIPFSPathUpdated(
  event: TokenIPFSPathUpdatedEvent
): void {
  let entity = new TokenIPFSPathUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenId = event.params.tokenId;
  entity.indexedTokenIPFSPath = event.params.indexedTokenIPFSPath;
  entity.tokenIPFSPath = event.params.tokenIPFSPath;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
