import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthAuthenticationInterface } from '../../domain/app-health-authentication-interface.aggregate';
import { AppHealthCreatedAuthenticationInterfaceEvent } from './app-health-created-authentication-interface.event';
import { AppHealthCreatedAuthenticationInterfacesEvent } from './app-health-created-authentication-interfaces.event';
import { AppHealthUpdatedAuthenticationInterfaceEvent } from './app-health-updated-authentication-interface.event';
import { AppHealthUpdatedAuthenticationInterfacesEvent } from './app-health-updated-authentication-interfaces.event';
import { AppHealthDeletedAuthenticationInterfaceEvent } from './app-health-deleted-authentication-interface.event';
import { AppHealthDeletedAuthenticationInterfacesEvent } from './app-health-deleted-authentication-interfaces.event';

export class AppHealthAddAuthenticationInterfacesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthAuthenticationInterface[] = [],
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
            new AppHealthCreatedAuthenticationInterfacesEvent(
                this.aggregateRoots.map(authenticationInterface =>
                    new AppHealthCreatedAuthenticationInterfaceEvent(
                        authenticationInterface.id.value,
                        authenticationInterface.name.value,
                        authenticationInterface.score.value,
                        authenticationInterface.createdAt?.value,
                        authenticationInterface.updatedAt?.value,
                        authenticationInterface.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedAuthenticationInterfacesEvent(
                this.aggregateRoots.map(authenticationInterface =>
                    new AppHealthUpdatedAuthenticationInterfaceEvent(
                        authenticationInterface.id.value,
                        authenticationInterface.name.value,
                        authenticationInterface.score.value,
                        authenticationInterface.createdAt?.value,
                        authenticationInterface.updatedAt?.value,
                        authenticationInterface.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedAuthenticationInterfacesEvent(
                this.aggregateRoots.map(authenticationInterface =>
                    new AppHealthDeletedAuthenticationInterfaceEvent(
                        authenticationInterface.id.value,
                        authenticationInterface.name.value,
                        authenticationInterface.score.value,
                        authenticationInterface.createdAt?.value,
                        authenticationInterface.updatedAt?.value,
                        authenticationInterface.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
