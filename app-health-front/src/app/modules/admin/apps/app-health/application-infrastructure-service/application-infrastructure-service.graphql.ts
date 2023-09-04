import gql from 'graphql-tag';

export const fields = `
    applicationId
    infrastructureServiceId
    averageCostPerYear
    score
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query AppHealthPaginateApplicationInfrastuctureServices (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateApplicationInfrastuctureServices (
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
    query AppHealthGetApplicationInfrastuctureServices (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetApplicationInfrastuctureServices (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindApplicationInfrastructureServiceById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationInfrastructureServiceById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query AppHealthFindApplicationInfrastructureService (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationInfrastructureService (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateApplicationInfrastructureService (
        $payload: AppHealthCreateApplicationInfrastructureServiceInput!
    ) {
        appHealthCreateApplicationInfrastructureService (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateApplicationInfrastructureServiceById (
        $payload: AppHealthUpdateApplicationInfrastructureServiceByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationInfrastructureServiceById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateApplicationInfrastuctureServices (
        $payload: AppHealthUpdateApplicationInfrastuctureServicesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationInfrastuctureServices (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteApplicationInfrastructureServiceById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationInfrastructureServiceById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteApplicationInfrastuctureServices (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationInfrastuctureServices (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
