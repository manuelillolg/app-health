import gql from 'graphql-tag';

export const fields = `
    name
    description
    sourceApplicationId
    targetApplicationId
    apiInterfaceTypeId
    interfaceNumbers
    modality
    score
    documentations
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query AppHealthPaginateApplicationIntegrations (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateApplicationIntegrations (
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
    query AppHealthGetApplicationIntegrations (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetApplicationIntegrations (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindApplicationIntegrationById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationIntegrationById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query AppHealthFindApplicationIntegration (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationIntegration (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateApplicationIntegration (
        $payload: AppHealthCreateApplicationIntegrationInput!
    ) {
        appHealthCreateApplicationIntegration (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateApplicationIntegrationById (
        $payload: AppHealthUpdateApplicationIntegrationByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationIntegrationById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateApplicationIntegrations (
        $payload: AppHealthUpdateApplicationIntegrationsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationIntegrations (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteApplicationIntegrationById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationIntegrationById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteApplicationIntegrations (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationIntegrations (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
