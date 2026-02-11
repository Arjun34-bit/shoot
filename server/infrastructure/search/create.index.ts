// import { USER_INDEX, userIndexBody } from "./elastic-indexes/user.index.ts";
// import { esClient } from "./ElasticSearchClient.ts";

// export async function ensureUserIndex() {
//   const exists = await esClient.indices.exists({
//     index: USER_INDEX,
//   });

//   if (!exists) {
//     await esClient.indices.create({
//       index: USER_INDEX,
//       body: userIndexBody,
//     });

//     console.log("Elasticsearch user index created");
//   }
// }
