import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AppHealthApplicationAuthorizationId,
    AppHealthApplicationAuthorizationApplicationId,
    AppHealthApplicationAuthorizationAuthorizationInterfaceId,
    AppHealthApplicationAuthorizationTotalUsers,
    AppHealthApplicationAuthorizationScore,
    AppHealthApplicationAuthorizationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthorizationCreatedAt,
    AppHealthApplicationAuthorizationUpdatedAt,
    AppHealthApplicationAuthorizationDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIApplicationAuthorizationRepository } from '../../domain/app-health-application-authorization.repository';
import { AppHealthApplicationAuthorization } from '../../domain/app-health-application-authorization.aggregate';
import { AppHealthAddApplicationAuthorizationsContextEvent } from '../events/app-health-add-application-authorizations-context.event';

@Injectable()
export class AppHealthUpdateApplicationAuthorizationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationAuthorizationRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthApplicationAuthorizationId;
            applicationId?: AppHealthApplicationAuthorizationApplicationId;
            authorizationInterfaceId?: AppHealthApplicationAuthorizationAuthorizationInterfaceId;
            totalUsers?: AppHealthApplicationAuthorizationTotalUsers;
            score?: AppHealthApplicationAuthorizationScore;
            applicationInfrastructureServiceId?: AppHealthApplicationAuthorizationApplicationInfrastructureServiceId;
        },
        queryStatement?: QueryStatement,
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


        // update
        await this.repository.update(
            applicationAuthorization,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const applicationAuthorizations = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationAuthorizationsRegister = this.publisher.mergeObjectContext(
            new AppHealthAddApplicationAuthorizationsContextEvent(applicationAuthorizations),
        );

        applicationAuthorizationsRegister.updated(); // apply event to model events
        applicationAuthorizationsRegister.commit(); // commit all events of model
    }
}
