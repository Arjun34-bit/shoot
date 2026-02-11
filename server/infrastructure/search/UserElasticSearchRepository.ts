// import type { UserSearchRepository } from "../../domain/interface/UserSearchRepositories.ts";
// import type { QueryOutput } from "../../types/QueryTypes.ts";
// import { USER_INDEX } from "./elastic-indexes/user.index.ts";
// import { esClient } from "./ElasticSearchClient.ts";

// export class ElasticUserSearchRepository implements UserSearchRepository {
//     async searchByName(query: string): Promise<QueryOutput[]> {
//         const result = await esClient.search({
//             index: USER_INDEX,
//             query: {
//                 fuzzy: { email: {           // For typos
//                     value: query,
//                     fuzziness:"AUTO"
//                 } },
//             },
//         });

//         return result.hits.hits.map(hit => {
//             const source = hit._source as any;

//             return {
//                 id: hit._id!,
//                 name: source.name,
//                 email: source.email
//             };
//         });
//     }

//     async indexUser(user: { id: string, email: string }): Promise<void> {
//         await esClient.index({
//             index: USER_INDEX,
//             document: user
//         })
//     }
// }
