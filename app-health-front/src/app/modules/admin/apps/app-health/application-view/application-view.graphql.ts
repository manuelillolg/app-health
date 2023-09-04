import gql from 'graphql-tag';

export const fields = `
    applicationId
    totalViews
    complexity
    description
    score
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query AppHealthPaginateApplicationViews (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateApplicationViews (
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
    query AppHealthGetApplicationViews (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetApplicationViews (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindApplicationViewById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationViewById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query AppHealthFindApplicationView (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationView (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateApplicationView (
        $payload: AppHealthCreateApplicationViewInput!
    ) {
        appHealthCreateApplicationView (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateApplicationViewById (
        $payload: AppHealthUpdateApplicationViewByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationViewById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateApplicationViews (
        $payload: AppHealthUpdateApplicationViewsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationViews (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteApplicationViewById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationViewById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteApplicationViews (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationViews (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
