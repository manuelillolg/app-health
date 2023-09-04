import { AppHealthApplicationAuthentication, AppHealthIApplicationAuthenticationRepository } from '@app/app-health/application-authentication';
import {
    AppHealthApplicationAuthenticationApplicationId,
    AppHealthApplicationAuthenticationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthenticationAuthenticationInterfaceId,
    AppHealthApplicationAuthenticationCreatedAt,
    AppHealthApplicationAuthenticationDeletedAt,
    AppHealthApplicationAuthenticationId,
    AppHealthApplicationAuthenticationScore,
    AppHealthApplicationAuthenticationTotalUsers,
    AppHealthApplicationAuthenticationUpdatedAt,
} from '@app/app-health/application-authentication/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthUpdateApplicationAuthenticationByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationAuthenticationRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthApplicationAuthenticationId;
            applicationId?: AppHealthApplicationAuthenticationApplicationId;
            authenticationInterfaceId?: AppHealthApplicationAuthenticationAuthenticationInterfaceId;
            totalUsers?: AppHealthApplicationAuthenticationTotalUsers;
            score?: AppHealthApplicationAuthenticationScore;
            applicationInfrastructureServiceId?: AppHealthApplicationAuthenticationApplicationInfrastructureServiceId;
        },
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

        // update by id
        await this.repository.updateById(
            applicationAuthentication,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationAuthenticationRegister = this.publisher.mergeObjectContext(
            applicationAuthentication,
        );

        applicationAuthenticationRegister.updated(applicationAuthentication); // apply event to model events
        applicationAuthenticationRegister.commit(); // commit all events of model
    }
}
