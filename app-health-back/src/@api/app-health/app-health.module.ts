import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { AppHealthSeeder } from './app-health.seeder';
import { AppHealthModels, AppHealthHandlers, AppHealthServices, AppHealthRepositories, AppHealthSagas } from '../../@app/app-health';
import { AppHealthTechnicalSolutionControllers, AppHealthTechnicalSolutionResolvers, AppHealthTechnicalSolutionApiHandlers, AppHealthTechnicalSolutionServices } from './technical-solution';
import { AppHealthCustomerControllers, AppHealthCustomerResolvers, AppHealthCustomerApiHandlers, AppHealthCustomerServices } from './customer';
import { AppHealthApplicationControllers, AppHealthApplicationResolvers, AppHealthApplicationApiHandlers, AppHealthApplicationServices } from './application';
import { AppHealthInfrastructureProviderControllers, AppHealthInfrastructureProviderResolvers, AppHealthInfrastructureProviderApiHandlers, AppHealthInfrastructureProviderServices } from './infrastructure-provider';
import { AppHealthInfrastructureServiceControllers, AppHealthInfrastructureServiceResolvers, AppHealthInfrastructureServiceApiHandlers, AppHealthInfrastructureServiceServices } from './infrastructure-service';
import { AppHealthApplicationInfrastructureServiceControllers, AppHealthApplicationInfrastructureServiceResolvers, AppHealthApplicationInfrastructureServiceApiHandlers, AppHealthApplicationInfrastructureServiceServices } from './application-infrastructure-service';
import { AppHealthApplicationViewControllers, AppHealthApplicationViewResolvers, AppHealthApplicationViewApiHandlers, AppHealthApplicationViewServices } from './application-view';
import { AppHealthDatabaseControllers, AppHealthDatabaseResolvers, AppHealthDatabaseApiHandlers, AppHealthDatabaseServices } from './database';
import { AppHealthApplicationDatabaseControllers, AppHealthApplicationDatabaseResolvers, AppHealthApplicationDatabaseApiHandlers, AppHealthApplicationDatabaseServices } from './application-database';
import { AppHealthLanguageControllers, AppHealthLanguageResolvers, AppHealthLanguageApiHandlers, AppHealthLanguageServices } from './language';
import { AppHealthApplicationLanguageControllers, AppHealthApplicationLanguageResolvers, AppHealthApplicationLanguageApiHandlers, AppHealthApplicationLanguageServices } from './application-language';
import { AppHealthAuthenticationInterfaceControllers, AppHealthAuthenticationInterfaceResolvers, AppHealthAuthenticationInterfaceApiHandlers, AppHealthAuthenticationInterfaceServices } from './authentication-interface';
import { AppHealthApplicationAuthenticationControllers, AppHealthApplicationAuthenticationResolvers, AppHealthApplicationAuthenticationApiHandlers, AppHealthApplicationAuthenticationServices } from './application-authentication';
import { AppHealthAuthorizationInterfaceControllers, AppHealthAuthorizationInterfaceResolvers, AppHealthAuthorizationInterfaceApiHandlers, AppHealthAuthorizationInterfaceServices } from './authorization-interface';
import { AppHealthApplicationAuthorizationControllers, AppHealthApplicationAuthorizationResolvers, AppHealthApplicationAuthorizationApiHandlers, AppHealthApplicationAuthorizationServices } from './application-authorization';
import { AppHealthApiInterfaceTypeControllers, AppHealthApiInterfaceTypeResolvers, AppHealthApiInterfaceTypeApiHandlers, AppHealthApiInterfaceTypeServices } from './api-interface-type';
import { AppHealthApplicationApiControllers, AppHealthApplicationApiResolvers, AppHealthApplicationApiApiHandlers, AppHealthApplicationApiServices } from './application-api';
import { AppHealthApplicationIntegrationControllers, AppHealthApplicationIntegrationResolvers, AppHealthApplicationIntegrationApiHandlers, AppHealthApplicationIntegrationServices } from './application-integration';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...AppHealthModels
            ])
    ],
    controllers: [
        ...AppHealthTechnicalSolutionControllers,
        ...AppHealthCustomerControllers,
        ...AppHealthApplicationControllers,
        ...AppHealthInfrastructureProviderControllers,
        ...AppHealthInfrastructureServiceControllers,
        ...AppHealthApplicationInfrastructureServiceControllers,
        ...AppHealthApplicationViewControllers,
        ...AppHealthDatabaseControllers,
        ...AppHealthApplicationDatabaseControllers,
        ...AppHealthLanguageControllers,
        ...AppHealthApplicationLanguageControllers,
        ...AppHealthAuthenticationInterfaceControllers,
        ...AppHealthApplicationAuthenticationControllers,
        ...AppHealthAuthorizationInterfaceControllers,
        ...AppHealthApplicationAuthorizationControllers,
        ...AppHealthApiInterfaceTypeControllers,
        ...AppHealthApplicationApiControllers,
        ...AppHealthApplicationIntegrationControllers
    ],
    providers: [
        AppHealthSeeder,
        ...AppHealthHandlers,
        ...AppHealthServices,
        ...AppHealthRepositories,
        ...AppHealthSagas,
        ...AppHealthTechnicalSolutionResolvers,
        ...AppHealthTechnicalSolutionApiHandlers,
        ...AppHealthTechnicalSolutionServices,
        ...AppHealthCustomerResolvers,
        ...AppHealthCustomerApiHandlers,
        ...AppHealthCustomerServices,
        ...AppHealthApplicationResolvers,
        ...AppHealthApplicationApiHandlers,
        ...AppHealthApplicationServices,
        ...AppHealthInfrastructureProviderResolvers,
        ...AppHealthInfrastructureProviderApiHandlers,
        ...AppHealthInfrastructureProviderServices,
        ...AppHealthInfrastructureServiceResolvers,
        ...AppHealthInfrastructureServiceApiHandlers,
        ...AppHealthInfrastructureServiceServices,
        ...AppHealthApplicationInfrastructureServiceResolvers,
        ...AppHealthApplicationInfrastructureServiceApiHandlers,
        ...AppHealthApplicationInfrastructureServiceServices,
        ...AppHealthApplicationViewResolvers,
        ...AppHealthApplicationViewApiHandlers,
        ...AppHealthApplicationViewServices,
        ...AppHealthDatabaseResolvers,
        ...AppHealthDatabaseApiHandlers,
        ...AppHealthDatabaseServices,
        ...AppHealthApplicationDatabaseResolvers,
        ...AppHealthApplicationDatabaseApiHandlers,
        ...AppHealthApplicationDatabaseServices,
        ...AppHealthLanguageResolvers,
        ...AppHealthLanguageApiHandlers,
        ...AppHealthLanguageServices,
        ...AppHealthApplicationLanguageResolvers,
        ...AppHealthApplicationLanguageApiHandlers,
        ...AppHealthApplicationLanguageServices,
        ...AppHealthAuthenticationInterfaceResolvers,
        ...AppHealthAuthenticationInterfaceApiHandlers,
        ...AppHealthAuthenticationInterfaceServices,
        ...AppHealthApplicationAuthenticationResolvers,
        ...AppHealthApplicationAuthenticationApiHandlers,
        ...AppHealthApplicationAuthenticationServices,
        ...AppHealthAuthorizationInterfaceResolvers,
        ...AppHealthAuthorizationInterfaceApiHandlers,
        ...AppHealthAuthorizationInterfaceServices,
        ...AppHealthApplicationAuthorizationResolvers,
        ...AppHealthApplicationAuthorizationApiHandlers,
        ...AppHealthApplicationAuthorizationServices,
        ...AppHealthApiInterfaceTypeResolvers,
        ...AppHealthApiInterfaceTypeApiHandlers,
        ...AppHealthApiInterfaceTypeServices,
        ...AppHealthApplicationApiResolvers,
        ...AppHealthApplicationApiApiHandlers,
        ...AppHealthApplicationApiServices,
        ...AppHealthApplicationIntegrationResolvers,
        ...AppHealthApplicationIntegrationApiHandlers,
        ...AppHealthApplicationIntegrationServices
    ],
})
export class AppHealthModule {}
