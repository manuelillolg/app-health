/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AppHealthAuthenticationInterfaceId,
    AppHealthAuthenticationInterfaceName,
    AppHealthAuthenticationInterfaceScore,
    AppHealthAuthenticationInterfaceCreatedAt,
    AppHealthAuthenticationInterfaceUpdatedAt,
    AppHealthAuthenticationInterfaceDeletedAt,
} from './value-objects';
import { AppHealthCreatedAuthenticationInterfaceEvent } from '../application/events/app-health-created-authentication-interface.event';
import { AppHealthUpdatedAuthenticationInterfaceEvent } from '../application/events/app-health-updated-authentication-interface.event';
import { AppHealthDeletedAuthenticationInterfaceEvent } from '../application/events/app-health-deleted-authentication-interface.event';

export class AppHealthAuthenticationInterface extends AggregateRoot
{
    id: AppHealthAuthenticationInterfaceId;
    name: AppHealthAuthenticationInterfaceName;
    score: AppHealthAuthenticationInterfaceScore;
    createdAt: AppHealthAuthenticationInterfaceCreatedAt;
    updatedAt: AppHealthAuthenticationInterfaceUpdatedAt;
    deletedAt: AppHealthAuthenticationInterfaceDeletedAt;

    // eager relationship

    constructor(
        id: AppHealthAuthenticationInterfaceId,
        name: AppHealthAuthenticationInterfaceName,
        score: AppHealthAuthenticationInterfaceScore,
        createdAt: AppHealthAuthenticationInterfaceCreatedAt,
        updatedAt: AppHealthAuthenticationInterfaceUpdatedAt,
        deletedAt: AppHealthAuthenticationInterfaceDeletedAt,

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
        id: AppHealthAuthenticationInterfaceId,
        name: AppHealthAuthenticationInterfaceName,
        score: AppHealthAuthenticationInterfaceScore,
        createdAt: AppHealthAuthenticationInterfaceCreatedAt,
        updatedAt: AppHealthAuthenticationInterfaceUpdatedAt,
        deletedAt: AppHealthAuthenticationInterfaceDeletedAt,

    ): AppHealthAuthenticationInterface
    {
        return new AppHealthAuthenticationInterface(
            id,
            name,
            score,
            createdAt,
            updatedAt,
            deletedAt,

        );
    }

    created(authenticationInterface: AppHealthAuthenticationInterface): void
    {
        this.apply(
            new AppHealthCreatedAuthenticationInterfaceEvent(
                authenticationInterface.id.value,
                authenticationInterface.name.value,
                authenticationInterface.score.value,
                authenticationInterface.createdAt?.value,
                authenticationInterface.updatedAt?.value,
                authenticationInterface.deletedAt?.value,
            ),
        );
    }

    updated(authenticationInterface: AppHealthAuthenticationInterface): void
    {
        this.apply(
            new AppHealthUpdatedAuthenticationInterfaceEvent(
                authenticationInterface.id?.value,
                authenticationInterface.name?.value,
                authenticationInterface.score?.value,
                authenticationInterface.createdAt?.value,
                authenticationInterface.updatedAt?.value,
                authenticationInterface.deletedAt?.value,
            ),
        );
    }

    deleted(authenticationInterface: AppHealthAuthenticationInterface): void
    {
        this.apply(
            new AppHealthDeletedAuthenticationInterfaceEvent(
                authenticationInterface.id.value,
                authenticationInterface.name.value,
                authenticationInterface.score.value,
                authenticationInterface.createdAt?.value,
                authenticationInterface.updatedAt?.value,
                authenticationInterface.deletedAt?.value,
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
