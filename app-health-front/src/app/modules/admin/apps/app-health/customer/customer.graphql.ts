import gql from 'graphql-tag';

export const fields = `
    name
    createdAt
    updatedAt
`;

export const relationsFields = `
`;

// default methods
export const paginationQuery = gql`
    query AppHealthPaginateCustomers (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateCustomers (
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
    query AppHealthGetCustomers (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetCustomers (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindCustomerById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindCustomerById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findQuery = gql`
    query AppHealthFindCustomer (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindCustomer (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateCustomer (
        $payload: AppHealthCreateCustomerInput!
    ) {
        appHealthCreateCustomer (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateCustomerById (
        $payload: AppHealthUpdateCustomerByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateCustomerById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateCustomers (
        $payload: AppHealthUpdateCustomersInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateCustomers (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteCustomerById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteCustomerById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteCustomers (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteCustomers (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
