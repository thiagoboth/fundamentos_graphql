import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_USER } from "../../App";
import { client } from "../../lib/apollo";

const CREATE_USER = gql`
    mutation ($id: String!, $name: String!){
        createUser(id: $id, name: $name) {
            id
            name
        }
    }
`

export function NewUserForm() {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [createUser, { data, loading, error }] = useMutation(CREATE_USER)

    async function handleCreateUser(event: FormEvent) {
        event.preventDefault();

        if(!name) {
            return;
        }

        await createUser({
            variables: {
                id,
                name,
            },
            // abaixo, mudo o cache do client, adicionando o retorno da requisição sem precisar chamar a query;
            update: (cache, { data: { createUser } }) => {
                const { users } = client.readQuery({ query: GET_USER })

                cache.writeQuery({
                    query: GET_USER,
                    data: {
                        users: {
                            ...users,
                            createUser
                        }
                    }
                })
            },
            // abaixo, rechamo a query passada entre [] ao fazer essa requisição;
            //refetchQueries:[GET_USER]
        })

        console.log('data mutation: ', data)
    }

    return (
        <form onSubmit={handleCreateUser}>
            <input type="text" value={id} onChange={e => setId(e.target.value)} />
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <button type="submit">Enviar</button>
        </form>
    )
}