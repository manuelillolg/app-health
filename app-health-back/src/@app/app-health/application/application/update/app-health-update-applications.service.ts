import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
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
} from '../../domain/value-objects';
import { AppHealthIApplicationRepository } from '../../domain/app-health-application.repository';
import { AppHealthApplication } from '../../domain/app-health-application.aggregate';
import { AppHealthAddApplicationsContextEvent } from '../events/app-health-add-applications-context.event';

@Injectable()
export class AppHealthUpdateApplicationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthApplicationId;
            technicalSolutionId?: AppHealthApplicationTechnicalSolutionId;
            name?: AppHealthApplicationName;
            description?: AppHealthApplicationDescription;
            businessImpact?: AppHealthApplicationBusinessImpact;
            type?: AppHealthApplicationType;
            releaseDate?: AppHealthApplicationReleaseDate;
            architectureDiagram?: AppHealthApplicationArchitectureDiagram;
            hasTenants?: AppHealthApplicationHasTenants;
            hasLicensing?: AppHealthApplicationHasLicensing;
            costLicensesPerYear?: AppHealthApplicationCostLicensesPerYear;
            requestsPerDay?: AppHealthApplicationRequestsPerDay;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const application = AppHealthApplication.register(
            payload.id,
            payload.technicalSolutionId,
            payload.name,
            payload.description,
            payload.businessImpact,
            payload.type,
            payload.releaseDate,
            payload.architectureDiagram,
            payload.hasTenants,
            payload.hasLicensing,
            payload.costLicensesPerYear,
            payload.requestsPerDay,
            null, // createdAt
            new AppHealthApplicationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            application,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const applications = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationsRegister = this.publisher.mergeObjectContext(
            new AppHealthAddApplicationsContextEvent(applications),
        );

        applicationsRegister.updated(); // apply event to model events
        applicationsRegister.commit(); // commit all events of model
    }
}
