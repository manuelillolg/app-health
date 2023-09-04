import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthApplicationAuthorization } from '../../domain/app-health-application-authorization.aggregate';
import { AppHealthCreatedApplicationAuthorizationEvent } from './app-health-created-application-authorization.event';
import { AppHealthCreatedApplicationAuthorizationsEvent } from './app-health-created-application-authorizations.event';
import { AppHealthUpdatedApplicationAuthorizationEvent } from './app-health-updated-application-authorization.event';
import { AppHealthUpdatedApplicationAuthorizationsEvent } from './app-health-updated-application-authorizations.event';
import { AppHealthDeletedApplicationAuthorizationEvent } from './app-health-deleted-application-authorization.event';
import { AppHealthDeletedApplicationAuthorizationsEvent } from './app-health-deleted-application-authorizations.event';

export class AppHealthAddApplicationAuthorizationsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthApplicationAuthorization[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new AppHealthCreatedApplicationAuthorizationsEvent(
                this.aggregateRoots.map(applicationAuthorization =>
                    new AppHealthCreatedApplicationAuthorizationEvent(
                        applicationAuthorization.id.value,
                        applicationAuthorization.applicationId.value,
                        applicationAuthorization.authorizationInterfaceId.value,
                        applicationAuthorization.totalUsers?.value,
                        applicationAuthorization.score.value,
                        applicationAuthorization.applicationInfrastructureServiceId.value,
                        applicationAuthorization.createdAt?.value,
                        applicationAuthorization.updatedAt?.value,
                        applicationAuthorization.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedApplicationAuthorizationsEvent(
                this.aggregateRoots.map(applicationAuthorization =>
                    new AppHealthUpdatedApplicationAuthorizationEvent(
                        applicationAuthorization.id.value,
                        applicationAuthorization.applicationId.value,
                        applicationAuthorization.authorizationInterfaceId.value,
                        applicationAuthorization.totalUsers?.value,
                        applicationAuthorization.score.value,
                        applicationAuthorization.applicationInfrastructureServiceId.value,
                        applicationAuthorization.createdAt?.value,
                        applicationAuthorization.updatedAt?.value,
                        applicationAuthorization.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedApplicationAuthorizationsEvent(
                this.aggregateRoots.map(applicationAuthorization =>
                    new AppHealthDeletedApplicationAuthorizationEvent(
                        applicationAuthorization.id.value,
                        applicationAuthorization.applicationId.value,
                        applicationAuthorization.authorizationInterfaceId.value,
                        applicationAuthorization.totalUsers?.value,
                        applicationAuthorization.score.value,
                        applicationAuthorization.applicationInfrastructureServiceId.value,
                        applicationAuthorization.createdAt?.value,
                        applicationAuthorization.updatedAt?.value,
                        applicationAuthorization.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
