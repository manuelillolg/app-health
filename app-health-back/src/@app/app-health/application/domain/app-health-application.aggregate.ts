/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AppHealthApplicationId,
    AppHealthApplicationTechnicalSolutionId,
    AppHealthApplicationName,
    AppHealthApplicationDescription,
    AppHealthApplicationBusinessImpact,
    AppHealthApplicationType,
    AppHealthApplicationReleaseDate,
    AppHealthApplicationArchitectureDiagram,
    AppHealthApplicationHasTenants,
    AppHealthApplicationHasLicensing,
    AppHealthApplicationCostLicensesPerYear,
    AppHealthApplicationRequestsPerDay,
    AppHealthApplicationCreatedAt,
    AppHealthApplicationUpdatedAt,
    AppHealthApplicationDeletedAt,
} from './value-objects';
import { AppHealthCreatedApplicationEvent } from '../application/events/app-health-created-application.event';
import { AppHealthUpdatedApplicationEvent } from '../application/events/app-health-updated-application.event';
import { AppHealthDeletedApplicationEvent } from '../application/events/app-health-deleted-application.event';
import { AppHealthTechnicalSolution } from '@app/app-health/technical-solution';
import { AppHealthApplicationView } from '@app/app-health/application-view';
import { AppHealthApplicationAuthentication } from '@app/app-health/application-authentication';
import { AppHealthApplicationAuthorization } from '@app/app-health/application-authorization';
import { AppHealthApplicationLanguage } from '@app/app-health/application-language';
import { AppHealthApplicationInfrastructureService } from '@app/app-health/application-infrastructure-service';
import { AppHealthApplicationDatabase } from '@app/app-health/application-database';
import { AppHealthApplicationApi } from '@app/app-health/application-api';
import { AppHealthApplicationIntegration } from '@app/app-health/application-integration';

export class AppHealthApplication extends AggregateRoot
{
    id: AppHealthApplicationId;
    technicalSolutionId: AppHealthApplicationTechnicalSolutionId;
    name: AppHealthApplicationName;
    description: AppHealthApplicationDescription;
    businessImpact: AppHealthApplicationBusinessImpact;
    type: AppHealthApplicationType;
    releaseDate: AppHealthApplicationReleaseDate;
    architectureDiagram: AppHealthApplicationArchitectureDiagram;
    hasTenants: AppHealthApplicationHasTenants;
    hasLicensing: AppHealthApplicationHasLicensing;
    costLicensesPerYear: AppHealthApplicationCostLicensesPerYear;
    requestsPerDay: AppHealthApplicationRequestsPerDay;
    createdAt: AppHealthApplicationCreatedAt;
    updatedAt: AppHealthApplicationUpdatedAt;
    deletedAt: AppHealthApplicationDeletedAt;

    // eager relationship
    technicalSolution: AppHealthTechnicalSolution;
    views: AppHealthApplicationView[];
    authentications: AppHealthApplicationAuthentication[];
    authorizations: AppHealthApplicationAuthorization[];
    languages: AppHealthApplicationLanguage[];
    infrastructureServices: AppHealthApplicationInfrastructureService[];
    databases: AppHealthApplicationDatabase[];
    apis: AppHealthApplicationApi[];
    integrations: AppHealthApplicationIntegration[];

    constructor(
        id: AppHealthApplicationId,
        technicalSolutionId: AppHealthApplicationTechnicalSolutionId,
        name: AppHealthApplicationName,
        description: AppHealthApplicationDescription,
        businessImpact: AppHealthApplicationBusinessImpact,
        type: AppHealthApplicationType,
        releaseDate: AppHealthApplicationReleaseDate,
        architectureDiagram: AppHealthApplicationArchitectureDiagram,
        hasTenants: AppHealthApplicationHasTenants,
        hasLicensing: AppHealthApplicationHasLicensing,
        costLicensesPerYear: AppHealthApplicationCostLicensesPerYear,
        requestsPerDay: AppHealthApplicationRequestsPerDay,
        createdAt: AppHealthApplicationCreatedAt,
        updatedAt: AppHealthApplicationUpdatedAt,
        deletedAt: AppHealthApplicationDeletedAt,

        technicalSolution?: AppHealthTechnicalSolution,
        views?: AppHealthApplicationView[],
        authentications?: AppHealthApplicationAuthentication[],
        authorizations?: AppHealthApplicationAuthorization[],
        languages?: AppHealthApplicationLanguage[],
        infrastructureServices?: AppHealthApplicationInfrastructureService[],
        databases?: AppHealthApplicationDatabase[],
        apis?: AppHealthApplicationApi[],
        integrations?: AppHealthApplicationIntegration[],
    )
    {
        super();
        this.id = id;
        this.technicalSolutionId = technicalSolutionId;
        this.name = name;
        this.description = description;
        this.businessImpact = businessImpact;
        this.type = type;
        this.releaseDate = releaseDate;
        this.architectureDiagram = architectureDiagram;
        this.hasTenants = hasTenants;
        this.hasLicensing = hasLicensing;
        this.costLicensesPerYear = costLicensesPerYear;
        this.requestsPerDay = requestsPerDay;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.technicalSolution = technicalSolution;
        this.views = views;
        this.authentications = authentications;
        this.authorizations = authorizations;
        this.languages = languages;
        this.infrastructureServices = infrastructureServices;
        this.databases = databases;
        this.apis = apis;
        this.integrations = integrations;
    }

    static register (
        id: AppHealthApplicationId,
        technicalSolutionId: AppHealthApplicationTechnicalSolutionId,
        name: AppHealthApplicationName,
        description: AppHealthApplicationDescription,
        businessImpact: AppHealthApplicationBusinessImpact,
        type: AppHealthApplicationType,
        releaseDate: AppHealthApplicationReleaseDate,
        architectureDiagram: AppHealthApplicationArchitectureDiagram,
        hasTenants: AppHealthApplicationHasTenants,
        hasLicensing: AppHealthApplicationHasLicensing,
        costLicensesPerYear: AppHealthApplicationCostLicensesPerYear,
        requestsPerDay: AppHealthApplicationRequestsPerDay,
        createdAt: AppHealthApplicationCreatedAt,
        updatedAt: AppHealthApplicationUpdatedAt,
        deletedAt: AppHealthApplicationDeletedAt,

        technicalSolution?: AppHealthTechnicalSolution,
        views?: AppHealthApplicationView[],
        authentications?: AppHealthApplicationAuthentication[],
        authorizations?: AppHealthApplicationAuthorization[],
        languages?: AppHealthApplicationLanguage[],
        infrastructureServices?: AppHealthApplicationInfrastructureService[],
        databases?: AppHealthApplicationDatabase[],
        apis?: AppHealthApplicationApi[],
        integrations?: AppHealthApplicationIntegration[],
    ): AppHealthApplication
    {
        return new AppHealthApplication(
            id,
            technicalSolutionId,
            name,
            description,
            businessImpact,
            type,
            releaseDate,
            architectureDiagram,
            hasTenants,
            hasLicensing,
            costLicensesPerYear,
            requestsPerDay,
            createdAt,
            updatedAt,
            deletedAt,

            technicalSolution,
            views,
            authentications,
            authorizations,
            languages,
            infrastructureServices,
            databases,
            apis,
            integrations,
        );
    }

    created(application: AppHealthApplication): void
    {
        this.apply(
            new AppHealthCreatedApplicationEvent(
                application.id.value,
                application.technicalSolutionId.value,
                application.name.value,
                application.description?.value,
                application.businessImpact?.value,
                application.type.value,
                application.releaseDate?.value,
                application.architectureDiagram?.value,
                application.hasTenants.value,
                application.hasLicensing.value,
                application.costLicensesPerYear?.value,
                application.requestsPerDay?.value,
                application.createdAt?.value,
                application.updatedAt?.value,
                application.deletedAt?.value,
            ),
        );
    }

    updated(application: AppHealthApplication): void
    {
        this.apply(
            new AppHealthUpdatedApplicationEvent(
                application.id?.value,
                application.technicalSolutionId?.value,
                application.name?.value,
                application.description?.value,
                application.businessImpact?.value,
                application.type?.value,
                application.releaseDate?.value,
                application.architectureDiagram?.value,
                application.hasTenants?.value,
                application.hasLicensing?.value,
                application.costLicensesPerYear?.value,
                application.requestsPerDay?.value,
                application.createdAt?.value,
                application.updatedAt?.value,
                application.deletedAt?.value,
            ),
        );
    }

    deleted(application: AppHealthApplication): void
    {
        this.apply(
            new AppHealthDeletedApplicationEvent(
                application.id.value,
                application.technicalSolutionId.value,
                application.name.value,
                application.description?.value,
                application.businessImpact?.value,
                application.type.value,
                application.releaseDate?.value,
                application.architectureDiagram?.value,
                application.hasTenants.value,
                application.hasLicensing.value,
                application.costLicensesPerYear?.value,
                application.requestsPerDay?.value,
                application.createdAt?.value,
                application.updatedAt?.value,
                application.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            technicalSolutionId: this.technicalSolutionId.value,
            name: this.name.value,
            description: this.description?.value,
            businessImpact: this.businessImpact?.value,
            type: this.type.value,
            releaseDate: this.releaseDate?.value,
            architectureDiagram: this.architectureDiagram?.value,
            hasTenants: this.hasTenants.value,
            hasLicensing: this.hasLicensing.value,
            costLicensesPerYear: this.costLicensesPerYear?.value,
            requestsPerDay: this.requestsPerDay?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            technicalSolution: this.technicalSolution?.toDTO(),
            views: this.views?.map(item => item.toDTO()),
            authentications: this.authentications?.map(item => item.toDTO()),
            authorizations: this.authorizations?.map(item => item.toDTO()),
            languages: this.languages?.map(item => item.toDTO()),
            infrastructureServices: this.infrastructureServices?.map(item => item.toDTO()),
            databases: this.databases?.map(item => item.toDTO()),
            apis: this.apis?.map(item => item.toDTO()),
            integrations: this.integrations?.map(item => item.toDTO()),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            technicalSolutionId: this.technicalSolutionId.value,
            name: this.name.value,
            description: this.description?.value,
            businessImpact: this.businessImpact?.value,
            type: this.type.value,
            releaseDate: this.releaseDate?.value,
            architectureDiagram: this.architectureDiagram?.value,
            hasTenants: this.hasTenants.value,
            hasLicensing: this.hasLicensing.value,
            costLicensesPerYear: this.costLicensesPerYear?.value,
            requestsPerDay: this.requestsPerDay?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            technicalSolution: this.technicalSolution?.toDTO(),
            views: this.views?.map(item => item.toDTO()),
            authentications: this.authentications?.map(item => item.toDTO()),
            authorizations: this.authorizations?.map(item => item.toDTO()),
            languages: this.languages?.map(item => item.toDTO()),
            infrastructureServices: this.infrastructureServices?.map(item => item.toDTO()),
            databases: this.databases?.map(item => item.toDTO()),
            apis: this.apis?.map(item => item.toDTO()),
            integrations: this.integrations?.map(item => item.toDTO()),
        };
    }
}
