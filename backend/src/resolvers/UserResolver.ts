import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/user";

import crypto from 'crypto';

@Resolver()
export class UserResolver {
    private data: User[] = [];

    // quando queremos retornar uma lista de informações, necessário colocar o [] por volta da classe, pois essa notação não é .TS; 
    @Query(() => [User])
    async users() {
        return this.data
    }

    @Mutation(() => User)
    async createUser(
        @Arg('id') id: string,
        @Arg('name') name: string,
    ) {
        const user = { id, name }

        this.data.push(user)

        return user;
    }
}