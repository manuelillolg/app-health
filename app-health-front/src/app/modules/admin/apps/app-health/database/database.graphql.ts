import gql from 'graphql-tag';

export const fields = `
    name
    type
    versions
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query AppHealthPaginateDatabases (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateDatabases (
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
    query AppHealthGetDatabases (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetDatabases (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindDatabaseById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindDatabaseById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query AppHealthFindDatabase (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindDatabase (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateDatabase (
        $payload: AppHealthCreateDatabaseInput!
    ) {
        appHealthCreateDatabase (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateDatabaseById (
        $payload: AppHealthUpdateDatabaseByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateDatabaseById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateDatabases (
        $payload: AppHealthUpdateDatabasesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateDatabases (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteDatabaseById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteDatabaseById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteDatabases (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteDatabases (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
