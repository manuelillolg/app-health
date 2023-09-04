import { AppHealthAddApplicationsContextEvent, AppHealthApplication, AppHealthIApplicationRepository } from '@app/app-health/application';
import {
    AppHealthApplicationArchitectureDiagram,
    AppHealthApplicationBusinessImpact,
    AppHealthApplicationCostLicensesPerYear,
    AppHealthApplicationCreatedAt,
    AppHealthApplicationDeletedAt,
    AppHealthApplicationDescription,
    AppHealthApplicationHasLicensing,
    AppHealthApplicationHasTenants,
    AppHealthApplicationId,
    AppHealthApplicationName,
    AppHealthApplicationReleaseDate,
    AppHealthApplicationRequestsPerDay,
    AppHealthApplicationTechnicalSolutionId,
    AppHealthApplicationType,
    AppHealthApplicationUpdatedAt,
} from '@app/app-health/application/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateApplicationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationRepository,
    ) {}

    async main(
        applications: {
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
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateApplications = applications.map(application => AppHealthApplication.register(
            application.id,
            application.technicalSolutionId,
            application.name,
            application.description,
            application.businessImpact,
            application.type,
            application.releaseDate,
            application.architectureDiagram,
            application.hasTenants,
            application.hasLicensing,
            application.costLicensesPerYear,
            application.requestsPerDay,
            new AppHealthApplicationCreatedAt({ currentTimestamp: true }),
            new AppHealthApplicationUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateApplications,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddApplicationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationsRegistered = this.publisher.mergeObjectContext(new AppHealthAddApplicationsContextEvent(aggregateApplications));

        applicationsRegistered.created(); // apply event to model events
        applicationsRegistered.commit(); // commit all events of model
    }
}
