import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AppHealthApplicationAuthenticationId,
    AppHealthApplicationAuthenticationApplicationId,
    AppHealthApplicationAuthenticationAuthenticationInterfaceId,
    AppHealthApplicationAuthenticationTotalUsers,
    AppHealthApplicationAuthenticationScore,
    AppHealthApplicationAuthenticationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthenticationCreatedAt,
    AppHealthApplicationAuthenticationUpdatedAt,
    AppHealthApplicationAuthenticationDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIApplicationAuthenticationRepository } from '../../domain/app-health-application-authentication.repository';
import { AppHealthApplicationAuthentication } from '../../domain/app-health-application-authentication.aggregate';
import { AppHealthAddApplicationAuthenticationsContextEvent } from '../events/app-health-add-application-authentications-context.event';

@Injectable()
export class AppHealthUpdateApplicationAuthenticationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationAuthenticationRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthApplicationAuthenticationId;
            applicationId?: AppHealthApplicationAuthenticationApplicationId;
            authenticationInterfaceId?: AppHealthApplicationAuthenticationAuthenticationInterfaceId;
            totalUsers?: AppHealthApplicationAuthenticationTotalUsers;
            score?: AppHealthApplicationAuthenticationScore;
            applicationInfrastructureServiceId?: AppHealthApplicationAuthenticationApplicationInfrastructureServiceId;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const applicationAuthentication = AppHealthApplicationAuthentication.register(
            payload.id,
            payload.applicationId,
            payload.authenticationInterfaceId,
            payload.totalUsers,
            payload.score,
            payload.applicationInfrastructureServiceId,
            null, // createdAt
            new AppHealthApplicationAuthenticationUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            applicationAuthentication,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const applicationAuthentications = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationAuthenticationsRegister = this.publisher.mergeObjectContext(
            new AppHealthAddApplicationAuthenticationsContextEvent(applicationAuthentications),
        );

        applicationAuthenticationsRegister.updated(); // apply event to model events
        applicationAuthenticationsRegister.commit(); // commit all events of model
    }
}
