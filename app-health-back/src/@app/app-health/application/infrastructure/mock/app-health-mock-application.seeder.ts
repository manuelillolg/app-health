import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
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
} from '../../domain/value-objects';
import { AppHealthApplication } from '../../domain/app-health-application.aggregate';
import { appHealthMockApplicationData } from './app-health-mock-application.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockApplicationSeeder extends MockSeeder<AppHealthApplication>
{
    public collectionSource: AppHealthApplication[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const application of _.orderBy(appHealthMockApplicationData, ['id']))
        {
            this.collectionSource.push(
                AppHealthApplication.register(
                    new AppHealthApplicationId(application.id),
                    new AppHealthApplicationTechnicalSolutionId(application.technicalSolutionId),
                    new AppHealthApplicationName(application.name),
                    new AppHealthApplicationDescription(application.description),
                    new AppHealthApplicationBusinessImpact(application.businessImpact),
                    new AppHealthApplicationType(application.type),
                    new AppHealthApplicationReleaseDate(application.releaseDate),
                    new AppHealthApplicationArchitectureDiagram(application.architectureDiagram),
                    new AppHealthApplicationHasTenants(application.hasTenants),
                    new AppHealthApplicationHasLicensing(application.hasLicensing),
                    new AppHealthApplicationCostLicensesPerYear(application.costLicensesPerYear),
                    new AppHealthApplicationRequestsPerDay(application.requestsPerDay),
                    new AppHealthApplicationCreatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationUpdatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationDeletedAt(null),
                ),
            );
        }
    }
}
