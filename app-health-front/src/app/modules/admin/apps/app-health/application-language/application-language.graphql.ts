import gql from 'graphql-tag';

export const fields = `
    applicationId
    languageId
    version
    score
    codeQualityScore
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
    appHealthGetLanguages (
        query: $queryLanguages
        constraint: $constraintLanguages
    ) {
        id
        name
        versions
    }
`;

// default methods
export const paginationQuery = gql`
    query AppHealthPaginateApplicationLanguages (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: appHealthPaginateApplicationLanguages (
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
    query AppHealthGetApplicationLanguages (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: appHealthGetApplicationLanguages (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query AppHealthGetApplicationLanguagesRelations(
        $queryApplications: QueryStatement
        $constraintApplications: QueryStatement
        $queryLanguages: QueryStatement
        $constraintLanguages: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query AppHealthFindApplicationLanguageById (
        $id: ID
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationLanguageById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query AppHealthFindApplicationLanguageByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryApplications: QueryStatement
        $constraintApplications: QueryStatement
        $queryLanguages: QueryStatement
        $constraintLanguages: QueryStatement
    ) {
        object: appHealthFindApplicationLanguageById (
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
    query AppHealthFindApplicationLanguage (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: appHealthFindApplicationLanguage (
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation AppHealthCreateApplicationLanguage (
        $payload: AppHealthCreateApplicationLanguageInput!
    ) {
        appHealthCreateApplicationLanguage (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const updateByIdMutation = gql`
    mutation AppHealthUpdateApplicationLanguageById (
        $payload: AppHealthUpdateApplicationLanguageByIdInput!
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationLanguageById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation AppHealthUpdateApplicationLanguages (
        $payload: AppHealthUpdateApplicationLanguagesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthUpdateApplicationLanguages (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation AppHealthDeleteApplicationLanguageById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationLanguageById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation AppHealthDeleteApplicationLanguages (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        appHealthDeleteApplicationLanguages (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
