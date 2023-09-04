import gql from 'graphql-tag';

export const fields = `
    applicationId
    apiInterfaceTypeId
    score
    documentations
    requestsPerDay
    applicationInfrastructureServiceId
    createdAt
    updatedAt
`;

export const relationsFields = `
    appHealthGetApplications (
        query: $queryApplications
        constraint: $constraintApplications
    ) {
        id
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
    }
    appHealthGetApiInterfaceTypes (
        query: $queryApiInterfaceTypes
        constraint: $constraintApiInterfaceTypes
    ) {
        id
        name
        score
    }
    appHealthGetApplicationInfrastuctureServices (
        query: $queryApplicationInfrastuctureServices
        constraint: $constraintApplicationInfrastuctureServices
    ) {
        id
        averageCostPerYear
        score
    }
`;

// default methods
export const paginationQuery = gql`
    query AppHealthPaginateApplicationApis (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateApplicationApis (
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
    query AppHealthGetApplicationApis (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetApplicationApis (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query AppHealthGetApplicationApisRelations(
        $queryApplications: QueryStatement
        $constraintApplications: QueryStatement
        $queryApiInterfaceTypes: QueryStatement
        $constraintApiInterfaceTypes: QueryStatement
        $queryApplicationInfrastuctureServices: QueryStatement
        $constraintApplicationInfrastuctureServices: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindApplicationApiById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationApiById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query AppHealthFindApplicationApiByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryApplications: QueryStatement
        $constraintApplications: QueryStatement
        $queryApiInterfaceTypes: QueryStatement
        $constraintApiInterfaceTypes: QueryStatement
        $queryApplicationInfrastuctureServices: QueryStatement
        $constraintApplicationInfrastuctureServices: QueryStatement
    ) {
        object: appHealthFindApplicationApiById (
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
    query AppHealthFindApplicationApi (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationApi (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateApplicationApi (
        $payload: AppHealthCreateApplicationApiInput!
    ) {
        appHealthCreateApplicationApi (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateApplicationApiById (
        $payload: AppHealthUpdateApplicationApiByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationApiById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateApplicationApis (
        $payload: AppHealthUpdateApplicationApisInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationApis (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteApplicationApiById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationApiById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteApplicationApis (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationApis (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
