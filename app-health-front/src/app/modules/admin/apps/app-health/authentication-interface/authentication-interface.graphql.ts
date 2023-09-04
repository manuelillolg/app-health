import gql from 'graphql-tag';

export const fields = `
    name
    score
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query AppHealthPaginateAuthenticationInterfaces (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateAuthenticationInterfaces (
            query: $query
            constraint: $constraint
        ) {
            total
            rows
            count
        }
    }
`;

export const getQuery = gql`
    query AppHealthGetAuthenticationInterfaces (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetAuthenticationInterfaces (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindAuthenticationInterfaceById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindAuthenticationInterfaceById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query AppHealthFindAuthenticationInterface (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindAuthenticationInterface (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateAuthenticationInterface (
        $payload: AppHealthCreateAuthenticationInterfaceInput!
    ) {
        appHealthCreateAuthenticationInterface (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateAuthenticationInterfaceById (
        $payload: AppHealthUpdateAuthenticationInterfaceByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateAuthenticationInterfaceById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateAuthenticationInterfaces (
        $payload: AppHealthUpdateAuthenticationInterfacesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateAuthenticationInterfaces (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteAuthenticationInterfaceById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteAuthenticationInterfaceById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteAuthenticationInterfaces (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteAuthenticationInterfaces (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
