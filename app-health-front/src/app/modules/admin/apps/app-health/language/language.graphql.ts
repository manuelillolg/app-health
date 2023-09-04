import gql from 'graphql-tag';

export const fields = `
    name
    versions
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query AppHealthPaginateLanguages (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateLanguages (
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
    query AppHealthGetLanguages (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetLanguages (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindLanguageById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindLanguageById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query AppHealthFindLanguage (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindLanguage (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateLanguage (
        $payload: AppHealthCreateLanguageInput!
    ) {
        appHealthCreateLanguage (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateLanguageById (
        $payload: AppHealthUpdateLanguageByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateLanguageById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateLanguages (
        $payload: AppHealthUpdateLanguagesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateLanguages (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteLanguageById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteLanguageById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteLanguages (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteLanguages (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
