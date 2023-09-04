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
    query AppHealthPaginateAuthorizationInterfaces (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateAuthorizationInterfaces (
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
    query AppHealthGetAuthorizationInterfaces (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetAuthorizationInterfaces (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindAuthorizationInterfaceById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindAuthorizationInterfaceById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query AppHealthFindAuthorizationInterface (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindAuthorizationInterface (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateAuthorizationInterface (
        $payload: AppHealthCreateAuthorizationInterfaceInput!
    ) {
        appHealthCreateAuthorizationInterface (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateAuthorizationInterfaceById (
        $payload: AppHealthUpdateAuthorizationInterfaceByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateAuthorizationInterfaceById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateAuthorizationInterfaces (
        $payload: AppHealthUpdateAuthorizationInterfacesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateAuthorizationInterfaces (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteAuthorizationInterfaceById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteAuthorizationInterfaceById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteAuthorizationInterfaces (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteAuthorizationInterfaces (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
