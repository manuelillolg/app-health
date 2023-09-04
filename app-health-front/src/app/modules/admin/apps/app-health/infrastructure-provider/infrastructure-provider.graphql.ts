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
    query AppHealthPaginateInfrastructureProviders (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateInfrastructureProviders (
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
    query AppHealthGetInfrastructureProviders (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetInfrastructureProviders (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindInfrastructureProviderById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindInfrastructureProviderById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query AppHealthFindInfrastructureProvider (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindInfrastructureProvider (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateInfrastructureProvider (
        $payload: AppHealthCreateInfrastructureProviderInput!
    ) {
        appHealthCreateInfrastructureProvider (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateInfrastructureProviderById (
        $payload: AppHealthUpdateInfrastructureProviderByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateInfrastructureProviderById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateInfrastructureProviders (
        $payload: AppHealthUpdateInfrastructureProvidersInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateInfrastructureProviders (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteInfrastructureProviderById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteInfrastructureProviderById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteInfrastructureProviders (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteInfrastructureProviders (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
