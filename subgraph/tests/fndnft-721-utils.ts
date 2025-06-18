import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
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
  Transfer
} from "../generated/FNDNFT721/FNDNFT721"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createBaseURIUpdatedEvent(baseURI: string): BaseURIUpdated {
  let baseUriUpdatedEvent = changetype<BaseURIUpdated>(newMockEvent())

  baseUriUpdatedEvent.parameters = new Array()

  baseUriUpdatedEvent.parameters.push(
    new ethereum.EventParam("baseURI", ethereum.Value.fromString(baseURI))
  )

  return baseUriUpdatedEvent
}

export function createMintedEvent(
  creator: Address,
  tokenId: BigInt,
  indexedTokenIPFSPath: string,
  tokenIPFSPath: string
): Minted {
  let mintedEvent = changetype<Minted>(newMockEvent())

  mintedEvent.parameters = new Array()

  mintedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  mintedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  mintedEvent.parameters.push(
    new ethereum.EventParam(
      "indexedTokenIPFSPath",
      ethereum.Value.fromString(indexedTokenIPFSPath)
    )
  )
  mintedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenIPFSPath",
      ethereum.Value.fromString(tokenIPFSPath)
    )
  )

  return mintedEvent
}

export function createNFTCreatorMigratedEvent(
  tokenId: BigInt,
  originalAddress: Address,
  newAddress: Address
): NFTCreatorMigrated {
  let nftCreatorMigratedEvent = changetype<NFTCreatorMigrated>(newMockEvent())

  nftCreatorMigratedEvent.parameters = new Array()

  nftCreatorMigratedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftCreatorMigratedEvent.parameters.push(
    new ethereum.EventParam(
      "originalAddress",
      ethereum.Value.fromAddress(originalAddress)
    )
  )
  nftCreatorMigratedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return nftCreatorMigratedEvent
}

export function createNFTMarketUpdatedEvent(
  nftMarket: Address
): NFTMarketUpdated {
  let nftMarketUpdatedEvent = changetype<NFTMarketUpdated>(newMockEvent())

  nftMarketUpdatedEvent.parameters = new Array()

  nftMarketUpdatedEvent.parameters.push(
    new ethereum.EventParam("nftMarket", ethereum.Value.fromAddress(nftMarket))
  )

  return nftMarketUpdatedEvent
}

export function createNFTMetadataUpdatedEvent(
  name: string,
  symbol: string,
  baseURI: string
): NFTMetadataUpdated {
  let nftMetadataUpdatedEvent = changetype<NFTMetadataUpdated>(newMockEvent())

  nftMetadataUpdatedEvent.parameters = new Array()

  nftMetadataUpdatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  nftMetadataUpdatedEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )
  nftMetadataUpdatedEvent.parameters.push(
    new ethereum.EventParam("baseURI", ethereum.Value.fromString(baseURI))
  )

  return nftMetadataUpdatedEvent
}

export function createNFTOwnerMigratedEvent(
  tokenId: BigInt,
  originalAddress: Address,
  newAddress: Address
): NFTOwnerMigrated {
  let nftOwnerMigratedEvent = changetype<NFTOwnerMigrated>(newMockEvent())

  nftOwnerMigratedEvent.parameters = new Array()

  nftOwnerMigratedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  nftOwnerMigratedEvent.parameters.push(
    new ethereum.EventParam(
      "originalAddress",
      ethereum.Value.fromAddress(originalAddress)
    )
  )
  nftOwnerMigratedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )

  return nftOwnerMigratedEvent
}

export function createPaymentAddressMigratedEvent(
  tokenId: BigInt,
  originalAddress: Address,
  newAddress: Address,
  originalPaymentAddress: Address,
  newPaymentAddress: Address
): PaymentAddressMigrated {
  let paymentAddressMigratedEvent =
    changetype<PaymentAddressMigrated>(newMockEvent())

  paymentAddressMigratedEvent.parameters = new Array()

  paymentAddressMigratedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  paymentAddressMigratedEvent.parameters.push(
    new ethereum.EventParam(
      "originalAddress",
      ethereum.Value.fromAddress(originalAddress)
    )
  )
  paymentAddressMigratedEvent.parameters.push(
    new ethereum.EventParam(
      "newAddress",
      ethereum.Value.fromAddress(newAddress)
    )
  )
  paymentAddressMigratedEvent.parameters.push(
    new ethereum.EventParam(
      "originalPaymentAddress",
      ethereum.Value.fromAddress(originalPaymentAddress)
    )
  )
  paymentAddressMigratedEvent.parameters.push(
    new ethereum.EventParam(
      "newPaymentAddress",
      ethereum.Value.fromAddress(newPaymentAddress)
    )
  )

  return paymentAddressMigratedEvent
}

export function createProxyCallContractUpdatedEvent(
  proxyCallContract: Address
): ProxyCallContractUpdated {
  let proxyCallContractUpdatedEvent =
    changetype<ProxyCallContractUpdated>(newMockEvent())

  proxyCallContractUpdatedEvent.parameters = new Array()

  proxyCallContractUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "proxyCallContract",
      ethereum.Value.fromAddress(proxyCallContract)
    )
  )

  return proxyCallContractUpdatedEvent
}

export function createTokenCreatorPaymentAddressSetEvent(
  fromPaymentAddress: Address,
  toPaymentAddress: Address,
  tokenId: BigInt
): TokenCreatorPaymentAddressSet {
  let tokenCreatorPaymentAddressSetEvent =
    changetype<TokenCreatorPaymentAddressSet>(newMockEvent())

  tokenCreatorPaymentAddressSetEvent.parameters = new Array()

  tokenCreatorPaymentAddressSetEvent.parameters.push(
    new ethereum.EventParam(
      "fromPaymentAddress",
      ethereum.Value.fromAddress(fromPaymentAddress)
    )
  )
  tokenCreatorPaymentAddressSetEvent.parameters.push(
    new ethereum.EventParam(
      "toPaymentAddress",
      ethereum.Value.fromAddress(toPaymentAddress)
    )
  )
  tokenCreatorPaymentAddressSetEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return tokenCreatorPaymentAddressSetEvent
}

export function createTokenCreatorUpdatedEvent(
  fromCreator: Address,
  toCreator: Address,
  tokenId: BigInt
): TokenCreatorUpdated {
  let tokenCreatorUpdatedEvent = changetype<TokenCreatorUpdated>(newMockEvent())

  tokenCreatorUpdatedEvent.parameters = new Array()

  tokenCreatorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "fromCreator",
      ethereum.Value.fromAddress(fromCreator)
    )
  )
  tokenCreatorUpdatedEvent.parameters.push(
    new ethereum.EventParam("toCreator", ethereum.Value.fromAddress(toCreator))
  )
  tokenCreatorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return tokenCreatorUpdatedEvent
}

export function createTokenIPFSPathUpdatedEvent(
  tokenId: BigInt,
  indexedTokenIPFSPath: string,
  tokenIPFSPath: string
): TokenIPFSPathUpdated {
  let tokenIpfsPathUpdatedEvent =
    changetype<TokenIPFSPathUpdated>(newMockEvent())

  tokenIpfsPathUpdatedEvent.parameters = new Array()

  tokenIpfsPathUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  tokenIpfsPathUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "indexedTokenIPFSPath",
      ethereum.Value.fromString(indexedTokenIPFSPath)
    )
  )
  tokenIpfsPathUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenIPFSPath",
      ethereum.Value.fromString(tokenIPFSPath)
    )
  )

  return tokenIpfsPathUpdatedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
