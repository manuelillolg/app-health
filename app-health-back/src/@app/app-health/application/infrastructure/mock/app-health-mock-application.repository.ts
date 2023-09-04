import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthIApplicationRepository } from '@app/app-health/application/domain/app-health-application.repository';
import {
    AppHealthApplicationId,
    AppHealthApplicationTechnicalSolutionId,
    AppHealthApplicationName,
    AppHealthApplicationDescription,
    AppHealthApplicationBusinessImpact,
    AppHealthApplicationType,
    AppHealthApplicationReleaseDate,
    AppHealthApplicationArchitectureDiagram,
    AppHealthApplicationHasTenants,
    AppHealthApplicationHasLicensing,
    AppHealthApplicationCostLicensesPerYear,
    AppHealthApplicationRequestsPerDay,
    AppHealthApplicationCreatedAt,
    AppHealthApplicationUpdatedAt,
    AppHealthApplicationDeletedAt,
} from '@app/app-health/application/domain/value-objects';
import { AppHealthApplication } from '../../domain/app-health-application.aggregate';
import { appHealthMockApplicationData } from './app-health-mock-application.data';

@Injectable()
export class AppHealthMockApplicationRepository extends MockRepository<AppHealthApplication> implements AppHealthIApplicationRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthApplication';
    public collectionSource: AppHealthApplication[];
    public deletedAtInstance: AppHealthApplicationDeletedAt = new AppHealthApplicationDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>appHealthMockApplicationData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthApplication.register(
                new AppHealthApplicationId(itemCollection.id),
                new AppHealthApplicationTechnicalSolutionId(itemCollection.technicalSolutionId),
                new AppHealthApplicationName(itemCollection.name),
                new AppHealthApplicationDescription(itemCollection.description),
                new AppHealthApplicationBusinessImpact(itemCollection.businessImpact),
                new AppHealthApplicationType(itemCollection.type),
                new AppHealthApplicationReleaseDate(itemCollection.releaseDate),
                new AppHealthApplicationArchitectureDiagram(itemCollection.architectureDiagram),
                new AppHealthApplicationHasTenants(itemCollection.hasTenants),
                new AppHealthApplicationHasLicensing(itemCollection.hasLicensing),
                new AppHealthApplicationCostLicensesPerYear(itemCollection.costLicensesPerYear),
                new AppHealthApplicationRequestsPerDay(itemCollection.requestsPerDay),
                new AppHealthApplicationCreatedAt(itemCollection.createdAt),
                new AppHealthApplicationUpdatedAt(itemCollection.updatedAt),
                new AppHealthApplicationDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
