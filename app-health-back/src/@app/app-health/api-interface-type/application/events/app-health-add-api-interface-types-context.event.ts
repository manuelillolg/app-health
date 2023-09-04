import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthApiInterfaceType } from '../../domain/app-health-api-interface-type.aggregate';
import { AppHealthCreatedApiInterfaceTypeEvent } from './app-health-created-api-interface-type.event';
import { AppHealthCreatedApiInterfaceTypesEvent } from './app-health-created-api-interface-types.event';
import { AppHealthUpdatedApiInterfaceTypeEvent } from './app-health-updated-api-interface-type.event';
import { AppHealthUpdatedApiInterfaceTypesEvent } from './app-health-updated-api-interface-types.event';
import { AppHealthDeletedApiInterfaceTypeEvent } from './app-health-deleted-api-interface-type.event';
import { AppHealthDeletedApiInterfaceTypesEvent } from './app-health-deleted-api-interface-types.event';

export class AppHealthAddApiInterfaceTypesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthApiInterfaceType[] = [],
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
            new AppHealthCreatedApiInterfaceTypesEvent(
                this.aggregateRoots.map(apiInterfaceType =>
                    new AppHealthCreatedApiInterfaceTypeEvent(
                        apiInterfaceType.id.value,
                        apiInterfaceType.name.value,
                        apiInterfaceType.score.value,
                        apiInterfaceType.createdAt?.value,
                        apiInterfaceType.updatedAt?.value,
                        apiInterfaceType.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedApiInterfaceTypesEvent(
                this.aggregateRoots.map(apiInterfaceType =>
                    new AppHealthUpdatedApiInterfaceTypeEvent(
                        apiInterfaceType.id.value,
                        apiInterfaceType.name.value,
                        apiInterfaceType.score.value,
                        apiInterfaceType.createdAt?.value,
                        apiInterfaceType.updatedAt?.value,
                        apiInterfaceType.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedApiInterfaceTypesEvent(
                this.aggregateRoots.map(apiInterfaceType =>
                    new AppHealthDeletedApiInterfaceTypeEvent(
                        apiInterfaceType.id.value,
                        apiInterfaceType.name.value,
                        apiInterfaceType.score.value,
                        apiInterfaceType.createdAt?.value,
                        apiInterfaceType.updatedAt?.value,
                        apiInterfaceType.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
