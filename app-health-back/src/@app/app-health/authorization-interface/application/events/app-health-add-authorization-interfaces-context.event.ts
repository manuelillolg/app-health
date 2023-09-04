import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthAuthorizationInterface } from '../../domain/app-health-authorization-interface.aggregate';
import { AppHealthCreatedAuthorizationInterfaceEvent } from './app-health-created-authorization-interface.event';
import { AppHealthCreatedAuthorizationInterfacesEvent } from './app-health-created-authorization-interfaces.event';
import { AppHealthUpdatedAuthorizationInterfaceEvent } from './app-health-updated-authorization-interface.event';
import { AppHealthUpdatedAuthorizationInterfacesEvent } from './app-health-updated-authorization-interfaces.event';
import { AppHealthDeletedAuthorizationInterfaceEvent } from './app-health-deleted-authorization-interface.event';
import { AppHealthDeletedAuthorizationInterfacesEvent } from './app-health-deleted-authorization-interfaces.event';

export class AppHealthAddAuthorizationInterfacesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthAuthorizationInterface[] = [],
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
            new AppHealthCreatedAuthorizationInterfacesEvent(
                this.aggregateRoots.map(authorizationInterface =>
                    new AppHealthCreatedAuthorizationInterfaceEvent(
                        authorizationInterface.id.value,
                        authorizationInterface.name.value,
                        authorizationInterface.score.value,
                        authorizationInterface.createdAt?.value,
                        authorizationInterface.updatedAt?.value,
                        authorizationInterface.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedAuthorizationInterfacesEvent(
                this.aggregateRoots.map(authorizationInterface =>
                    new AppHealthUpdatedAuthorizationInterfaceEvent(
                        authorizationInterface.id.value,
                        authorizationInterface.name.value,
                        authorizationInterface.score.value,
                        authorizationInterface.createdAt?.value,
                        authorizationInterface.updatedAt?.value,
                        authorizationInterface.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedAuthorizationInterfacesEvent(
                this.aggregateRoots.map(authorizationInterface =>
                    new AppHealthDeletedAuthorizationInterfaceEvent(
                        authorizationInterface.id.value,
                        authorizationInterface.name.value,
                        authorizationInterface.score.value,
                        authorizationInterface.createdAt?.value,
                        authorizationInterface.updatedAt?.value,
                        authorizationInterface.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
