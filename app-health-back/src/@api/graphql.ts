
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum AppHealthApplicationIntegrationModality {
    UNIDIRECTIONAL = "UNIDIRECTIONAL",
    BIDIRECTIONAL = "BIDIRECTIONAL"
}

export enum AppHealthApplicationType {
    FRONTEND = "FRONTEND",
    SERVER = "SERVER",
    MOBILE = "MOBILE",
    EMBEDDED = "EMBEDDED"
}

export enum AppHealthDatabaseType {
    RELATIONAL = "RELATIONAL",
    NO_SQL = "NO_SQL",
    KEY_VALUE = "KEY_VALUE",
    GRAPH = "GRAPH"
}

export enum CoreLangDir {
    LTR = "LTR",
    RTL = "RTL"
}

export enum CoreSearchKeyLang {
    id = "id",
    iso6392 = "iso6392",
    iso6393 = "iso6393",
    ietf = "ietf"
}

export interface AppHealthCreateApiInterfaceTypeInput {
    id: string;
    name: GraphQLString;
    score: GraphQLInt;
}

export interface AppHealthUpdateApiInterfaceTypeByIdInput {
    id: string;
    name?: Nullable<GraphQLString>;
    score?: Nullable<GraphQLInt>;
}

export interface AppHealthUpdateApiInterfaceTypesInput {
    id?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    score?: Nullable<GraphQLInt>;
}

export interface AppHealthCreateApplicationApiInput {
    id: string;
    applicationId: string;
    apiInterfaceTypeId: string;
    score: GraphQLInt;
    documentations?: Nullable<JSON>;
    requestsPerDay?: Nullable<GraphQLInt>;
    applicationInfrastructureServiceId: string;
}

export interface AppHealthUpdateApplicationApiByIdInput {
    id: string;
    applicationId?: Nullable<string>;
    apiInterfaceTypeId?: Nullable<string>;
    score?: Nullable<GraphQLInt>;
    documentations?: Nullable<JSON>;
    requestsPerDay?: Nullable<GraphQLInt>;
    applicationInfrastructureServiceId?: Nullable<string>;
}

export interface AppHealthUpdateApplicationApisInput {
    id?: Nullable<string>;
    applicationId?: Nullable<string>;
    apiInterfaceTypeId?: Nullable<string>;
    score?: Nullable<GraphQLInt>;
    documentations?: Nullable<JSON>;
    requestsPerDay?: Nullable<GraphQLInt>;
    applicationInfrastructureServiceId?: Nullable<string>;
}

export interface AppHealthCreateApplicationAuthenticationInput {
    id: string;
    applicationId: string;
    authenticationInterfaceId: string;
    totalUsers?: Nullable<GraphQLInt>;
    score: GraphQLInt;
    applicationInfrastructureServiceId: string;
}

export interface AppHealthUpdateApplicationAuthenticationByIdInput {
    id: string;
    applicationId?: Nullable<string>;
    authenticationInterfaceId?: Nullable<string>;
    totalUsers?: Nullable<GraphQLInt>;
    score?: Nullable<GraphQLInt>;
    applicationInfrastructureServiceId?: Nullable<string>;
}

export interface AppHealthUpdateApplicationAuthenticationsInput {
    id?: Nullable<string>;
    applicationId?: Nullable<string>;
    authenticationInterfaceId?: Nullable<string>;
    totalUsers?: Nullable<GraphQLInt>;
    score?: Nullable<GraphQLInt>;
    applicationInfrastructureServiceId?: Nullable<string>;
}

export interface AppHealthCreateApplicationAuthorizationInput {
    id: string;
    applicationId: string;
    authorizationInterfaceId: string;
    totalUsers?: Nullable<GraphQLInt>;
    score: GraphQLInt;
    applicationInfrastructureServiceId: string;
}

export interface AppHealthUpdateApplicationAuthorizationByIdInput {
    id: string;
    applicationId?: Nullable<string>;
    authorizationInterfaceId?: Nullable<string>;
    totalUsers?: Nullable<GraphQLInt>;
    score?: Nullable<GraphQLInt>;
    applicationInfrastructureServiceId?: Nullable<string>;
}

export interface AppHealthUpdateApplicationAuthorizationsInput {
    id?: Nullable<string>;
    applicationId?: Nullable<string>;
    authorizationInterfaceId?: Nullable<string>;
    totalUsers?: Nullable<GraphQLInt>;
    score?: Nullable<GraphQLInt>;
    applicationInfrastructureServiceId?: Nullable<string>;
}

export interface AppHealthCreateApplicationDatabaseInput {
    id: string;
    applicationId: string;
    databaseId: string;
    version: GraphQLString;
    size?: Nullable<GraphQLInt>;
    score: GraphQLInt;
    totalCollectionsTables?: Nullable<GraphQLInt>;
    totalFields?: Nullable<GraphQLInt>;
    applicationInfrastructureServiceId: string;
}

export interface AppHealthUpdateApplicationDatabaseByIdInput {
    id: string;
    applicationId?: Nullable<string>;
    databaseId?: Nullable<string>;
    version?: Nullable<GraphQLString>;
    size?: Nullable<GraphQLInt>;
    score?: Nullable<GraphQLInt>;
    totalCollectionsTables?: Nullable<GraphQLInt>;
    totalFields?: Nullable<GraphQLInt>;
    applicationInfrastructureServiceId?: Nullable<string>;
}

export interface AppHealthUpdateApplicationDatabasesInput {
    id?: Nullable<string>;
    applicationId?: Nullable<string>;
    databaseId?: Nullable<string>;
    version?: Nullable<GraphQLString>;
    size?: Nullable<GraphQLInt>;
    score?: Nullable<GraphQLInt>;
    totalCollectionsTables?: Nullable<GraphQLInt>;
    totalFields?: Nullable<GraphQLInt>;
    applicationInfrastructureServiceId?: Nullable<string>;
}

export interface AppHealthCreateApplicationInfrastructureServiceInput {
    id: string;
    applicationId: string;
    infrastructureServiceId: string;
    averageCostPerYear?: Nullable<GraphQLInt>;
    score: GraphQLInt;
}

export interface AppHealthUpdateApplicationInfrastructureServiceByIdInput {
    id: string;
    applicationId?: Nullable<string>;
    infrastructureServiceId?: Nullable<string>;
    averageCostPerYear?: Nullable<GraphQLInt>;
    score?: Nullable<GraphQLInt>;
}

export interface AppHealthUpdateApplicationInfrastuctureServicesInput {
    id?: Nullable<string>;
    applicationId?: Nullable<string>;
    infrastructureServiceId?: Nullable<string>;
    averageCostPerYear?: Nullable<GraphQLInt>;
    score?: Nullable<GraphQLInt>;
}

export interface AppHealthCreateApplicationIntegrationInput {
    id: string;
    name: GraphQLString;
    description?: Nullable<GraphQLString>;
    sourceApplicationId: string;
    targetApplicationId?: Nullable<string>;
    apiInterfaceTypeId: string;
    interfaceNumbers?: Nullable<GraphQLInt>;
    modality: AppHealthApplicationIntegrationModality;
    score: GraphQLInt;
    documentations?: Nullable<JSON>;
}

export interface AppHealthUpdateApplicationIntegrationByIdInput {
    id: string;
    name?: Nullable<GraphQLString>;
    description?: Nullable<GraphQLString>;
    sourceApplicationId?: Nullable<string>;
    targetApplicationId?: Nullable<string>;
    apiInterfaceTypeId?: Nullable<string>;
    interfaceNumbers?: Nullable<GraphQLInt>;
    modality?: Nullable<AppHealthApplicationIntegrationModality>;
    score?: Nullable<GraphQLInt>;
    documentations?: Nullable<JSON>;
}

export interface AppHealthUpdateApplicationIntegrationsInput {
    id?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    description?: Nullable<GraphQLString>;
    sourceApplicationId?: Nullable<string>;
    targetApplicationId?: Nullable<string>;
    apiInterfaceTypeId?: Nullable<string>;
    interfaceNumbers?: Nullable<GraphQLInt>;
    modality?: Nullable<AppHealthApplicationIntegrationModality>;
    score?: Nullable<GraphQLInt>;
    documentations?: Nullable<JSON>;
}

export interface AppHealthCreateApplicationLanguageInput {
    id: string;
    applicationId: string;
    languageId: string;
    version: GraphQLString;
    score: GraphQLInt;
    codeQualityScore: GraphQLInt;
}

export interface AppHealthUpdateApplicationLanguageByIdInput {
    id: string;
    applicationId?: Nullable<string>;
    languageId?: Nullable<string>;
    version?: Nullable<GraphQLString>;
    score?: Nullable<GraphQLInt>;
    codeQualityScore?: Nullable<GraphQLInt>;
}

export interface AppHealthUpdateApplicationLanguagesInput {
    id?: Nullable<string>;
    applicationId?: Nullable<string>;
    languageId?: Nullable<string>;
    version?: Nullable<GraphQLString>;
    score?: Nullable<GraphQLInt>;
    codeQualityScore?: Nullable<GraphQLInt>;
}

export interface AppHealthCreateApplicationViewInput {
    id: string;
    applicationId: string;
    totalViews: GraphQLInt;
    complexity: GraphQLString;
    description?: Nullable<GraphQLInt>;
    score: GraphQLInt;
}

export interface AppHealthUpdateApplicationViewByIdInput {
    id: string;
    applicationId?: Nullable<string>;
    totalViews?: Nullable<GraphQLInt>;
    complexity?: Nullable<GraphQLString>;
    description?: Nullable<GraphQLInt>;
    score?: Nullable<GraphQLInt>;
}

export interface AppHealthUpdateApplicationViewsInput {
    id?: Nullable<string>;
    applicationId?: Nullable<string>;
    totalViews?: Nullable<GraphQLInt>;
    complexity?: Nullable<GraphQLString>;
    description?: Nullable<GraphQLInt>;
    score?: Nullable<GraphQLInt>;
}

export interface AppHealthCreateApplicationInput {
    id: string;
    technicalSolutionId: string;
    name: GraphQLString;
    description?: Nullable<GraphQLString>;
    businessImpact?: Nullable<GraphQLString>;
    type: AppHealthApplicationType;
    releaseDate?: Nullable<GraphQLISODateTime>;
    architectureDiagram?: Nullable<GraphQLString>;
    hasTenants: GraphQLBoolean;
    hasLicensing: GraphQLBoolean;
    costLicensesPerYear?: Nullable<GraphQLInt>;
    requestsPerDay?: Nullable<GraphQLInt>;
}

export interface AppHealthUpdateApplicationByIdInput {
    id: string;
    technicalSolutionId?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    description?: Nullable<GraphQLString>;
    businessImpact?: Nullable<GraphQLString>;
    type?: Nullable<AppHealthApplicationType>;
    releaseDate?: Nullable<GraphQLISODateTime>;
    architectureDiagram?: Nullable<GraphQLString>;
    hasTenants?: Nullable<GraphQLBoolean>;
    hasLicensing?: Nullable<GraphQLBoolean>;
    costLicensesPerYear?: Nullable<GraphQLInt>;
    requestsPerDay?: Nullable<GraphQLInt>;
}

export interface AppHealthUpdateApplicationsInput {
    id?: Nullable<string>;
    technicalSolutionId?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    description?: Nullable<GraphQLString>;
    businessImpact?: Nullable<GraphQLString>;
    type?: Nullable<AppHealthApplicationType>;
    releaseDate?: Nullable<GraphQLISODateTime>;
    architectureDiagram?: Nullable<GraphQLString>;
    hasTenants?: Nullable<GraphQLBoolean>;
    hasLicensing?: Nullable<GraphQLBoolean>;
    costLicensesPerYear?: Nullable<GraphQLInt>;
    requestsPerDay?: Nullable<GraphQLInt>;
}

export interface AppHealthCreateAuthenticationInterfaceInput {
    id: string;
    name: GraphQLString;
    score: GraphQLInt;
}

export interface AppHealthUpdateAuthenticationInterfaceByIdInput {
    id: string;
    name?: Nullable<GraphQLString>;
    score?: Nullable<GraphQLInt>;
}

export interface AppHealthUpdateAuthenticationInterfacesInput {
    id?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    score?: Nullable<GraphQLInt>;
}

export interface AppHealthCreateAuthorizationInterfaceInput {
    id: string;
    name: GraphQLString;
    score: GraphQLInt;
}

export interface AppHealthUpdateAuthorizationInterfaceByIdInput {
    id: string;
    name?: Nullable<GraphQLString>;
    score?: Nullable<GraphQLInt>;
}

export interface AppHealthUpdateAuthorizationInterfacesInput {
    id?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    score?: Nullable<GraphQLInt>;
}

export interface AppHealthCreateCustomerInput {
    id: string;
    name: GraphQLString;
}

export interface AppHealthUpdateCustomerByIdInput {
    id: string;
    name?: Nullable<GraphQLString>;
}

export interface AppHealthUpdateCustomersInput {
    id?: Nullable<string>;
    name?: Nullable<GraphQLString>;
}

export interface AppHealthCreateDatabaseInput {
    id: string;
    name: GraphQLString;
    type: AppHealthDatabaseType;
    versions: JSON;
}

export interface AppHealthUpdateDatabaseByIdInput {
    id: string;
    name?: Nullable<GraphQLString>;
    type?: Nullable<AppHealthDatabaseType>;
    versions?: Nullable<JSON>;
}

export interface AppHealthUpdateDatabasesInput {
    id?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    type?: Nullable<AppHealthDatabaseType>;
    versions?: Nullable<JSON>;
}

export interface AppHealthCreateInfrastructureProviderInput {
    id: string;
    name: GraphQLString;
    score: GraphQLInt;
}

export interface AppHealthUpdateInfrastructureProviderByIdInput {
    id: string;
    name?: Nullable<GraphQLString>;
    score?: Nullable<GraphQLInt>;
}

export interface AppHealthUpdateInfrastructureProvidersInput {
    id?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    score?: Nullable<GraphQLInt>;
}

export interface AppHealthCreateInfrastructureServiceInput {
    id: string;
    providerId: string;
    name: GraphQLString;
    score: GraphQLInt;
}

export interface AppHealthUpdateInfrastructureServiceByIdInput {
    id: string;
    providerId?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    score?: Nullable<GraphQLInt>;
}

export interface AppHealthUpdateInfrastructureServicesInput {
    id?: Nullable<string>;
    providerId?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    score?: Nullable<GraphQLInt>;
}

export interface AppHealthCreateLanguageInput {
    id: string;
    name: GraphQLString;
    versions: JSON;
}

export interface AppHealthUpdateLanguageByIdInput {
    id: string;
    name?: Nullable<GraphQLString>;
    versions?: Nullable<JSON>;
}

export interface AppHealthUpdateLanguagesInput {
    id?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    versions?: Nullable<JSON>;
}

export interface AppHealthCreateTechnicalSolutionInput {
    id: string;
    customerId: string;
    name: GraphQLString;
    description?: Nullable<GraphQLString>;
    architectureDiagram?: Nullable<GraphQLString>;
    proposal?: Nullable<GraphQLString>;
}

export interface AppHealthUpdateTechnicalSolutionByIdInput {
    id: string;
    customerId?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    description?: Nullable<GraphQLString>;
    architectureDiagram?: Nullable<GraphQLString>;
    proposal?: Nullable<GraphQLString>;
}

export interface AppHealthUpdateTechnicalSolutionsInput {
    id?: Nullable<string>;
    customerId?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    description?: Nullable<GraphQLString>;
    architectureDiagram?: Nullable<GraphQLString>;
    proposal?: Nullable<GraphQLString>;
}

export interface QueryStatement {
    where?: Nullable<JSON>;
    attributes?: Nullable<JSON>;
    include?: Nullable<Nullable<GraphQLString>[]>;
    order?: Nullable<JSON>;
    group?: Nullable<JSON>;
    limit?: Nullable<GraphQLInt>;
    offset?: Nullable<GraphQLInt>;
    distinct?: Nullable<GraphQLBoolean>;
    col?: Nullable<GraphQLString>;
}

export interface AppHealthApiInterfaceType {
    id: string;
    name: GraphQLString;
    score: GraphQLInt;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface IQuery {
    appHealthFindApiInterfaceType(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApiInterfaceType> | Promise<Nullable<AppHealthApiInterfaceType>>;
    appHealthFindApiInterfaceTypeById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApiInterfaceType> | Promise<Nullable<AppHealthApiInterfaceType>>;
    appHealthGetApiInterfaceTypes(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApiInterfaceType>[] | Promise<Nullable<AppHealthApiInterfaceType>[]>;
    appHealthPaginateApiInterfaceTypes(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindApplicationApi(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationApi> | Promise<Nullable<AppHealthApplicationApi>>;
    appHealthFindApplicationApiById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationApi> | Promise<Nullable<AppHealthApplicationApi>>;
    appHealthGetApplicationApis(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationApi>[] | Promise<Nullable<AppHealthApplicationApi>[]>;
    appHealthPaginateApplicationApis(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindApplicationAuthentication(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationAuthentication> | Promise<Nullable<AppHealthApplicationAuthentication>>;
    appHealthFindApplicationAuthenticationById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationAuthentication> | Promise<Nullable<AppHealthApplicationAuthentication>>;
    appHealthGetApplicationAuthentications(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationAuthentication>[] | Promise<Nullable<AppHealthApplicationAuthentication>[]>;
    appHealthPaginateApplicationAuthentications(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindApplicationAuthorization(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationAuthorization> | Promise<Nullable<AppHealthApplicationAuthorization>>;
    appHealthFindApplicationAuthorizationById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationAuthorization> | Promise<Nullable<AppHealthApplicationAuthorization>>;
    appHealthGetApplicationAuthorizations(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationAuthorization>[] | Promise<Nullable<AppHealthApplicationAuthorization>[]>;
    appHealthPaginateApplicationAuthorizations(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindApplicationDatabase(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationDatabase> | Promise<Nullable<AppHealthApplicationDatabase>>;
    appHealthFindApplicationDatabaseById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationDatabase> | Promise<Nullable<AppHealthApplicationDatabase>>;
    appHealthGetApplicationDatabases(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationDatabase>[] | Promise<Nullable<AppHealthApplicationDatabase>[]>;
    appHealthPaginateApplicationDatabases(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindApplicationInfrastructureService(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationInfrastructureService> | Promise<Nullable<AppHealthApplicationInfrastructureService>>;
    appHealthFindApplicationInfrastructureServiceById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationInfrastructureService> | Promise<Nullable<AppHealthApplicationInfrastructureService>>;
    appHealthGetApplicationInfrastuctureServices(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationInfrastructureService>[] | Promise<Nullable<AppHealthApplicationInfrastructureService>[]>;
    appHealthPaginateApplicationInfrastuctureServices(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindApplicationIntegration(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationIntegration> | Promise<Nullable<AppHealthApplicationIntegration>>;
    appHealthFindApplicationIntegrationById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationIntegration> | Promise<Nullable<AppHealthApplicationIntegration>>;
    appHealthGetApplicationIntegrations(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationIntegration>[] | Promise<Nullable<AppHealthApplicationIntegration>[]>;
    appHealthPaginateApplicationIntegrations(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindApplicationLanguage(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationLanguage> | Promise<Nullable<AppHealthApplicationLanguage>>;
    appHealthFindApplicationLanguageById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationLanguage> | Promise<Nullable<AppHealthApplicationLanguage>>;
    appHealthGetApplicationLanguages(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationLanguage>[] | Promise<Nullable<AppHealthApplicationLanguage>[]>;
    appHealthPaginateApplicationLanguages(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindApplicationView(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationView> | Promise<Nullable<AppHealthApplicationView>>;
    appHealthFindApplicationViewById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationView> | Promise<Nullable<AppHealthApplicationView>>;
    appHealthGetApplicationViews(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationView>[] | Promise<Nullable<AppHealthApplicationView>[]>;
    appHealthPaginateApplicationViews(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindApplication(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplication> | Promise<Nullable<AppHealthApplication>>;
    appHealthFindApplicationById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplication> | Promise<Nullable<AppHealthApplication>>;
    appHealthGetApplications(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplication>[] | Promise<Nullable<AppHealthApplication>[]>;
    appHealthPaginateApplications(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindAuthenticationInterface(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthAuthenticationInterface> | Promise<Nullable<AppHealthAuthenticationInterface>>;
    appHealthFindAuthenticationInterfaceById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthAuthenticationInterface> | Promise<Nullable<AppHealthAuthenticationInterface>>;
    appHealthGetAuthenticationInterfaces(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthAuthenticationInterface>[] | Promise<Nullable<AppHealthAuthenticationInterface>[]>;
    appHealthPaginateAuthenticationInterfaces(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindAuthorizationInterface(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthAuthorizationInterface> | Promise<Nullable<AppHealthAuthorizationInterface>>;
    appHealthFindAuthorizationInterfaceById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthAuthorizationInterface> | Promise<Nullable<AppHealthAuthorizationInterface>>;
    appHealthGetAuthorizationInterfaces(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthAuthorizationInterface>[] | Promise<Nullable<AppHealthAuthorizationInterface>[]>;
    appHealthPaginateAuthorizationInterfaces(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindCustomer(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthCustomer> | Promise<Nullable<AppHealthCustomer>>;
    appHealthFindCustomerById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthCustomer> | Promise<Nullable<AppHealthCustomer>>;
    appHealthGetCustomers(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthCustomer>[] | Promise<Nullable<AppHealthCustomer>[]>;
    appHealthPaginateCustomers(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindDatabase(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthDatabase> | Promise<Nullable<AppHealthDatabase>>;
    appHealthFindDatabaseById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthDatabase> | Promise<Nullable<AppHealthDatabase>>;
    appHealthGetDatabases(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthDatabase>[] | Promise<Nullable<AppHealthDatabase>[]>;
    appHealthPaginateDatabases(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindInfrastructureProvider(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthInfrastructureProvider> | Promise<Nullable<AppHealthInfrastructureProvider>>;
    appHealthFindInfrastructureProviderById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthInfrastructureProvider> | Promise<Nullable<AppHealthInfrastructureProvider>>;
    appHealthGetInfrastructureProviders(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthInfrastructureProvider>[] | Promise<Nullable<AppHealthInfrastructureProvider>[]>;
    appHealthPaginateInfrastructureProviders(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindInfrastructureService(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthInfrastructureService> | Promise<Nullable<AppHealthInfrastructureService>>;
    appHealthFindInfrastructureServiceById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthInfrastructureService> | Promise<Nullable<AppHealthInfrastructureService>>;
    appHealthGetInfrastructureServices(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthInfrastructureService>[] | Promise<Nullable<AppHealthInfrastructureService>[]>;
    appHealthPaginateInfrastructureServices(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindLanguage(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthLanguage> | Promise<Nullable<AppHealthLanguage>>;
    appHealthFindLanguageById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthLanguage> | Promise<Nullable<AppHealthLanguage>>;
    appHealthGetLanguages(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthLanguage>[] | Promise<Nullable<AppHealthLanguage>[]>;
    appHealthPaginateLanguages(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    appHealthFindTechnicalSolution(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthTechnicalSolution> | Promise<Nullable<AppHealthTechnicalSolution>>;
    appHealthFindTechnicalSolutionById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthTechnicalSolution> | Promise<Nullable<AppHealthTechnicalSolution>>;
    appHealthGetTechnicalSolutions(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthTechnicalSolution>[] | Promise<Nullable<AppHealthTechnicalSolution>[]>;
    appHealthPaginateTechnicalSolutions(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    coreGetLangs(): Nullable<CoreLang>[] | Promise<Nullable<CoreLang>[]>;
    coreGetFallbackLang(): Nullable<CoreLang> | Promise<Nullable<CoreLang>>;
    coreGetSearchKeyLang(): Nullable<CoreSearchKeyLang> | Promise<Nullable<CoreSearchKeyLang>>;
    hello(): Nullable<string> | Promise<Nullable<string>>;
}

export interface IMutation {
    appHealthCreateApiInterfaceType(payload: AppHealthCreateApiInterfaceTypeInput): Nullable<AppHealthApiInterfaceType> | Promise<Nullable<AppHealthApiInterfaceType>>;
    appHealthCreateApiInterfaceTypes(payload: Nullable<AppHealthCreateApiInterfaceTypeInput>[]): boolean | Promise<boolean>;
    appHealthUpdateApiInterfaceTypeById(payload: AppHealthUpdateApiInterfaceTypeByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApiInterfaceType> | Promise<Nullable<AppHealthApiInterfaceType>>;
    appHealthUpdateApiInterfaceTypes(payload: AppHealthUpdateApiInterfaceTypesInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApiInterfaceType>[] | Promise<Nullable<AppHealthApiInterfaceType>[]>;
    appHealthUpsertApiInterfaceType(payload: AppHealthUpdateApiInterfaceTypeByIdInput): Nullable<AppHealthApiInterfaceType> | Promise<Nullable<AppHealthApiInterfaceType>>;
    appHealthDeleteApiInterfaceTypeById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApiInterfaceType> | Promise<Nullable<AppHealthApiInterfaceType>>;
    appHealthDeleteApiInterfaceTypes(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApiInterfaceType>[] | Promise<Nullable<AppHealthApiInterfaceType>[]>;
    appHealthCreateApplicationApi(payload: AppHealthCreateApplicationApiInput): Nullable<AppHealthApplicationApi> | Promise<Nullable<AppHealthApplicationApi>>;
    appHealthCreateApplicationApis(payload: Nullable<AppHealthCreateApplicationApiInput>[]): boolean | Promise<boolean>;
    appHealthUpdateApplicationApiById(payload: AppHealthUpdateApplicationApiByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationApi> | Promise<Nullable<AppHealthApplicationApi>>;
    appHealthUpdateApplicationApis(payload: AppHealthUpdateApplicationApisInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationApi>[] | Promise<Nullable<AppHealthApplicationApi>[]>;
    appHealthUpsertApplicationApi(payload: AppHealthUpdateApplicationApiByIdInput): Nullable<AppHealthApplicationApi> | Promise<Nullable<AppHealthApplicationApi>>;
    appHealthDeleteApplicationApiById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationApi> | Promise<Nullable<AppHealthApplicationApi>>;
    appHealthDeleteApplicationApis(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationApi>[] | Promise<Nullable<AppHealthApplicationApi>[]>;
    appHealthCreateApplicationAuthentication(payload: AppHealthCreateApplicationAuthenticationInput): Nullable<AppHealthApplicationAuthentication> | Promise<Nullable<AppHealthApplicationAuthentication>>;
    appHealthCreateApplicationAuthentications(payload: Nullable<AppHealthCreateApplicationAuthenticationInput>[]): boolean | Promise<boolean>;
    appHealthUpdateApplicationAuthenticationById(payload: AppHealthUpdateApplicationAuthenticationByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationAuthentication> | Promise<Nullable<AppHealthApplicationAuthentication>>;
    appHealthUpdateApplicationAuthentications(payload: AppHealthUpdateApplicationAuthenticationsInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationAuthentication>[] | Promise<Nullable<AppHealthApplicationAuthentication>[]>;
    appHealthUpsertApplicationAuthentication(payload: AppHealthUpdateApplicationAuthenticationByIdInput): Nullable<AppHealthApplicationAuthentication> | Promise<Nullable<AppHealthApplicationAuthentication>>;
    appHealthDeleteApplicationAuthenticationById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationAuthentication> | Promise<Nullable<AppHealthApplicationAuthentication>>;
    appHealthDeleteApplicationAuthentications(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationAuthentication>[] | Promise<Nullable<AppHealthApplicationAuthentication>[]>;
    appHealthCreateApplicationAuthorization(payload: AppHealthCreateApplicationAuthorizationInput): Nullable<AppHealthApplicationAuthorization> | Promise<Nullable<AppHealthApplicationAuthorization>>;
    appHealthCreateApplicationAuthorizations(payload: Nullable<AppHealthCreateApplicationAuthorizationInput>[]): boolean | Promise<boolean>;
    appHealthUpdateApplicationAuthorizationById(payload: AppHealthUpdateApplicationAuthorizationByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationAuthorization> | Promise<Nullable<AppHealthApplicationAuthorization>>;
    appHealthUpdateApplicationAuthorizations(payload: AppHealthUpdateApplicationAuthorizationsInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationAuthorization>[] | Promise<Nullable<AppHealthApplicationAuthorization>[]>;
    appHealthUpsertApplicationAuthorization(payload: AppHealthUpdateApplicationAuthorizationByIdInput): Nullable<AppHealthApplicationAuthorization> | Promise<Nullable<AppHealthApplicationAuthorization>>;
    appHealthDeleteApplicationAuthorizationById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationAuthorization> | Promise<Nullable<AppHealthApplicationAuthorization>>;
    appHealthDeleteApplicationAuthorizations(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationAuthorization>[] | Promise<Nullable<AppHealthApplicationAuthorization>[]>;
    appHealthCreateApplicationDatabase(payload: AppHealthCreateApplicationDatabaseInput): Nullable<AppHealthApplicationDatabase> | Promise<Nullable<AppHealthApplicationDatabase>>;
    appHealthCreateApplicationDatabases(payload: Nullable<AppHealthCreateApplicationDatabaseInput>[]): boolean | Promise<boolean>;
    appHealthUpdateApplicationDatabaseById(payload: AppHealthUpdateApplicationDatabaseByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationDatabase> | Promise<Nullable<AppHealthApplicationDatabase>>;
    appHealthUpdateApplicationDatabases(payload: AppHealthUpdateApplicationDatabasesInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationDatabase>[] | Promise<Nullable<AppHealthApplicationDatabase>[]>;
    appHealthUpsertApplicationDatabase(payload: AppHealthUpdateApplicationDatabaseByIdInput): Nullable<AppHealthApplicationDatabase> | Promise<Nullable<AppHealthApplicationDatabase>>;
    appHealthDeleteApplicationDatabaseById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationDatabase> | Promise<Nullable<AppHealthApplicationDatabase>>;
    appHealthDeleteApplicationDatabases(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationDatabase>[] | Promise<Nullable<AppHealthApplicationDatabase>[]>;
    appHealthCreateApplicationInfrastructureService(payload: AppHealthCreateApplicationInfrastructureServiceInput): Nullable<AppHealthApplicationInfrastructureService> | Promise<Nullable<AppHealthApplicationInfrastructureService>>;
    appHealthCreateApplicationInfrastuctureServices(payload: Nullable<AppHealthCreateApplicationInfrastructureServiceInput>[]): boolean | Promise<boolean>;
    appHealthUpdateApplicationInfrastructureServiceById(payload: AppHealthUpdateApplicationInfrastructureServiceByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationInfrastructureService> | Promise<Nullable<AppHealthApplicationInfrastructureService>>;
    appHealthUpdateApplicationInfrastuctureServices(payload: AppHealthUpdateApplicationInfrastuctureServicesInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationInfrastructureService>[] | Promise<Nullable<AppHealthApplicationInfrastructureService>[]>;
    appHealthUpsertApplicationInfrastructureService(payload: AppHealthUpdateApplicationInfrastructureServiceByIdInput): Nullable<AppHealthApplicationInfrastructureService> | Promise<Nullable<AppHealthApplicationInfrastructureService>>;
    appHealthDeleteApplicationInfrastructureServiceById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationInfrastructureService> | Promise<Nullable<AppHealthApplicationInfrastructureService>>;
    appHealthDeleteApplicationInfrastuctureServices(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationInfrastructureService>[] | Promise<Nullable<AppHealthApplicationInfrastructureService>[]>;
    appHealthCreateApplicationIntegration(payload: AppHealthCreateApplicationIntegrationInput): Nullable<AppHealthApplicationIntegration> | Promise<Nullable<AppHealthApplicationIntegration>>;
    appHealthCreateApplicationIntegrations(payload: Nullable<AppHealthCreateApplicationIntegrationInput>[]): boolean | Promise<boolean>;
    appHealthUpdateApplicationIntegrationById(payload: AppHealthUpdateApplicationIntegrationByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationIntegration> | Promise<Nullable<AppHealthApplicationIntegration>>;
    appHealthUpdateApplicationIntegrations(payload: AppHealthUpdateApplicationIntegrationsInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationIntegration>[] | Promise<Nullable<AppHealthApplicationIntegration>[]>;
    appHealthUpsertApplicationIntegration(payload: AppHealthUpdateApplicationIntegrationByIdInput): Nullable<AppHealthApplicationIntegration> | Promise<Nullable<AppHealthApplicationIntegration>>;
    appHealthDeleteApplicationIntegrationById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationIntegration> | Promise<Nullable<AppHealthApplicationIntegration>>;
    appHealthDeleteApplicationIntegrations(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationIntegration>[] | Promise<Nullable<AppHealthApplicationIntegration>[]>;
    appHealthCreateApplicationLanguage(payload: AppHealthCreateApplicationLanguageInput): Nullable<AppHealthApplicationLanguage> | Promise<Nullable<AppHealthApplicationLanguage>>;
    appHealthCreateApplicationLanguages(payload: Nullable<AppHealthCreateApplicationLanguageInput>[]): boolean | Promise<boolean>;
    appHealthUpdateApplicationLanguageById(payload: AppHealthUpdateApplicationLanguageByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationLanguage> | Promise<Nullable<AppHealthApplicationLanguage>>;
    appHealthUpdateApplicationLanguages(payload: AppHealthUpdateApplicationLanguagesInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationLanguage>[] | Promise<Nullable<AppHealthApplicationLanguage>[]>;
    appHealthUpsertApplicationLanguage(payload: AppHealthUpdateApplicationLanguageByIdInput): Nullable<AppHealthApplicationLanguage> | Promise<Nullable<AppHealthApplicationLanguage>>;
    appHealthDeleteApplicationLanguageById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationLanguage> | Promise<Nullable<AppHealthApplicationLanguage>>;
    appHealthDeleteApplicationLanguages(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationLanguage>[] | Promise<Nullable<AppHealthApplicationLanguage>[]>;
    appHealthCreateApplicationView(payload: AppHealthCreateApplicationViewInput): Nullable<AppHealthApplicationView> | Promise<Nullable<AppHealthApplicationView>>;
    appHealthCreateApplicationViews(payload: Nullable<AppHealthCreateApplicationViewInput>[]): boolean | Promise<boolean>;
    appHealthUpdateApplicationViewById(payload: AppHealthUpdateApplicationViewByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationView> | Promise<Nullable<AppHealthApplicationView>>;
    appHealthUpdateApplicationViews(payload: AppHealthUpdateApplicationViewsInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationView>[] | Promise<Nullable<AppHealthApplicationView>[]>;
    appHealthUpsertApplicationView(payload: AppHealthUpdateApplicationViewByIdInput): Nullable<AppHealthApplicationView> | Promise<Nullable<AppHealthApplicationView>>;
    appHealthDeleteApplicationViewById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationView> | Promise<Nullable<AppHealthApplicationView>>;
    appHealthDeleteApplicationViews(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplicationView>[] | Promise<Nullable<AppHealthApplicationView>[]>;
    appHealthCreateApplication(payload: AppHealthCreateApplicationInput): Nullable<AppHealthApplication> | Promise<Nullable<AppHealthApplication>>;
    appHealthCreateApplications(payload: Nullable<AppHealthCreateApplicationInput>[]): boolean | Promise<boolean>;
    appHealthUpdateApplicationById(payload: AppHealthUpdateApplicationByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplication> | Promise<Nullable<AppHealthApplication>>;
    appHealthUpdateApplications(payload: AppHealthUpdateApplicationsInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplication>[] | Promise<Nullable<AppHealthApplication>[]>;
    appHealthUpsertApplication(payload: AppHealthUpdateApplicationByIdInput): Nullable<AppHealthApplication> | Promise<Nullable<AppHealthApplication>>;
    appHealthDeleteApplicationById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplication> | Promise<Nullable<AppHealthApplication>>;
    appHealthDeleteApplications(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthApplication>[] | Promise<Nullable<AppHealthApplication>[]>;
    appHealthCreateAuthenticationInterface(payload: AppHealthCreateAuthenticationInterfaceInput): Nullable<AppHealthAuthenticationInterface> | Promise<Nullable<AppHealthAuthenticationInterface>>;
    appHealthCreateAuthenticationInterfaces(payload: Nullable<AppHealthCreateAuthenticationInterfaceInput>[]): boolean | Promise<boolean>;
    appHealthUpdateAuthenticationInterfaceById(payload: AppHealthUpdateAuthenticationInterfaceByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthAuthenticationInterface> | Promise<Nullable<AppHealthAuthenticationInterface>>;
    appHealthUpdateAuthenticationInterfaces(payload: AppHealthUpdateAuthenticationInterfacesInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthAuthenticationInterface>[] | Promise<Nullable<AppHealthAuthenticationInterface>[]>;
    appHealthUpsertAuthenticationInterface(payload: AppHealthUpdateAuthenticationInterfaceByIdInput): Nullable<AppHealthAuthenticationInterface> | Promise<Nullable<AppHealthAuthenticationInterface>>;
    appHealthDeleteAuthenticationInterfaceById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthAuthenticationInterface> | Promise<Nullable<AppHealthAuthenticationInterface>>;
    appHealthDeleteAuthenticationInterfaces(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthAuthenticationInterface>[] | Promise<Nullable<AppHealthAuthenticationInterface>[]>;
    appHealthCreateAuthorizationInterface(payload: AppHealthCreateAuthorizationInterfaceInput): Nullable<AppHealthAuthorizationInterface> | Promise<Nullable<AppHealthAuthorizationInterface>>;
    appHealthCreateAuthorizationInterfaces(payload: Nullable<AppHealthCreateAuthorizationInterfaceInput>[]): boolean | Promise<boolean>;
    appHealthUpdateAuthorizationInterfaceById(payload: AppHealthUpdateAuthorizationInterfaceByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthAuthorizationInterface> | Promise<Nullable<AppHealthAuthorizationInterface>>;
    appHealthUpdateAuthorizationInterfaces(payload: AppHealthUpdateAuthorizationInterfacesInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthAuthorizationInterface>[] | Promise<Nullable<AppHealthAuthorizationInterface>[]>;
    appHealthUpsertAuthorizationInterface(payload: AppHealthUpdateAuthorizationInterfaceByIdInput): Nullable<AppHealthAuthorizationInterface> | Promise<Nullable<AppHealthAuthorizationInterface>>;
    appHealthDeleteAuthorizationInterfaceById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthAuthorizationInterface> | Promise<Nullable<AppHealthAuthorizationInterface>>;
    appHealthDeleteAuthorizationInterfaces(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthAuthorizationInterface>[] | Promise<Nullable<AppHealthAuthorizationInterface>[]>;
    appHealthCreateCustomer(payload: AppHealthCreateCustomerInput): Nullable<AppHealthCustomer> | Promise<Nullable<AppHealthCustomer>>;
    appHealthCreateCustomers(payload: Nullable<AppHealthCreateCustomerInput>[]): boolean | Promise<boolean>;
    appHealthUpdateCustomerById(payload: AppHealthUpdateCustomerByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthCustomer> | Promise<Nullable<AppHealthCustomer>>;
    appHealthUpdateCustomers(payload: AppHealthUpdateCustomersInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthCustomer>[] | Promise<Nullable<AppHealthCustomer>[]>;
    appHealthUpsertCustomer(payload: AppHealthUpdateCustomerByIdInput): Nullable<AppHealthCustomer> | Promise<Nullable<AppHealthCustomer>>;
    appHealthDeleteCustomerById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthCustomer> | Promise<Nullable<AppHealthCustomer>>;
    appHealthDeleteCustomers(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthCustomer>[] | Promise<Nullable<AppHealthCustomer>[]>;
    appHealthCreateDatabase(payload: AppHealthCreateDatabaseInput): Nullable<AppHealthDatabase> | Promise<Nullable<AppHealthDatabase>>;
    appHealthCreateDatabases(payload: Nullable<AppHealthCreateDatabaseInput>[]): boolean | Promise<boolean>;
    appHealthUpdateDatabaseById(payload: AppHealthUpdateDatabaseByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthDatabase> | Promise<Nullable<AppHealthDatabase>>;
    appHealthUpdateDatabases(payload: AppHealthUpdateDatabasesInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthDatabase>[] | Promise<Nullable<AppHealthDatabase>[]>;
    appHealthUpsertDatabase(payload: AppHealthUpdateDatabaseByIdInput): Nullable<AppHealthDatabase> | Promise<Nullable<AppHealthDatabase>>;
    appHealthDeleteDatabaseById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthDatabase> | Promise<Nullable<AppHealthDatabase>>;
    appHealthDeleteDatabases(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthDatabase>[] | Promise<Nullable<AppHealthDatabase>[]>;
    appHealthCreateInfrastructureProvider(payload: AppHealthCreateInfrastructureProviderInput): Nullable<AppHealthInfrastructureProvider> | Promise<Nullable<AppHealthInfrastructureProvider>>;
    appHealthCreateInfrastructureProviders(payload: Nullable<AppHealthCreateInfrastructureProviderInput>[]): boolean | Promise<boolean>;
    appHealthUpdateInfrastructureProviderById(payload: AppHealthUpdateInfrastructureProviderByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthInfrastructureProvider> | Promise<Nullable<AppHealthInfrastructureProvider>>;
    appHealthUpdateInfrastructureProviders(payload: AppHealthUpdateInfrastructureProvidersInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthInfrastructureProvider>[] | Promise<Nullable<AppHealthInfrastructureProvider>[]>;
    appHealthUpsertInfrastructureProvider(payload: AppHealthUpdateInfrastructureProviderByIdInput): Nullable<AppHealthInfrastructureProvider> | Promise<Nullable<AppHealthInfrastructureProvider>>;
    appHealthDeleteInfrastructureProviderById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthInfrastructureProvider> | Promise<Nullable<AppHealthInfrastructureProvider>>;
    appHealthDeleteInfrastructureProviders(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthInfrastructureProvider>[] | Promise<Nullable<AppHealthInfrastructureProvider>[]>;
    appHealthCreateInfrastructureService(payload: AppHealthCreateInfrastructureServiceInput): Nullable<AppHealthInfrastructureService> | Promise<Nullable<AppHealthInfrastructureService>>;
    appHealthCreateInfrastructureServices(payload: Nullable<AppHealthCreateInfrastructureServiceInput>[]): boolean | Promise<boolean>;
    appHealthUpdateInfrastructureServiceById(payload: AppHealthUpdateInfrastructureServiceByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthInfrastructureService> | Promise<Nullable<AppHealthInfrastructureService>>;
    appHealthUpdateInfrastructureServices(payload: AppHealthUpdateInfrastructureServicesInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthInfrastructureService>[] | Promise<Nullable<AppHealthInfrastructureService>[]>;
    appHealthUpsertInfrastructureService(payload: AppHealthUpdateInfrastructureServiceByIdInput): Nullable<AppHealthInfrastructureService> | Promise<Nullable<AppHealthInfrastructureService>>;
    appHealthDeleteInfrastructureServiceById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthInfrastructureService> | Promise<Nullable<AppHealthInfrastructureService>>;
    appHealthDeleteInfrastructureServices(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthInfrastructureService>[] | Promise<Nullable<AppHealthInfrastructureService>[]>;
    appHealthCreateLanguage(payload: AppHealthCreateLanguageInput): Nullable<AppHealthLanguage> | Promise<Nullable<AppHealthLanguage>>;
    appHealthCreateLanguages(payload: Nullable<AppHealthCreateLanguageInput>[]): boolean | Promise<boolean>;
    appHealthUpdateLanguageById(payload: AppHealthUpdateLanguageByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthLanguage> | Promise<Nullable<AppHealthLanguage>>;
    appHealthUpdateLanguages(payload: AppHealthUpdateLanguagesInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthLanguage>[] | Promise<Nullable<AppHealthLanguage>[]>;
    appHealthUpsertLanguage(payload: AppHealthUpdateLanguageByIdInput): Nullable<AppHealthLanguage> | Promise<Nullable<AppHealthLanguage>>;
    appHealthDeleteLanguageById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthLanguage> | Promise<Nullable<AppHealthLanguage>>;
    appHealthDeleteLanguages(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthLanguage>[] | Promise<Nullable<AppHealthLanguage>[]>;
    appHealthCreateTechnicalSolution(payload: AppHealthCreateTechnicalSolutionInput): Nullable<AppHealthTechnicalSolution> | Promise<Nullable<AppHealthTechnicalSolution>>;
    appHealthCreateTechnicalSolutions(payload: Nullable<AppHealthCreateTechnicalSolutionInput>[]): boolean | Promise<boolean>;
    appHealthUpdateTechnicalSolutionById(payload: AppHealthUpdateTechnicalSolutionByIdInput, constraint?: Nullable<QueryStatement>): Nullable<AppHealthTechnicalSolution> | Promise<Nullable<AppHealthTechnicalSolution>>;
    appHealthUpdateTechnicalSolutions(payload: AppHealthUpdateTechnicalSolutionsInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthTechnicalSolution>[] | Promise<Nullable<AppHealthTechnicalSolution>[]>;
    appHealthUpsertTechnicalSolution(payload: AppHealthUpdateTechnicalSolutionByIdInput): Nullable<AppHealthTechnicalSolution> | Promise<Nullable<AppHealthTechnicalSolution>>;
    appHealthDeleteTechnicalSolutionById(id: string, constraint?: Nullable<QueryStatement>): Nullable<AppHealthTechnicalSolution> | Promise<Nullable<AppHealthTechnicalSolution>>;
    appHealthDeleteTechnicalSolutions(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<AppHealthTechnicalSolution>[] | Promise<Nullable<AppHealthTechnicalSolution>[]>;
}

export interface AppHealthApplicationApi {
    id: string;
    applicationId: string;
    application?: Nullable<AppHealthApplication>;
    apiInterfaceTypeId: string;
    apiInterfaceType?: Nullable<AppHealthApiInterfaceType>;
    score: GraphQLInt;
    documentations?: Nullable<JSON>;
    requestsPerDay?: Nullable<GraphQLInt>;
    applicationInfrastructureServiceId: string;
    applicationInfrastructureService?: Nullable<AppHealthApplicationInfrastructureService>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthApplicationAuthentication {
    id: string;
    applicationId: string;
    application?: Nullable<AppHealthApplication>;
    authenticationInterfaceId: string;
    authenticationInterface?: Nullable<AppHealthAuthenticationInterface>;
    totalUsers?: Nullable<GraphQLInt>;
    score: GraphQLInt;
    applicationInfrastructureServiceId: string;
    applicationInfrastructureService?: Nullable<AppHealthApplicationInfrastructureService>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthApplicationAuthorization {
    id: string;
    applicationId: string;
    application?: Nullable<AppHealthApplication>;
    authorizationInterfaceId: string;
    authorizationInterface?: Nullable<AppHealthAuthorizationInterface>;
    totalUsers?: Nullable<GraphQLInt>;
    score: GraphQLInt;
    applicationInfrastructureServiceId: string;
    applicationInfrastructureService?: Nullable<AppHealthApplicationInfrastructureService>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthApplicationDatabase {
    id: string;
    applicationId: string;
    application?: Nullable<AppHealthApplication>;
    databaseId: string;
    database?: Nullable<AppHealthDatabase>;
    version: GraphQLString;
    size?: Nullable<GraphQLInt>;
    score: GraphQLInt;
    totalCollectionsTables?: Nullable<GraphQLInt>;
    totalFields?: Nullable<GraphQLInt>;
    applicationInfrastructureServiceId: string;
    applicationInfrastructureService?: Nullable<AppHealthApplicationInfrastructureService>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthApplicationInfrastructureService {
    id: string;
    applicationId: string;
    application?: Nullable<AppHealthApplication>;
    infrastructureServiceId: string;
    infrastructureService?: Nullable<AppHealthInfrastructureService>;
    averageCostPerYear?: Nullable<GraphQLInt>;
    score: GraphQLInt;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthApplicationIntegration {
    id: string;
    name: GraphQLString;
    description?: Nullable<GraphQLString>;
    sourceApplicationId: string;
    sourceApplication?: Nullable<AppHealthApplication>;
    targetApplicationId?: Nullable<string>;
    targetApplication?: Nullable<AppHealthApplication>;
    apiInterfaceTypeId: string;
    apiInterfaceType?: Nullable<AppHealthApiInterfaceType>;
    interfaceNumbers?: Nullable<GraphQLInt>;
    modality: AppHealthApplicationIntegrationModality;
    score: GraphQLInt;
    documentations?: Nullable<JSON>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthApplicationLanguage {
    id: string;
    applicationId: string;
    application?: Nullable<AppHealthApplication>;
    languageId: string;
    language?: Nullable<AppHealthLanguage>;
    version: GraphQLString;
    score: GraphQLInt;
    codeQualityScore: GraphQLInt;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthApplicationView {
    id: string;
    applicationId: string;
    application?: Nullable<AppHealthApplication>;
    totalViews: GraphQLInt;
    complexity: GraphQLString;
    description?: Nullable<GraphQLInt>;
    score: GraphQLInt;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthApplication {
    id: string;
    technicalSolutionId: string;
    technicalSolution?: Nullable<AppHealthTechnicalSolution>;
    name: GraphQLString;
    description?: Nullable<GraphQLString>;
    businessImpact?: Nullable<GraphQLString>;
    type: AppHealthApplicationType;
    releaseDate?: Nullable<GraphQLISODateTime>;
    architectureDiagram?: Nullable<GraphQLString>;
    hasTenants: GraphQLBoolean;
    hasLicensing: GraphQLBoolean;
    costLicensesPerYear?: Nullable<GraphQLInt>;
    requestsPerDay?: Nullable<GraphQLInt>;
    views?: Nullable<Nullable<AppHealthApplicationView>[]>;
    authentications?: Nullable<Nullable<AppHealthApplicationAuthentication>[]>;
    authorizations?: Nullable<Nullable<AppHealthApplicationAuthorization>[]>;
    languages?: Nullable<Nullable<AppHealthApplicationLanguage>[]>;
    infrastructureServices?: Nullable<Nullable<AppHealthApplicationInfrastructureService>[]>;
    databases?: Nullable<Nullable<AppHealthApplicationDatabase>[]>;
    apis?: Nullable<Nullable<AppHealthApplicationApi>[]>;
    integrations?: Nullable<Nullable<AppHealthApplicationIntegration>[]>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthAuthenticationInterface {
    id: string;
    name: GraphQLString;
    score: GraphQLInt;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthAuthorizationInterface {
    id: string;
    name: GraphQLString;
    score: GraphQLInt;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthCustomer {
    id: string;
    name: GraphQLString;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthDatabase {
    id: string;
    name: GraphQLString;
    type: AppHealthDatabaseType;
    versions: JSON;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthInfrastructureProvider {
    id: string;
    name: GraphQLString;
    score: GraphQLInt;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthInfrastructureService {
    id: string;
    providerId: string;
    provider?: Nullable<AppHealthInfrastructureProvider>;
    name: GraphQLString;
    score: GraphQLInt;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthLanguage {
    id: string;
    name: GraphQLString;
    versions: JSON;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface AppHealthTechnicalSolution {
    id: string;
    customerId: string;
    customer?: Nullable<AppHealthCustomer>;
    name: GraphQLString;
    description?: Nullable<GraphQLString>;
    architectureDiagram?: Nullable<GraphQLString>;
    proposal?: Nullable<GraphQLString>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface CoreLang {
    id: GraphQLString;
    name: GraphQLString;
    image?: Nullable<GraphQLString>;
    iso6392: GraphQLString;
    iso6393: GraphQLString;
    ietf: GraphQLString;
    customCode?: Nullable<GraphQLString>;
    dir: CoreLangDir;
    sort?: Nullable<GraphQLInt>;
    isActive: GraphQLBoolean;
    createdAt?: Nullable<GraphQLString>;
    updatedAt?: Nullable<GraphQLString>;
    deletedAt?: Nullable<GraphQLString>;
}

export interface Pagination {
    total: GraphQLInt;
    count: GraphQLInt;
    rows: Nullable<JSON>[];
}

export type JSON = any;
export type Any = any;
export type Upload = any;
export type GraphQLString = any;
export type GraphQLInt = any;
export type GraphQLFloat = any;
export type GraphQLBoolean = any;
export type GraphQLISODateTime = any;
export type GraphQLTimestamp = any;
type Nullable<T> = T | null;
