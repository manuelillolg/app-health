import gql from 'graphql-tag';

export const fields = `
    applicationId
    authenticationInterfaceId
    totalUsers
    score
    applicationInfrastructureServiceId
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query AppHealthPaginateApplicationAuthentications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateApplicationAuthentications (
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
    query AppHealthGetApplicationAuthentications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetApplicationAuthentications (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindApplicationAuthenticationById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationAuthenticationById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query AppHealthFindApplicationAuthentication (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationAuthentication (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateApplicationAuthentication (
        $payload: AppHealthCreateApplicationAuthenticationInput!
    ) {
        appHealthCreateApplicationAuthentication (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateApplicationAuthenticationById (
        $payload: AppHealthUpdateApplicationAuthenticationByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationAuthenticationById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateApplicationAuthentications (
        $payload: AppHealthUpdateApplicationAuthenticationsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationAuthentications (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteApplicationAuthenticationById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationAuthenticationById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteApplicationAuthentications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationAuthentications (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
