export interface AppHealthApiInterfaceType {
    id: string;
    name: string;
    score: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateApiInterfaceType {
    id: string;
    name: string;
    score: number;
}

export interface AppHealthUpdateApiInterfaceTypeById {
    id: string;
    name?: string;
    score?: number;
}

export interface AppHealthUpdateApiInterfaceTypes {
    id?: string;
    name?: string;
    score?: number;
}

export interface AppHealthCustomer {
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateCustomer {
    id: string;
    name: string;
}

export interface AppHealthUpdateCustomerById {
    id: string;
    name?: string;
}

export interface AppHealthUpdateCustomers {
    id?: string;
    name?: string;
}

export interface AppHealthTechnicalSolution {
    id: string;
    customerId: string;
    name: string;
    description?: string;
    architectureDiagram?: string;
    proposal?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateTechnicalSolution {
    id: string;
    customerId: string;
    name: string;
    description?: string;
    architectureDiagram?: string;
    proposal?: string;
}

export interface AppHealthUpdateTechnicalSolutionById {
    id: string;
    customerId?: string;
    name?: string;
    description?: string;
    architectureDiagram?: string;
    proposal?: string;
}

export interface AppHealthUpdateTechnicalSolutions {
    id?: string;
    customerId?: string;
    name?: string;
    description?: string;
    architectureDiagram?: string;
    proposal?: string;
}

export interface AppHealthApplication {
    id: string;
    technicalSolutionId: string;
    name: string;
    description?: string;
    businessImpact?: string;
    type: string;
    releaseDate?: string;
    architectureDiagram?: string;
    hasTenants: boolean;
    hasLicensing: boolean;
    costLicensesPerYear?: number;
    requestsPerDay?: number;
    views?: AppHealthApplicationView[];
    authentications?: AppHealthApplicationAuthentication[];
    authorizations?: AppHealthApplicationAuthorization[];
    languages?: AppHealthApplicationLanguage[];
    infrastructureServices?: AppHealthApplicationInfrastructureService[];
    databases?: AppHealthApplicationDatabase[];
    apis?: AppHealthApplicationApi[];
    integrations?: AppHealthApplicationIntegration[];
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateApplication {
    id: string;
    technicalSolutionId: string;
    name: string;
    description?: string;
    businessImpact?: string;
    type: string;
    releaseDate?: string;
    architectureDiagram?: string;
    hasTenants: boolean;
    hasLicensing: boolean;
    costLicensesPerYear?: number;
    requestsPerDay?: number;
    views?: AppHealthApplicationView[];
    authentications?: AppHealthApplicationAuthentication[];
    authorizations?: AppHealthApplicationAuthorization[];
    languages?: AppHealthApplicationLanguage[];
    infrastructureServices?: AppHealthApplicationInfrastructureService[];
    databases?: AppHealthApplicationDatabase[];
    apis?: AppHealthApplicationApi[];
    integrations?: AppHealthApplicationIntegration[];
}

export interface AppHealthUpdateApplicationById {
    id: string;
    technicalSolutionId?: string;
    name?: string;
    description?: string;
    businessImpact?: string;
    type?: string;
    releaseDate?: string;
    architectureDiagram?: string;
    hasTenants?: boolean;
    hasLicensing?: boolean;
    costLicensesPerYear?: number;
    requestsPerDay?: number;
    views?: AppHealthApplicationView[];
    authentications?: AppHealthApplicationAuthentication[];
    authorizations?: AppHealthApplicationAuthorization[];
    languages?: AppHealthApplicationLanguage[];
    infrastructureServices?: AppHealthApplicationInfrastructureService[];
    databases?: AppHealthApplicationDatabase[];
    apis?: AppHealthApplicationApi[];
    integrations?: AppHealthApplicationIntegration[];
}

export interface AppHealthUpdateApplications {
    id?: string;
    technicalSolutionId?: string;
    name?: string;
    description?: string;
    businessImpact?: string;
    type?: string;
    releaseDate?: string;
    architectureDiagram?: string;
    hasTenants?: boolean;
    hasLicensing?: boolean;
    costLicensesPerYear?: number;
    requestsPerDay?: number;
    views?: AppHealthApplicationView[];
    authentications?: AppHealthApplicationAuthentication[];
    authorizations?: AppHealthApplicationAuthorization[];
    languages?: AppHealthApplicationLanguage[];
    infrastructureServices?: AppHealthApplicationInfrastructureService[];
    databases?: AppHealthApplicationDatabase[];
    apis?: AppHealthApplicationApi[];
    integrations?: AppHealthApplicationIntegration[];
}

export interface AppHealthApplicationView {
    id: string;
    applicationId: string;
    totalViews: number;
    complexity: string;
    description?: number;
    score: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateApplicationView {
    id: string;
    applicationId: string;
    totalViews: number;
    complexity: string;
    description?: number;
    score: number;
}

export interface AppHealthUpdateApplicationViewById {
    id: string;
    applicationId?: string;
    totalViews?: number;
    complexity?: string;
    description?: number;
    score?: number;
}

export interface AppHealthUpdateApplicationViews {
    id?: string;
    applicationId?: string;
    totalViews?: number;
    complexity?: string;
    description?: number;
    score?: number;
}

export interface AppHealthDatabase {
    id: string;
    name: string;
    type: string;
    versions: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateDatabase {
    id: string;
    name: string;
    type: string;
    versions: any;
}

export interface AppHealthUpdateDatabaseById {
    id: string;
    name?: string;
    type?: string;
    versions?: any;
}

export interface AppHealthUpdateDatabases {
    id?: string;
    name?: string;
    type?: string;
    versions?: any;
}

export interface AppHealthApplicationDatabase {
    id: string;
    applicationId: string;
    databaseId: string;
    version: string;
    size?: number;
    score: number;
    totalCollectionsTables?: number;
    totalFields?: number;
    applicationInfrastructureServiceId: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateApplicationDatabase {
    id: string;
    applicationId: string;
    databaseId: string;
    version: string;
    size?: number;
    score: number;
    totalCollectionsTables?: number;
    totalFields?: number;
    applicationInfrastructureServiceId: string;
}

export interface AppHealthUpdateApplicationDatabaseById {
    id: string;
    applicationId?: string;
    databaseId?: string;
    version?: string;
    size?: number;
    score?: number;
    totalCollectionsTables?: number;
    totalFields?: number;
    applicationInfrastructureServiceId?: string;
}

export interface AppHealthUpdateApplicationDatabases {
    id?: string;
    applicationId?: string;
    databaseId?: string;
    version?: string;
    size?: number;
    score?: number;
    totalCollectionsTables?: number;
    totalFields?: number;
    applicationInfrastructureServiceId?: string;
}

export interface AppHealthLanguage {
    id: string;
    name: string;
    versions: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateLanguage {
    id: string;
    name: string;
    versions: any;
}

export interface AppHealthUpdateLanguageById {
    id: string;
    name?: string;
    versions?: any;
}

export interface AppHealthUpdateLanguages {
    id?: string;
    name?: string;
    versions?: any;
}

export interface AppHealthApplicationLanguage {
    id: string;
    applicationId: string;
    languageId: string;
    version: string;
    score: number;
    codeQualityScore: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateApplicationLanguage {
    id: string;
    applicationId: string;
    languageId: string;
    version: string;
    score: number;
    codeQualityScore: number;
}

export interface AppHealthUpdateApplicationLanguageById {
    id: string;
    applicationId?: string;
    languageId?: string;
    version?: string;
    score?: number;
    codeQualityScore?: number;
}

export interface AppHealthUpdateApplicationLanguages {
    id?: string;
    applicationId?: string;
    languageId?: string;
    version?: string;
    score?: number;
    codeQualityScore?: number;
}

export interface AppHealthAuthenticationInterface {
    id: string;
    name: string;
    score: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateAuthenticationInterface {
    id: string;
    name: string;
    score: number;
}

export interface AppHealthUpdateAuthenticationInterfaceById {
    id: string;
    name?: string;
    score?: number;
}

export interface AppHealthUpdateAuthenticationInterfaces {
    id?: string;
    name?: string;
    score?: number;
}

export interface AppHealthApplicationAuthentication {
    id: string;
    applicationId: string;
    authenticationInterfaceId: string;
    totalUsers?: number;
    score: number;
    applicationInfrastructureServiceId: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateApplicationAuthentication {
    id: string;
    applicationId: string;
    authenticationInterfaceId: string;
    totalUsers?: number;
    score: number;
    applicationInfrastructureServiceId: string;
}

export interface AppHealthUpdateApplicationAuthenticationById {
    id: string;
    applicationId?: string;
    authenticationInterfaceId?: string;
    totalUsers?: number;
    score?: number;
    applicationInfrastructureServiceId?: string;
}

export interface AppHealthUpdateApplicationAuthentications {
    id?: string;
    applicationId?: string;
    authenticationInterfaceId?: string;
    totalUsers?: number;
    score?: number;
    applicationInfrastructureServiceId?: string;
}

export interface AppHealthAuthorizationInterface {
    id: string;
    name: string;
    score: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateAuthorizationInterface {
    id: string;
    name: string;
    score: number;
}

export interface AppHealthUpdateAuthorizationInterfaceById {
    id: string;
    name?: string;
    score?: number;
}

export interface AppHealthUpdateAuthorizationInterfaces {
    id?: string;
    name?: string;
    score?: number;
}

export interface AppHealthApplicationAuthorization {
    id: string;
    applicationId: string;
    authorizationInterfaceId: string;
    totalUsers?: number;
    score: number;
    applicationInfrastructureServiceId: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateApplicationAuthorization {
    id: string;
    applicationId: string;
    authorizationInterfaceId: string;
    totalUsers?: number;
    score: number;
    applicationInfrastructureServiceId: string;
}

export interface AppHealthUpdateApplicationAuthorizationById {
    id: string;
    applicationId?: string;
    authorizationInterfaceId?: string;
    totalUsers?: number;
    score?: number;
    applicationInfrastructureServiceId?: string;
}

export interface AppHealthUpdateApplicationAuthorizations {
    id?: string;
    applicationId?: string;
    authorizationInterfaceId?: string;
    totalUsers?: number;
    score?: number;
    applicationInfrastructureServiceId?: string;
}

export interface AppHealthApplicationApi {
    id: string;
    applicationId: string;
    apiInterfaceTypeId: string;
    score: number;
    documentations?: any;
    requestsPerDay?: number;
    applicationInfrastructureServiceId: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateApplicationApi {
    id: string;
    applicationId: string;
    apiInterfaceTypeId: string;
    score: number;
    documentations?: any;
    requestsPerDay?: number;
    applicationInfrastructureServiceId: string;
}

export interface AppHealthUpdateApplicationApiById {
    id: string;
    applicationId?: string;
    apiInterfaceTypeId?: string;
    score?: number;
    documentations?: any;
    requestsPerDay?: number;
    applicationInfrastructureServiceId?: string;
}

export interface AppHealthUpdateApplicationApis {
    id?: string;
    applicationId?: string;
    apiInterfaceTypeId?: string;
    score?: number;
    documentations?: any;
    requestsPerDay?: number;
    applicationInfrastructureServiceId?: string;
}

export interface AppHealthApplicationIntegration {
    id: string;
    name: string;
    description?: string;
    sourceApplicationId: string;
    targetApplicationId?: string;
    apiInterfaceTypeId: string;
    interfaceNumbers?: number;
    modality: string;
    score: number;
    documentations?: any;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateApplicationIntegration {
    id: string;
    name: string;
    description?: string;
    sourceApplicationId: string;
    targetApplicationId?: string;
    apiInterfaceTypeId: string;
    interfaceNumbers?: number;
    modality: string;
    score: number;
    documentations?: any;
}

export interface AppHealthUpdateApplicationIntegrationById {
    id: string;
    name?: string;
    description?: string;
    sourceApplicationId?: string;
    targetApplicationId?: string;
    apiInterfaceTypeId?: string;
    interfaceNumbers?: number;
    modality?: string;
    score?: number;
    documentations?: any;
}

export interface AppHealthUpdateApplicationIntegrations {
    id?: string;
    name?: string;
    description?: string;
    sourceApplicationId?: string;
    targetApplicationId?: string;
    apiInterfaceTypeId?: string;
    interfaceNumbers?: number;
    modality?: string;
    score?: number;
    documentations?: any;
}

export interface AppHealthInfrastructureProvider {
    id: string;
    name: string;
    score: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateInfrastructureProvider {
    id: string;
    name: string;
    score: number;
}

export interface AppHealthUpdateInfrastructureProviderById {
    id: string;
    name?: string;
    score?: number;
}

export interface AppHealthUpdateInfrastructureProviders {
    id?: string;
    name?: string;
    score?: number;
}

export interface AppHealthInfrastructureService {
    id: string;
    providerId: string;
    name: string;
    score: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateInfrastructureService {
    id: string;
    providerId: string;
    name: string;
    score: number;
}

export interface AppHealthUpdateInfrastructureServiceById {
    id: string;
    providerId?: string;
    name?: string;
    score?: number;
}

export interface AppHealthUpdateInfrastructureServices {
    id?: string;
    providerId?: string;
    name?: string;
    score?: number;
}

export interface AppHealthApplicationInfrastructureService {
    id: string;
    applicationId: string;
    infrastructureServiceId: string;
    averageCostPerYear?: number;
    score: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface AppHealthCreateApplicationInfrastructureService {
    id: string;
    applicationId: string;
    infrastructureServiceId: string;
    averageCostPerYear?: number;
    score: number;
}

export interface AppHealthUpdateApplicationInfrastructureServiceById {
    id: string;
    applicationId?: string;
    infrastructureServiceId?: string;
    averageCostPerYear?: number;
    score?: number;
}

export interface AppHealthUpdateApplicationInfrastuctureServices {
    id?: string;
    applicationId?: string;
    infrastructureServiceId?: string;
    averageCostPerYear?: number;
    score?: number;
}
