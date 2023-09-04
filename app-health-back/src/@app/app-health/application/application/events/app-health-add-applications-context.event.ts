import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthApplication } from '../../domain/app-health-application.aggregate';
import { AppHealthCreatedApplicationEvent } from './app-health-created-application.event';
import { AppHealthCreatedApplicationsEvent } from './app-health-created-applications.event';
import { AppHealthUpdatedApplicationEvent } from './app-health-updated-application.event';
import { AppHealthUpdatedApplicationsEvent } from './app-health-updated-applications.event';
import { AppHealthDeletedApplicationEvent } from './app-health-deleted-application.event';
import { AppHealthDeletedApplicationsEvent } from './app-health-deleted-applications.event';

export class AppHealthAddApplicationsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthApplication[] = [],
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
            new AppHealthCreatedApplicationsEvent(
                this.aggregateRoots.map(application =>
                    new AppHealthCreatedApplicationEvent(
                        application.id.value,
                        application.technicalSolutionId.value,
                        application.name.value,
                        application.description?.value,
                        application.businessImpact?.value,
                        application.type.value,
                        application.releaseDate?.value,
                        application.architectureDiagram?.value,
                        application.hasTenants.value,
                        application.hasLicensing.value,
                        application.costLicensesPerYear?.value,
                        application.requestsPerDay?.value,
                        application.createdAt?.value,
                        application.updatedAt?.value,
                        application.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedApplicationsEvent(
                this.aggregateRoots.map(application =>
                    new AppHealthUpdatedApplicationEvent(
                        application.id.value,
                        application.technicalSolutionId.value,
                        application.name.value,
                        application.description?.value,
                        application.businessImpact?.value,
                        application.type.value,
                        application.releaseDate?.value,
                        application.architectureDiagram?.value,
                        application.hasTenants.value,
                        application.hasLicensing.value,
                        application.costLicensesPerYear?.value,
                        application.requestsPerDay?.value,
                        application.createdAt?.value,
                        application.updatedAt?.value,
                        application.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedApplicationsEvent(
                this.aggregateRoots.map(application =>
                    new AppHealthDeletedApplicationEvent(
                        application.id.value,
                        application.technicalSolutionId.value,
                        application.name.value,
                        application.description?.value,
                        application.businessImpact?.value,
                        application.type.value,
                        application.releaseDate?.value,
                        application.architectureDiagram?.value,
                        application.hasTenants.value,
                        application.hasLicensing.value,
                        application.costLicensesPerYear?.value,
                        application.requestsPerDay?.value,
                        application.createdAt?.value,
                        application.updatedAt?.value,
                        application.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
