import { AppHealthApplication, AppHealthIApplicationRepository } from '@app/app-health/application';
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
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthUpdateApplicationByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthApplicationId;
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

        // update by id
        await this.repository.updateById(
            application,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationRegister = this.publisher.mergeObjectContext(
            application,
        );

        applicationRegister.updated(application); // apply event to model events
        applicationRegister.commit(); // commit all events of model
    }
}
