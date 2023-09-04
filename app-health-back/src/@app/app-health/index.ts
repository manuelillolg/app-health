import { AppHealthTechnicalSolutionHandlers, AppHealthTechnicalSolutionServices, AppHealthTechnicalSolutionModel, AppHealthITechnicalSolutionRepository, AppHealthSequelizeTechnicalSolutionRepository, AppHealthTechnicalSolutionSagas } from './technical-solution';
import { AppHealthCustomerHandlers, AppHealthCustomerServices, AppHealthCustomerModel, AppHealthICustomerRepository, AppHealthSequelizeCustomerRepository, AppHealthCustomerSagas } from './customer';
import { AppHealthApplicationHandlers, AppHealthApplicationServices, AppHealthApplicationModel, AppHealthIApplicationRepository, AppHealthSequelizeApplicationRepository, AppHealthApplicationSagas } from './application';
import { AppHealthInfrastructureProviderHandlers, AppHealthInfrastructureProviderServices, AppHealthInfrastructureProviderModel, AppHealthIInfrastructureProviderRepository, AppHealthSequelizeInfrastructureProviderRepository, AppHealthInfrastructureProviderSagas } from './infrastructure-provider';
import { AppHealthInfrastructureServiceHandlers, AppHealthInfrastructureServiceServices, AppHealthInfrastructureServiceModel, AppHealthIInfrastructureServiceRepository, AppHealthSequelizeInfrastructureServiceRepository, AppHealthInfrastructureServiceSagas } from './infrastructure-service';
import { AppHealthApplicationInfrastructureServiceHandlers, AppHealthApplicationInfrastructureServiceServices, AppHealthApplicationInfrastructureServiceModel, AppHealthIApplicationInfrastructureServiceRepository, AppHealthSequelizeApplicationInfrastructureServiceRepository, AppHealthApplicationInfrastructureServiceSagas } from './application-infrastructure-service';
import { AppHealthApplicationViewHandlers, AppHealthApplicationViewServices, AppHealthApplicationViewModel, AppHealthIApplicationViewRepository, AppHealthSequelizeApplicationViewRepository, AppHealthApplicationViewSagas } from './application-view';
import { AppHealthDatabaseHandlers, AppHealthDatabaseServices, AppHealthDatabaseModel, AppHealthIDatabaseRepository, AppHealthSequelizeDatabaseRepository, AppHealthDatabaseSagas } from './database';
import { AppHealthApplicationDatabaseHandlers, AppHealthApplicationDatabaseServices, AppHealthApplicationDatabaseModel, AppHealthIApplicationDatabaseRepository, AppHealthSequelizeApplicationDatabaseRepository, AppHealthApplicationDatabaseSagas } from './application-database';
import { AppHealthLanguageHandlers, AppHealthLanguageServices, AppHealthLanguageModel, AppHealthILanguageRepository, AppHealthSequelizeLanguageRepository, AppHealthLanguageSagas } from './language';
import { AppHealthApplicationLanguageHandlers, AppHealthApplicationLanguageServices, AppHealthApplicationLanguageModel, AppHealthIApplicationLanguageRepository, AppHealthSequelizeApplicationLanguageRepository, AppHealthApplicationLanguageSagas } from './application-language';
import { AppHealthAuthenticationInterfaceHandlers, AppHealthAuthenticationInterfaceServices, AppHealthAuthenticationInterfaceModel, AppHealthIAuthenticationInterfaceRepository, AppHealthSequelizeAuthenticationInterfaceRepository, AppHealthAuthenticationInterfaceSagas } from './authentication-interface';
import { AppHealthApplicationAuthenticationHandlers, AppHealthApplicationAuthenticationServices, AppHealthApplicationAuthenticationModel, AppHealthIApplicationAuthenticationRepository, AppHealthSequelizeApplicationAuthenticationRepository, AppHealthApplicationAuthenticationSagas } from './application-authentication';
import { AppHealthAuthorizationInterfaceHandlers, AppHealthAuthorizationInterfaceServices, AppHealthAuthorizationInterfaceModel, AppHealthIAuthorizationInterfaceRepository, AppHealthSequelizeAuthorizationInterfaceRepository, AppHealthAuthorizationInterfaceSagas } from './authorization-interface';
import { AppHealthApplicationAuthorizationHandlers, AppHealthApplicationAuthorizationServices, AppHealthApplicationAuthorizationModel, AppHealthIApplicationAuthorizationRepository, AppHealthSequelizeApplicationAuthorizationRepository, AppHealthApplicationAuthorizationSagas } from './application-authorization';
import { AppHealthApiInterfaceTypeHandlers, AppHealthApiInterfaceTypeServices, AppHealthApiInterfaceTypeModel, AppHealthIApiInterfaceTypeRepository, AppHealthSequelizeApiInterfaceTypeRepository, AppHealthApiInterfaceTypeSagas } from './api-interface-type';
import { AppHealthApplicationApiHandlers, AppHealthApplicationApiServices, AppHealthApplicationApiModel, AppHealthIApplicationApiRepository, AppHealthSequelizeApplicationApiRepository, AppHealthApplicationApiSagas } from './application-api';
import { AppHealthApplicationIntegrationHandlers, AppHealthApplicationIntegrationServices, AppHealthApplicationIntegrationModel, AppHealthIApplicationIntegrationRepository, AppHealthSequelizeApplicationIntegrationRepository, AppHealthApplicationIntegrationSagas } from './application-integration';

export const AppHealthHandlers = [
    ...AppHealthTechnicalSolutionHandlers,
    ...AppHealthCustomerHandlers,
    ...AppHealthApplicationHandlers,
    ...AppHealthInfrastructureProviderHandlers,
    ...AppHealthInfrastructureServiceHandlers,
    ...AppHealthApplicationInfrastructureServiceHandlers,
    ...AppHealthApplicationViewHandlers,
    ...AppHealthDatabaseHandlers,
    ...AppHealthApplicationDatabaseHandlers,
    ...AppHealthLanguageHandlers,
    ...AppHealthApplicationLanguageHandlers,
    ...AppHealthAuthenticationInterfaceHandlers,
    ...AppHealthApplicationAuthenticationHandlers,
    ...AppHealthAuthorizationInterfaceHandlers,
    ...AppHealthApplicationAuthorizationHandlers,
    ...AppHealthApiInterfaceTypeHandlers,
    ...AppHealthApplicationApiHandlers,
    ...AppHealthApplicationIntegrationHandlers
];
export const AppHealthServices = [
    ...AppHealthTechnicalSolutionServices,
    ...AppHealthCustomerServices,
    ...AppHealthApplicationServices,
    ...AppHealthInfrastructureProviderServices,
    ...AppHealthInfrastructureServiceServices,
    ...AppHealthApplicationInfrastructureServiceServices,
    ...AppHealthApplicationViewServices,
    ...AppHealthDatabaseServices,
    ...AppHealthApplicationDatabaseServices,
    ...AppHealthLanguageServices,
    ...AppHealthApplicationLanguageServices,
    ...AppHealthAuthenticationInterfaceServices,
    ...AppHealthApplicationAuthenticationServices,
    ...AppHealthAuthorizationInterfaceServices,
    ...AppHealthApplicationAuthorizationServices,
    ...AppHealthApiInterfaceTypeServices,
    ...AppHealthApplicationApiServices,
    ...AppHealthApplicationIntegrationServices
];
export const AppHealthModels = [
    AppHealthTechnicalSolutionModel,
    AppHealthCustomerModel,
    AppHealthApplicationModel,
    AppHealthInfrastructureProviderModel,
    AppHealthInfrastructureServiceModel,
    AppHealthApplicationInfrastructureServiceModel,
    AppHealthApplicationViewModel,
    AppHealthDatabaseModel,
    AppHealthApplicationDatabaseModel,
    AppHealthLanguageModel,
    AppHealthApplicationLanguageModel,
    AppHealthAuthenticationInterfaceModel,
    AppHealthApplicationAuthenticationModel,
    AppHealthAuthorizationInterfaceModel,
    AppHealthApplicationAuthorizationModel,
    AppHealthApiInterfaceTypeModel,
    AppHealthApplicationApiModel,
    AppHealthApplicationIntegrationModel
];
export const AppHealthRepositories = [
    {
        provide : AppHealthITechnicalSolutionRepository,
        useClass: AppHealthSequelizeTechnicalSolutionRepository
    },
    {
        provide : AppHealthICustomerRepository,
        useClass: AppHealthSequelizeCustomerRepository
    },
    {
        provide : AppHealthIApplicationRepository,
        useClass: AppHealthSequelizeApplicationRepository
    },
    {
        provide : AppHealthIInfrastructureProviderRepository,
        useClass: AppHealthSequelizeInfrastructureProviderRepository
    },
    {
        provide : AppHealthIInfrastructureServiceRepository,
        useClass: AppHealthSequelizeInfrastructureServiceRepository
    },
    {
        provide : AppHealthIApplicationInfrastructureServiceRepository,
        useClass: AppHealthSequelizeApplicationInfrastructureServiceRepository
    },
    {
        provide : AppHealthIApplicationViewRepository,
        useClass: AppHealthSequelizeApplicationViewRepository
    },
    {
        provide : AppHealthIDatabaseRepository,
        useClass: AppHealthSequelizeDatabaseRepository
    },
    {
        provide : AppHealthIApplicationDatabaseRepository,
        useClass: AppHealthSequelizeApplicationDatabaseRepository
    },
    {
        provide : AppHealthILanguageRepository,
        useClass: AppHealthSequelizeLanguageRepository
    },
    {
        provide : AppHealthIApplicationLanguageRepository,
        useClass: AppHealthSequelizeApplicationLanguageRepository
    },
    {
        provide : AppHealthIAuthenticationInterfaceRepository,
        useClass: AppHealthSequelizeAuthenticationInterfaceRepository
    },
    {
        provide : AppHealthIApplicationAuthenticationRepository,
        useClass: AppHealthSequelizeApplicationAuthenticationRepository
    },
    {
        provide : AppHealthIAuthorizationInterfaceRepository,
        useClass: AppHealthSequelizeAuthorizationInterfaceRepository
    },
    {
        provide : AppHealthIApplicationAuthorizationRepository,
        useClass: AppHealthSequelizeApplicationAuthorizationRepository
    },
    {
        provide : AppHealthIApiInterfaceTypeRepository,
        useClass: AppHealthSequelizeApiInterfaceTypeRepository
    },
    {
        provide : AppHealthIApplicationApiRepository,
        useClass: AppHealthSequelizeApplicationApiRepository
    },
    {
        provide : AppHealthIApplicationIntegrationRepository,
        useClass: AppHealthSequelizeApplicationIntegrationRepository
    }
];
export const AppHealthSagas = [
    AppHealthTechnicalSolutionSagas,
    AppHealthCustomerSagas,
    AppHealthApplicationSagas,
    AppHealthInfrastructureProviderSagas,
    AppHealthInfrastructureServiceSagas,
    AppHealthApplicationInfrastructureServiceSagas,
    AppHealthApplicationViewSagas,
    AppHealthDatabaseSagas,
    AppHealthApplicationDatabaseSagas,
    AppHealthLanguageSagas,
    AppHealthApplicationLanguageSagas,
    AppHealthAuthenticationInterfaceSagas,
    AppHealthApplicationAuthenticationSagas,
    AppHealthAuthorizationInterfaceSagas,
    AppHealthApplicationAuthorizationSagas,
    AppHealthApiInterfaceTypeSagas,
    AppHealthApplicationApiSagas,
    AppHealthApplicationIntegrationSagas
];
