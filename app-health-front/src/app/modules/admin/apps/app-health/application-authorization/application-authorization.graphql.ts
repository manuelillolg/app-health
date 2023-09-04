import gql from 'graphql-tag';

export const fields = `
    applicationId
    authorizationInterfaceId
    totalUsers
    score
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
    appHealthGetAuthorizationInterfaces (
        query: $queryAuthorizationInterfaces
        constraint: $constraintAuthorizationInterfaces
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
    query AppHealthPaginateApplicationAuthorizations (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateApplicationAuthorizations (
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
    query AppHealthGetApplicationAuthorizations (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetApplicationAuthorizations (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query AppHealthGetApplicationAuthorizationsRelations(
        $queryApplications: QueryStatement
        $constraintApplications: QueryStatement
        $queryAuthorizationInterfaces: QueryStatement
        $constraintAuthorizationInterfaces: QueryStatement
        $queryApplicationInfrastuctureServices: QueryStatement
        $constraintApplicationInfrastuctureServices: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindApplicationAuthorizationById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationAuthorizationById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query AppHealthFindApplicationAuthorizationByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryApplications: QueryStatement
        $constraintApplications: QueryStatement
        $queryAuthorizationInterfaces: QueryStatement
        $constraintAuthorizationInterfaces: QueryStatement
        $queryApplicationInfrastuctureServices: QueryStatement
        $constraintApplicationInfrastuctureServices: QueryStatement
    ) {
        object: appHealthFindApplicationAuthorizationById (
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
    query AppHealthFindApplicationAuthorization (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationAuthorization (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateApplicationAuthorization (
        $payload: AppHealthCreateApplicationAuthorizationInput!
    ) {
        appHealthCreateApplicationAuthorization (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateApplicationAuthorizationById (
        $payload: AppHealthUpdateApplicationAuthorizationByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationAuthorizationById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateApplicationAuthorizations (
        $payload: AppHealthUpdateApplicationAuthorizationsInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationAuthorizations (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteApplicationAuthorizationById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationAuthorizationById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteApplicationAuthorizations (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationAuthorizations (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
