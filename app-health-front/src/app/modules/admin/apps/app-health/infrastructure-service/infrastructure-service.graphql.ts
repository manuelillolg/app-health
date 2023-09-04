import gql from 'graphql-tag';

export const fields = `
    providerId
    name
    score
    createdAt
    updatedAt
`;

export const relationsFields = `
    appHealthGetInfrastructureProviders (
        query: $queryInfrastructureProviders
        constraint: $constraintInfrastructureProviders
    ) {
        id
        name
        score
    }
`;

// default methods
export const paginationQuery = gql`
    query AppHealthPaginateInfrastructureServices (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateInfrastructureServices (
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
    query AppHealthGetInfrastructureServices (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetInfrastructureServices (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query AppHealthGetInfrastructureServicesRelations(
        $queryInfrastructureProviders: QueryStatement
        $constraintInfrastructureProviders: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindInfrastructureServiceById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindInfrastructureServiceById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query AppHealthFindInfrastructureServiceByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryInfrastructureProviders: QueryStatement
        $constraintInfrastructureProviders: QueryStatement
    ) {
        object: appHealthFindInfrastructureServiceById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
        ${relationsFields}
    }
`;

export const findQuery = gql`
    query AppHealthFindInfrastructureService (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindInfrastructureService (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateInfrastructureService (
        $payload: AppHealthCreateInfrastructureServiceInput!
    ) {
        appHealthCreateInfrastructureService (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateInfrastructureServiceById (
        $payload: AppHealthUpdateInfrastructureServiceByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateInfrastructureServiceById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateInfrastructureServices (
        $payload: AppHealthUpdateInfrastructureServicesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateInfrastructureServices (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteInfrastructureServiceById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteInfrastructureServiceById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteInfrastructureServices (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteInfrastructureServices (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
