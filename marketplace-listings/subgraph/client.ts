import { GraphQLClient } from 'graphql-request';

const SUBGRAPH_URL =
  'https://api.studio.thegraph.com/query/90479/nft-tracker/version/latest';

const graphClient = new GraphQLClient(SUBGRAPH_URL);

export default graphClient;
