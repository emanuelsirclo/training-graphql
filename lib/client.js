import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
export const cache = new InMemoryCache();

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new createHttpLink({
      uri: "https://b2cdemo.getswift.asia/graphql", // Server URL (must be absolute)
      credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
    }),
    cache: cache.restore(initialState),
  });
}