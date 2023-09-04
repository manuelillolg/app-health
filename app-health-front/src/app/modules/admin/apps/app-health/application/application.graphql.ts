import gql from 'graphql-tag';

export const fields = `
    technicalSolutionId
    name
    description
    businessImpact
    type
    releaseDate
    architectureDiagram
    hasTenants
    hasLicensing
    costLicensesPerYear
    requestsPerDay
    createdAt
    updatedAt
`;

export const relationsFields = `
    appHealthGetTechnicalSolutions (
        query: $queryTechnicalSolutions
        constraint: $constraintTechnicalSolutions
    ) {
        id
        name
        description
        architectureDiagram
        proposal
    }
`;

// default methods
export const paginationQuery = gql`
    query AppHealthPaginateApplications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateApplications (
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
    query AppHealthGetApplications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetApplications (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query AppHealthGetApplicationsRelations(
        $queryTechnicalSolutions: QueryStatement
        $constraintTechnicalSolutions: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindApplicationById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query AppHealthFindApplicationByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryTechnicalSolutions: QueryStatement
        $constraintTechnicalSolutions: QueryStatement
    ) {
        object: appHealthFindApplicationById (
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
    query AppHealthFindApplication (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplication (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateApplication (
        $payload: AppHealthCreateApplicationInput!
    ) {
        appHealthCreateApplication (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateApplicationById (
        $payload: AppHealthUpdateApplicationByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateApplications (
        $payload: AppHealthUpdateApplicationsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplications (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteApplicationById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteApplications (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplications (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
