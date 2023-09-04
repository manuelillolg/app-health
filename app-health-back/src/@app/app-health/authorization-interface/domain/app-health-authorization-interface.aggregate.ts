/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AppHealthAuthorizationInterfaceId,
    AppHealthAuthorizationInterfaceName,
    AppHealthAuthorizationInterfaceScore,
    AppHealthAuthorizationInterfaceCreatedAt,
    AppHealthAuthorizationInterfaceUpdatedAt,
    AppHealthAuthorizationInterfaceDeletedAt,
} from './value-objects';
import { AppHealthCreatedAuthorizationInterfaceEvent } from '../application/events/app-health-created-authorization-interface.event';
import { AppHealthUpdatedAuthorizationInterfaceEvent } from '../application/events/app-health-updated-authorization-interface.event';
import { AppHealthDeletedAuthorizationInterfaceEvent } from '../application/events/app-health-deleted-authorization-interface.event';

export class AppHealthAuthorizationInterface extends AggregateRoot
{
    id: AppHealthAuthorizationInterfaceId;
    name: AppHealthAuthorizationInterfaceName;
    score: AppHealthAuthorizationInterfaceScore;
    createdAt: AppHealthAuthorizationInterfaceCreatedAt;
    updatedAt: AppHealthAuthorizationInterfaceUpdatedAt;
    deletedAt: AppHealthAuthorizationInterfaceDeletedAt;

    // eager relationship

    constructor(
        id: AppHealthAuthorizationInterfaceId,
        name: AppHealthAuthorizationInterfaceName,
        score: AppHealthAuthorizationInterfaceScore,
        createdAt: AppHealthAuthorizationInterfaceCreatedAt,
        updatedAt: AppHealthAuthorizationInterfaceUpdatedAt,
        deletedAt: AppHealthAuthorizationInterfaceDeletedAt,

    )
    {
        super();
        this.id = id;
        this.name = name;
        this.score = score;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
    }

    static register (
        id: AppHealthAuthorizationInterfaceId,
        name: AppHealthAuthorizationInterfaceName,
        score: AppHealthAuthorizationInterfaceScore,
        createdAt: AppHealthAuthorizationInterfaceCreatedAt,
        updatedAt: AppHealthAuthorizationInterfaceUpdatedAt,
        deletedAt: AppHealthAuthorizationInterfaceDeletedAt,

    ): AppHealthAuthorizationInterface
    {
        return new AppHealthAuthorizationInterface(
            id,
            name,
            score,
            createdAt,
            updatedAt,
            deletedAt,

        );
    }

    created(authorizationInterface: AppHealthAuthorizationInterface): void
    {
        this.apply(
            new AppHealthCreatedAuthorizationInterfaceEvent(
                authorizationInterface.id.value,
                authorizationInterface.name.value,
                authorizationInterface.score.value,
                authorizationInterface.createdAt?.value,
                authorizationInterface.updatedAt?.value,
                authorizationInterface.deletedAt?.value,
            ),
        );
    }

    updated(authorizationInterface: AppHealthAuthorizationInterface): void
    {
        this.apply(
            new AppHealthUpdatedAuthorizationInterfaceEvent(
                authorizationInterface.id?.value,
                authorizationInterface.name?.value,
                authorizationInterface.score?.value,
                authorizationInterface.createdAt?.value,
                authorizationInterface.updatedAt?.value,
                authorizationInterface.deletedAt?.value,
            ),
        );
    }

    deleted(authorizationInterface: AppHealthAuthorizationInterface): void
    {
        this.apply(
            new AppHealthDeletedAuthorizationInterfaceEvent(
                authorizationInterface.id.value,
                authorizationInterface.name.value,
                authorizationInterface.score.value,
                authorizationInterface.createdAt?.value,
                authorizationInterface.updatedAt?.value,
                authorizationInterface.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            score: this.score.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            score: this.score.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }
}
