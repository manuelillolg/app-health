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
    appHealthGetAuthenticationInterfaces (
        query: $queryAuthenticationInterfaces
        constraint: $constraintAuthenticationInterfaces
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

export const getRelations = gql`
    query AppHealthGetApplicationAuthenticationsRelations(
        $queryApplications: QueryStatement
        $constraintApplications: QueryStatement
        $queryAuthenticationInterfaces: QueryStatement
        $constraintAuthenticationInterfaces: QueryStatement
        $queryApplicationInfrastuctureServices: QueryStatement
        $constraintApplicationInfrastuctureServices: QueryStatement
    ) {
        ${relationsFields}
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

export const findByIdWithRelationsQuery = gql`
    query AppHealthFindApplicationAuthenticationByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryApplications: QueryStatement
        $constraintApplications: QueryStatement
        $queryAuthenticationInterfaces: QueryStatement
        $constraintAuthenticationInterfaces: QueryStatement
        $queryApplicationInfrastuctureServices: QueryStatement
        $constraintApplicationInfrastuctureServices: QueryStatement
    ) {
        object: appHealthFindApplicationAuthenticationById (
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
