/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { AppHealthComponent } from './app-health.component';
import { ApiInterfaceTypeListComponent } from './api-interface-type/api-interface-type-list.component';
import { ApiInterfaceTypeDetailComponent } from './api-interface-type/api-interface-type-detail.component';
import { apiInterfaceTypeEditResolver, apiInterfaceTypeNewResolver, apiInterfaceTypePaginationResolver } from './api-interface-type/api-interface-type.resolvers';
import { CustomerListComponent } from './customer/customer-list.component';
import { CustomerDetailComponent } from './customer/customer-detail.component';
import { customerEditResolver, customerNewResolver, customerPaginationResolver } from './customer/customer.resolvers';
import { TechnicalSolutionListComponent } from './technical-solution/technical-solution-list.component';
import { TechnicalSolutionDetailComponent } from './technical-solution/technical-solution-detail.component';
import { technicalSolutionEditResolver, technicalSolutionNewResolver, technicalSolutionPaginationResolver } from './technical-solution/technical-solution.resolvers';
import { ApplicationListComponent } from './application/application-list.component';
import { ApplicationDetailComponent } from './application/application-detail.component';
import { applicationEditResolver, applicationNewResolver, applicationPaginationResolver } from './application/application.resolvers';
import { ApplicationViewListComponent } from './application-view/application-view-list.component';
import { ApplicationViewDetailComponent } from './application-view/application-view-detail.component';
import { applicationViewEditResolver, applicationViewNewResolver, applicationViewPaginationResolver } from './application-view/application-view.resolvers';
import { DatabaseListComponent } from './database/database-list.component';
import { DatabaseDetailComponent } from './database/database-detail.component';
import { databaseEditResolver, databaseNewResolver, databasePaginationResolver } from './database/database.resolvers';
import { ApplicationDatabaseListComponent } from './application-database/application-database-list.component';
import { ApplicationDatabaseDetailComponent } from './application-database/application-database-detail.component';
import { applicationDatabaseEditResolver, applicationDatabaseNewResolver, applicationDatabasePaginationResolver } from './application-database/application-database.resolvers';
import { LanguageListComponent } from './language/language-list.component';
import { LanguageDetailComponent } from './language/language-detail.component';
import { languageEditResolver, languageNewResolver, languagePaginationResolver } from './language/language.resolvers';
import { ApplicationLanguageListComponent } from './application-language/application-language-list.component';
import { ApplicationLanguageDetailComponent } from './application-language/application-language-detail.component';
import { applicationLanguageEditResolver, applicationLanguageNewResolver, applicationLanguagePaginationResolver } from './application-language/application-language.resolvers';
import { AuthenticationInterfaceListComponent } from './authentication-interface/authentication-interface-list.component';
import { AuthenticationInterfaceDetailComponent } from './authentication-interface/authentication-interface-detail.component';
import { authenticationInterfaceEditResolver, authenticationInterfaceNewResolver, authenticationInterfacePaginationResolver } from './authentication-interface/authentication-interface.resolvers';
import { ApplicationAuthenticationListComponent } from './application-authentication/application-authentication-list.component';
import { ApplicationAuthenticationDetailComponent } from './application-authentication/application-authentication-detail.component';
import { applicationAuthenticationEditResolver, applicationAuthenticationNewResolver, applicationAuthenticationPaginationResolver } from './application-authentication/application-authentication.resolvers';
import { AuthorizationInterfaceListComponent } from './authorization-interface/authorization-interface-list.component';
import { AuthorizationInterfaceDetailComponent } from './authorization-interface/authorization-interface-detail.component';
import { authorizationInterfaceEditResolver, authorizationInterfaceNewResolver, authorizationInterfacePaginationResolver } from './authorization-interface/authorization-interface.resolvers';
import { ApplicationAuthorizationListComponent } from './application-authorization/application-authorization-list.component';
import { ApplicationAuthorizationDetailComponent } from './application-authorization/application-authorization-detail.component';
import { applicationAuthorizationEditResolver, applicationAuthorizationNewResolver, applicationAuthorizationPaginationResolver } from './application-authorization/application-authorization.resolvers';
import { ApplicationApiListComponent } from './application-api/application-api-list.component';
import { ApplicationApiDetailComponent } from './application-api/application-api-detail.component';
import { applicationApiEditResolver, applicationApiNewResolver, applicationApiPaginationResolver } from './application-api/application-api.resolvers';
import { ApplicationIntegrationListComponent } from './application-integration/application-integration-list.component';
import { ApplicationIntegrationDetailComponent } from './application-integration/application-integration-detail.component';
import { applicationIntegrationEditResolver, applicationIntegrationNewResolver, applicationIntegrationPaginationResolver } from './application-integration/application-integration.resolvers';
import { InfrastructureProviderListComponent } from './infrastructure-provider/infrastructure-provider-list.component';
import { InfrastructureProviderDetailComponent } from './infrastructure-provider/infrastructure-provider-detail.component';
import { infrastructureProviderEditResolver, infrastructureProviderNewResolver, infrastructureProviderPaginationResolver } from './infrastructure-provider/infrastructure-provider.resolvers';
import { InfrastructureServiceListComponent } from './infrastructure-service/infrastructure-service-list.component';
import { InfrastructureServiceDetailComponent } from './infrastructure-service/infrastructure-service-detail.component';
import { infrastructureServiceEditResolver, infrastructureServiceNewResolver, infrastructureServicePaginationResolver } from './infrastructure-service/infrastructure-service.resolvers';
import { ApplicationInfrastructureServiceListComponent } from './application-infrastructure-service/application-infrastructure-service-list.component';
import { ApplicationInfrastructureServiceDetailComponent } from './application-infrastructure-service/application-infrastructure-service-detail.component';
import { applicationInfrastructureServiceEditResolver, applicationInfrastructureServiceNewResolver, applicationInfrastructureServicePaginationResolver } from './application-infrastructure-service/application-infrastructure-service.resolvers';

export default [
    {
        path     : '',
        component: AppHealthComponent,
        children : [
            { path: 'api-interface-type', component: ApiInterfaceTypeListComponent, resolve: { data: apiInterfaceTypePaginationResolver }, data: { permission: 'appHealth.apiInterfaceType.get' }},
            { path: 'api-interface-type/new', component: ApiInterfaceTypeDetailComponent, resolve: { data: apiInterfaceTypeNewResolver }, data: { permission: 'appHealth.apiInterfaceType.create' }},
            { path: 'api-interface-type/edit/:id', component: ApiInterfaceTypeDetailComponent, resolve: { data: apiInterfaceTypeEditResolver }, data: { permission: 'appHealth.apiInterfaceType.get' }},
            { path: 'customer', component: CustomerListComponent, resolve: { data: customerPaginationResolver }, data: { permission: 'appHealth.customer.get' }},
            { path: 'customer/new', component: CustomerDetailComponent, resolve: { data: customerNewResolver }, data: { permission: 'appHealth.customer.create' }},
            { path: 'customer/edit/:id', component: CustomerDetailComponent, resolve: { data: customerEditResolver }, data: { permission: 'appHealth.customer.get' }},
            { path: 'technical-solution', component: TechnicalSolutionListComponent, resolve: { data: technicalSolutionPaginationResolver }, data: { permission: 'appHealth.technicalSolution.get' }},
            { path: 'technical-solution/new', component: TechnicalSolutionDetailComponent, resolve: { data: technicalSolutionNewResolver }, data: { permission: 'appHealth.technicalSolution.create' }},
            { path: 'technical-solution/edit/:id', component: TechnicalSolutionDetailComponent, resolve: { data: technicalSolutionEditResolver }, data: { permission: 'appHealth.technicalSolution.get' }},
            { path: 'application', component: ApplicationListComponent, resolve: { data: applicationPaginationResolver }, data: { permission: 'appHealth.application.get' }},
            { path: 'application/new', component: ApplicationDetailComponent, resolve: { data: applicationNewResolver }, data: { permission: 'appHealth.application.create' }},
            { path: 'application/edit/:id', component: ApplicationDetailComponent, resolve: { data: applicationEditResolver }, data: { permission: 'appHealth.application.get' }},
            { path: 'application-view', component: ApplicationViewListComponent, resolve: { data: applicationViewPaginationResolver }, data: { permission: 'appHealth.applicationView.get' }},
            { path: 'application-view/new', component: ApplicationViewDetailComponent, resolve: { data: applicationViewNewResolver }, data: { permission: 'appHealth.applicationView.create' }},
            { path: 'application-view/edit/:id', component: ApplicationViewDetailComponent, resolve: { data: applicationViewEditResolver }, data: { permission: 'appHealth.applicationView.get' }},
            { path: 'database', component: DatabaseListComponent, resolve: { data: databasePaginationResolver }, data: { permission: 'appHealth.database.get' }},
            { path: 'database/new', component: DatabaseDetailComponent, resolve: { data: databaseNewResolver }, data: { permission: 'appHealth.database.create' }},
            { path: 'database/edit/:id', component: DatabaseDetailComponent, resolve: { data: databaseEditResolver }, data: { permission: 'appHealth.database.get' }},
            { path: 'application-database', component: ApplicationDatabaseListComponent, resolve: { data: applicationDatabasePaginationResolver }, data: { permission: 'appHealth.applicationDatabase.get' }},
            { path: 'application-database/new', component: ApplicationDatabaseDetailComponent, resolve: { data: applicationDatabaseNewResolver }, data: { permission: 'appHealth.applicationDatabase.create' }},
            { path: 'application-database/edit/:id', component: ApplicationDatabaseDetailComponent, resolve: { data: applicationDatabaseEditResolver }, data: { permission: 'appHealth.applicationDatabase.get' }},
            { path: 'language', component: LanguageListComponent, resolve: { data: languagePaginationResolver }, data: { permission: 'appHealth.language.get' }},
            { path: 'language/new', component: LanguageDetailComponent, resolve: { data: languageNewResolver }, data: { permission: 'appHealth.language.create' }},
            { path: 'language/edit/:id', component: LanguageDetailComponent, resolve: { data: languageEditResolver }, data: { permission: 'appHealth.language.get' }},
            { path: 'application-language', component: ApplicationLanguageListComponent, resolve: { data: applicationLanguagePaginationResolver }, data: { permission: 'appHealth.applicationLanguage.get' }},
            { path: 'application-language/new', component: ApplicationLanguageDetailComponent, resolve: { data: applicationLanguageNewResolver }, data: { permission: 'appHealth.applicationLanguage.create' }},
            { path: 'application-language/edit/:id', component: ApplicationLanguageDetailComponent, resolve: { data: applicationLanguageEditResolver }, data: { permission: 'appHealth.applicationLanguage.get' }},
            { path: 'authentication-interface', component: AuthenticationInterfaceListComponent, resolve: { data: authenticationInterfacePaginationResolver }, data: { permission: 'appHealth.authenticationInterface.get' }},
            { path: 'authentication-interface/new', component: AuthenticationInterfaceDetailComponent, resolve: { data: authenticationInterfaceNewResolver }, data: { permission: 'appHealth.authenticationInterface.create' }},
            { path: 'authentication-interface/edit/:id', component: AuthenticationInterfaceDetailComponent, resolve: { data: authenticationInterfaceEditResolver }, data: { permission: 'appHealth.authenticationInterface.get' }},
            { path: 'application-authentication', component: ApplicationAuthenticationListComponent, resolve: { data: applicationAuthenticationPaginationResolver }, data: { permission: 'appHealth.applicationAuthentication.get' }},
            { path: 'application-authentication/new', component: ApplicationAuthenticationDetailComponent, resolve: { data: applicationAuthenticationNewResolver }, data: { permission: 'appHealth.applicationAuthentication.create' }},
            { path: 'application-authentication/edit/:id', component: ApplicationAuthenticationDetailComponent, resolve: { data: applicationAuthenticationEditResolver }, data: { permission: 'appHealth.applicationAuthentication.get' }},
            { path: 'authorization-interface', component: AuthorizationInterfaceListComponent, resolve: { data: authorizationInterfacePaginationResolver }, data: { permission: 'appHealth.authorizationInterface.get' }},
            { path: 'authorization-interface/new', component: AuthorizationInterfaceDetailComponent, resolve: { data: authorizationInterfaceNewResolver }, data: { permission: 'appHealth.authorizationInterface.create' }},
            { path: 'authorization-interface/edit/:id', component: AuthorizationInterfaceDetailComponent, resolve: { data: authorizationInterfaceEditResolver }, data: { permission: 'appHealth.authorizationInterface.get' }},
            { path: 'application-authorization', component: ApplicationAuthorizationListComponent, resolve: { data: applicationAuthorizationPaginationResolver }, data: { permission: 'appHealth.applicationAuthorization.get' }},
            { path: 'application-authorization/new', component: ApplicationAuthorizationDetailComponent, resolve: { data: applicationAuthorizationNewResolver }, data: { permission: 'appHealth.applicationAuthorization.create' }},
            { path: 'application-authorization/edit/:id', component: ApplicationAuthorizationDetailComponent, resolve: { data: applicationAuthorizationEditResolver }, data: { permission: 'appHealth.applicationAuthorization.get' }},
            { path: 'application-api', component: ApplicationApiListComponent, resolve: { data: applicationApiPaginationResolver }, data: { permission: 'appHealth.applicationApi.get' }},
            { path: 'application-api/new', component: ApplicationApiDetailComponent, resolve: { data: applicationApiNewResolver }, data: { permission: 'appHealth.applicationApi.create' }},
            { path: 'application-api/edit/:id', component: ApplicationApiDetailComponent, resolve: { data: applicationApiEditResolver }, data: { permission: 'appHealth.applicationApi.get' }},
            { path: 'application-integration', component: ApplicationIntegrationListComponent, resolve: { data: applicationIntegrationPaginationResolver }, data: { permission: 'appHealth.applicationIntegration.get' }},
            { path: 'application-integration/new', component: ApplicationIntegrationDetailComponent, resolve: { data: applicationIntegrationNewResolver }, data: { permission: 'appHealth.applicationIntegration.create' }},
            { path: 'application-integration/edit/:id', component: ApplicationIntegrationDetailComponent, resolve: { data: applicationIntegrationEditResolver }, data: { permission: 'appHealth.applicationIntegration.get' }},
            { path: 'infrastructure-provider', component: InfrastructureProviderListComponent, resolve: { data: infrastructureProviderPaginationResolver }, data: { permission: 'appHealth.infrastructureProvider.get' }},
            { path: 'infrastructure-provider/new', component: InfrastructureProviderDetailComponent, resolve: { data: infrastructureProviderNewResolver }, data: { permission: 'appHealth.infrastructureProvider.create' }},
            { path: 'infrastructure-provider/edit/:id', component: InfrastructureProviderDetailComponent, resolve: { data: infrastructureProviderEditResolver }, data: { permission: 'appHealth.infrastructureProvider.get' }},
            { path: 'infrastructure-service', component: InfrastructureServiceListComponent, resolve: { data: infrastructureServicePaginationResolver }, data: { permission: 'appHealth.infrastructureService.get' }},
            { path: 'infrastructure-service/new', component: InfrastructureServiceDetailComponent, resolve: { data: infrastructureServiceNewResolver }, data: { permission: 'appHealth.infrastructureService.create' }},
            { path: 'infrastructure-service/edit/:id', component: InfrastructureServiceDetailComponent, resolve: { data: infrastructureServiceEditResolver }, data: { permission: 'appHealth.infrastructureService.get' }},
            { path: 'application-infrastructure-service', component: ApplicationInfrastructureServiceListComponent, resolve: { data: applicationInfrastructureServicePaginationResolver }, data: { permission: 'appHealth.applicationInfrastructureService.get' }},
            { path: 'application-infrastructure-service/new', component: ApplicationInfrastructureServiceDetailComponent, resolve: { data: applicationInfrastructureServiceNewResolver }, data: { permission: 'appHealth.applicationInfrastructureService.create' }},
            { path: 'application-infrastructure-service/edit/:id', component: ApplicationInfrastructureServiceDetailComponent, resolve: { data: applicationInfrastructureServiceEditResolver }, data: { permission: 'appHealth.applicationInfrastructureService.get' }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'app-health',
                multi   : true,
            },
        ],
    },
];
