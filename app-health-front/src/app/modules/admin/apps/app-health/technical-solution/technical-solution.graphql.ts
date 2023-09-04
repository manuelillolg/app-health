import gql from 'graphql-tag';

export const fields = `
    customerId
    name
    description
    architectureDiagram
    proposal
    createdAt
    updatedAt
`;

export const relationsFields = `
    appHealthGetCustomers (
        query: $queryCustomers
        constraint: $constraintCustomers
    ) {
        id
        name
    }
`;

// default methods
export const paginationQuery = gql`
    query AppHealthPaginateTechnicalSolutions (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateTechnicalSolutions (
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
    query AppHealthGetTechnicalSolutions (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetTechnicalSolutions (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query AppHealthGetTechnicalSolutionsRelations(
        $queryCustomers: QueryStatement
        $constraintCustomers: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindTechnicalSolutionById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindTechnicalSolutionById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query AppHealthFindTechnicalSolutionByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryCustomers: QueryStatement
        $constraintCustomers: QueryStatement
    ) {
        object: appHealthFindTechnicalSolutionById (
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
    query AppHealthFindTechnicalSolution (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindTechnicalSolution (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateTechnicalSolution (
        $payload: AppHealthCreateTechnicalSolutionInput!
    ) {
        appHealthCreateTechnicalSolution (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateTechnicalSolutionById (
        $payload: AppHealthUpdateTechnicalSolutionByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateTechnicalSolutionById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateTechnicalSolutions (
        $payload: AppHealthUpdateTechnicalSolutionsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateTechnicalSolutions (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteTechnicalSolutionById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteTechnicalSolutionById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteTechnicalSolutions (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteTechnicalSolutions (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
