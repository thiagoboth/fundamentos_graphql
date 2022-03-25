import { Field, ID, ObjectType } from "type-graphql";

//isso é uma notação
@ObjectType()
export class User {
    // essa notação serve pra dizer que esse é literalmente o ID, e é úinico
    @Field(_type => ID)
    id: string;

    @Field()
    name: string;
}