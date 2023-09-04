import gql from 'graphql-tag';

export const fields = `
    applicationId
    databaseId
    version
    size
    score
    totalCollectionsTables
    totalFields
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
    appHealthGetDatabases (
        query: $queryDatabases
        constraint: $constraintDatabases
    ) {
        id
        name
        type
        versions
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
    query AppHealthPaginateApplicationDatabases (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateApplicationDatabases (
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
    query AppHealthGetApplicationDatabases (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetApplicationDatabases (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query AppHealthGetApplicationDatabasesRelations(
        $queryApplications: QueryStatement
        $constraintApplications: QueryStatement
        $queryDatabases: QueryStatement
        $constraintDatabases: QueryStatement
        $queryApplicationInfrastuctureServices: QueryStatement
        $constraintApplicationInfrastuctureServices: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindApplicationDatabaseById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationDatabaseById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query AppHealthFindApplicationDatabaseByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryApplications: QueryStatement
        $constraintApplications: QueryStatement
        $queryDatabases: QueryStatement
        $constraintDatabases: QueryStatement
        $queryApplicationInfrastuctureServices: QueryStatement
        $constraintApplicationInfrastuctureServices: QueryStatement
    ) {
        object: appHealthFindApplicationDatabaseById (
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
    query AppHealthFindApplicationDatabase (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationDatabase (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateApplicationDatabase (
        $payload: AppHealthCreateApplicationDatabaseInput!
    ) {
        appHealthCreateApplicationDatabase (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateApplicationDatabaseById (
        $payload: AppHealthUpdateApplicationDatabaseByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationDatabaseById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateApplicationDatabases (
        $payload: AppHealthUpdateApplicationDatabasesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationDatabases (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteApplicationDatabaseById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationDatabaseById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteApplicationDatabases (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationDatabases (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
