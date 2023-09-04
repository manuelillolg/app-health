/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    AppHealthTechnicalSolutionId,
    AppHealthTechnicalSolutionCustomerId,
    AppHealthTechnicalSolutionName,
    AppHealthTechnicalSolutionDescription,
    AppHealthTechnicalSolutionArchitectureDiagram,
    AppHealthTechnicalSolutionProposal,
    AppHealthTechnicalSolutionCreatedAt,
    AppHealthTechnicalSolutionUpdatedAt,
    AppHealthTechnicalSolutionDeletedAt,
} from './value-objects';
import { AppHealthCreatedTechnicalSolutionEvent } from '../application/events/app-health-created-technical-solution.event';
import { AppHealthUpdatedTechnicalSolutionEvent } from '../application/events/app-health-updated-technical-solution.event';
import { AppHealthDeletedTechnicalSolutionEvent } from '../application/events/app-health-deleted-technical-solution.event';
import { AppHealthCustomer } from '@app/app-health/customer';

export class AppHealthTechnicalSolution extends AggregateRoot
{
    id: AppHealthTechnicalSolutionId;
    customerId: AppHealthTechnicalSolutionCustomerId;
    name: AppHealthTechnicalSolutionName;
    description: AppHealthTechnicalSolutionDescription;
    architectureDiagram: AppHealthTechnicalSolutionArchitectureDiagram;
    proposal: AppHealthTechnicalSolutionProposal;
    createdAt: AppHealthTechnicalSolutionCreatedAt;
    updatedAt: AppHealthTechnicalSolutionUpdatedAt;
    deletedAt: AppHealthTechnicalSolutionDeletedAt;

    // eager relationship
    customer: AppHealthCustomer;

    constructor(
        id: AppHealthTechnicalSolutionId,
        customerId: AppHealthTechnicalSolutionCustomerId,
        name: AppHealthTechnicalSolutionName,
        description: AppHealthTechnicalSolutionDescription,
        architectureDiagram: AppHealthTechnicalSolutionArchitectureDiagram,
        proposal: AppHealthTechnicalSolutionProposal,
        createdAt: AppHealthTechnicalSolutionCreatedAt,
        updatedAt: AppHealthTechnicalSolutionUpdatedAt,
        deletedAt: AppHealthTechnicalSolutionDeletedAt,

        customer?: AppHealthCustomer,
    )
    {
        super();
        this.id = id;
        this.customerId = customerId;
        this.name = name;
        this.description = description;
        this.architectureDiagram = architectureDiagram;
        this.proposal = proposal;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.customer = customer;
    }

    static register (
        id: AppHealthTechnicalSolutionId,
        customerId: AppHealthTechnicalSolutionCustomerId,
        name: AppHealthTechnicalSolutionName,
        description: AppHealthTechnicalSolutionDescription,
        architectureDiagram: AppHealthTechnicalSolutionArchitectureDiagram,
        proposal: AppHealthTechnicalSolutionProposal,
        createdAt: AppHealthTechnicalSolutionCreatedAt,
        updatedAt: AppHealthTechnicalSolutionUpdatedAt,
        deletedAt: AppHealthTechnicalSolutionDeletedAt,

        customer?: AppHealthCustomer,
    ): AppHealthTechnicalSolution
    {
        return new AppHealthTechnicalSolution(
            id,
            customerId,
            name,
            description,
            architectureDiagram,
            proposal,
            createdAt,
            updatedAt,
            deletedAt,

            customer,
        );
    }

    created(technicalSolution: AppHealthTechnicalSolution): void
    {
        this.apply(
            new AppHealthCreatedTechnicalSolutionEvent(
                technicalSolution.id.value,
                technicalSolution.customerId.value,
                technicalSolution.name.value,
                technicalSolution.description?.value,
                technicalSolution.architectureDiagram?.value,
                technicalSolution.proposal?.value,
                technicalSolution.createdAt?.value,
                technicalSolution.updatedAt?.value,
                technicalSolution.deletedAt?.value,
            ),
        );
    }

    updated(technicalSolution: AppHealthTechnicalSolution): void
    {
        this.apply(
            new AppHealthUpdatedTechnicalSolutionEvent(
                technicalSolution.id?.value,
                technicalSolution.customerId?.value,
                technicalSolution.name?.value,
                technicalSolution.description?.value,
                technicalSolution.architectureDiagram?.value,
                technicalSolution.proposal?.value,
                technicalSolution.createdAt?.value,
                technicalSolution.updatedAt?.value,
                technicalSolution.deletedAt?.value,
            ),
        );
    }

    deleted(technicalSolution: AppHealthTechnicalSolution): void
    {
        this.apply(
            new AppHealthDeletedTechnicalSolutionEvent(
                technicalSolution.id.value,
                technicalSolution.customerId.value,
                technicalSolution.name.value,
                technicalSolution.description?.value,
                technicalSolution.architectureDiagram?.value,
                technicalSolution.proposal?.value,
                technicalSolution.createdAt?.value,
                technicalSolution.updatedAt?.value,
                technicalSolution.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            customerId: this.customerId.value,
            name: this.name.value,
            description: this.description?.value,
            architectureDiagram: this.architectureDiagram?.value,
            proposal: this.proposal?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            customer: this.customer?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            customerId: this.customerId.value,
            name: this.name.value,
            description: this.description?.value,
            architectureDiagram: this.architectureDiagram?.value,
            proposal: this.proposal?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            customer: this.customer?.toDTO(),
        };
    }
}
