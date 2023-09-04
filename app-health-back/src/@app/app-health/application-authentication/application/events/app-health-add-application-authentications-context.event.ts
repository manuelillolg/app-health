import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthApplicationAuthentication } from '../../domain/app-health-application-authentication.aggregate';
import { AppHealthCreatedApplicationAuthenticationEvent } from './app-health-created-application-authentication.event';
import { AppHealthCreatedApplicationAuthenticationsEvent } from './app-health-created-application-authentications.event';
import { AppHealthUpdatedApplicationAuthenticationEvent } from './app-health-updated-application-authentication.event';
import { AppHealthUpdatedApplicationAuthenticationsEvent } from './app-health-updated-application-authentications.event';
import { AppHealthDeletedApplicationAuthenticationEvent } from './app-health-deleted-application-authentication.event';
import { AppHealthDeletedApplicationAuthenticationsEvent } from './app-health-deleted-application-authentications.event';

export class AppHealthAddApplicationAuthenticationsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthApplicationAuthentication[] = [],
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
            new AppHealthCreatedApplicationAuthenticationsEvent(
                this.aggregateRoots.map(applicationAuthentication =>
                    new AppHealthCreatedApplicationAuthenticationEvent(
                        applicationAuthentication.id.value,
                        applicationAuthentication.applicationId.value,
                        applicationAuthentication.authenticationInterfaceId.value,
                        applicationAuthentication.totalUsers?.value,
                        applicationAuthentication.score.value,
                        applicationAuthentication.applicationInfrastructureServiceId.value,
                        applicationAuthentication.createdAt?.value,
                        applicationAuthentication.updatedAt?.value,
                        applicationAuthentication.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedApplicationAuthenticationsEvent(
                this.aggregateRoots.map(applicationAuthentication =>
                    new AppHealthUpdatedApplicationAuthenticationEvent(
                        applicationAuthentication.id.value,
                        applicationAuthentication.applicationId.value,
                        applicationAuthentication.authenticationInterfaceId.value,
                        applicationAuthentication.totalUsers?.value,
                        applicationAuthentication.score.value,
                        applicationAuthentication.applicationInfrastructureServiceId.value,
                        applicationAuthentication.createdAt?.value,
                        applicationAuthentication.updatedAt?.value,
                        applicationAuthentication.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedApplicationAuthenticationsEvent(
                this.aggregateRoots.map(applicationAuthentication =>
                    new AppHealthDeletedApplicationAuthenticationEvent(
                        applicationAuthentication.id.value,
                        applicationAuthentication.applicationId.value,
                        applicationAuthentication.authenticationInterfaceId.value,
                        applicationAuthentication.totalUsers?.value,
                        applicationAuthentication.score.value,
                        applicationAuthentication.applicationInfrastructureServiceId.value,
                        applicationAuthentication.createdAt?.value,
                        applicationAuthentication.updatedAt?.value,
                        applicationAuthentication.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
