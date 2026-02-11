import type { QueryServices } from "../../presentation/QueryInterface.ts";
import type { SearchUser } from "../use-cases/query/SearchUser.ts";

export class QueryServiceImpl implements QueryServices {
    private searchUser: SearchUser;

    constructor(searchUser: SearchUser){
        this.searchUser = searchUser
    }

    async searchByName(data: any){
        return this.searchUser.execute(data)
    }
}