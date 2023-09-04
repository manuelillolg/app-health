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
    query AppHealthPaginateApiInterfaceTypes (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateApiInterfaceTypes (
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
    query AppHealthGetApiInterfaceTypes (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetApiInterfaceTypes (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindApiInterfaceTypeById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindApiInterfaceTypeById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query AppHealthFindApiInterfaceType (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindApiInterfaceType (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateApiInterfaceType (
        $payload: AppHealthCreateApiInterfaceTypeInput!
    ) {
        appHealthCreateApiInterfaceType (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateApiInterfaceTypeById (
        $payload: AppHealthUpdateApiInterfaceTypeByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateApiInterfaceTypeById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateApiInterfaceTypes (
        $payload: AppHealthUpdateApiInterfaceTypesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateApiInterfaceTypes (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteApiInterfaceTypeById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteApiInterfaceTypeById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteApiInterfaceTypes (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteApiInterfaceTypes (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
