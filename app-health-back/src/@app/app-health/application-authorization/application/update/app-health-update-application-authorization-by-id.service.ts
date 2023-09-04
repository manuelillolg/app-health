import { AppHealthApplicationAuthorization, AppHealthIApplicationAuthorizationRepository } from '@app/app-health/application-authorization';
import {
    AppHealthApplicationAuthorizationApplicationId,
    AppHealthApplicationAuthorizationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthorizationAuthorizationInterfaceId,
    AppHealthApplicationAuthorizationCreatedAt,
    AppHealthApplicationAuthorizationDeletedAt,
    AppHealthApplicationAuthorizationId,
    AppHealthApplicationAuthorizationScore,
    AppHealthApplicationAuthorizationTotalUsers,
    AppHealthApplicationAuthorizationUpdatedAt,
} from '@app/app-health/application-authorization/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthUpdateApplicationAuthorizationByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationAuthorizationRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthApplicationAuthorizationId;
            applicationId?: AppHealthApplicationAuthorizationApplicationId;
            authorizationInterfaceId?: AppHealthApplicationAuthorizationAuthorizationInterfaceId;
            totalUsers?: AppHealthApplicationAuthorizationTotalUsers;
            score?: AppHealthApplicationAuthorizationScore;
            applicationInfrastructureServiceId?: AppHealthApplicationAuthorizationApplicationInfrastructureServiceId;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const applicationAuthorization = AppHealthApplicationAuthorization.register(
            payload.id,
            payload.applicationId,
            payload.authorizationInterfaceId,
            payload.totalUsers,
            payload.score,
            payload.applicationInfrastructureServiceId,
            null, // createdAt
            new AppHealthApplicationAuthorizationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(
            applicationAuthorization,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationAuthorizationRegister = this.publisher.mergeObjectContext(
            applicationAuthorization,
        );

        applicationAuthorizationRegister.updated(applicationAuthorization); // apply event to model events
        applicationAuthorizationRegister.commit(); // commit all events of model
    }
}
