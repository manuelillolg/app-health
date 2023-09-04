import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    AppHealthApplicationAuthenticationId,
    AppHealthApplicationAuthenticationApplicationId,
    AppHealthApplicationAuthenticationAuthenticationInterfaceId,
    AppHealthApplicationAuthenticationTotalUsers,
    AppHealthApplicationAuthenticationScore,
    AppHealthApplicationAuthenticationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthenticationCreatedAt,
    AppHealthApplicationAuthenticationUpdatedAt,
    AppHealthApplicationAuthenticationDeletedAt,
} from '../../domain/value-objects';
import { AppHealthApplicationAuthentication } from '../../domain/app-health-application-authentication.aggregate';
import { appHealthMockApplicationAuthenticationData } from './app-health-mock-application-authentication.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockApplicationAuthenticationSeeder extends MockSeeder<AppHealthApplicationAuthentication>
{
    public collectionSource: AppHealthApplicationAuthentication[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const applicationAuthentication of _.orderBy(appHealthMockApplicationAuthenticationData, ['id']))
        {
            this.collectionSource.push(
                AppHealthApplicationAuthentication.register(
                    new AppHealthApplicationAuthenticationId(applicationAuthentication.id),
                    new AppHealthApplicationAuthenticationApplicationId(applicationAuthentication.applicationId),
                    new AppHealthApplicationAuthenticationAuthenticationInterfaceId(applicationAuthentication.authenticationInterfaceId),
                    new AppHealthApplicationAuthenticationTotalUsers(applicationAuthentication.totalUsers),
                    new AppHealthApplicationAuthenticationScore(applicationAuthentication.score),
                    new AppHealthApplicationAuthenticationApplicationInfrastructureServiceId(applicationAuthentication.applicationInfrastructureServiceId),
                    new AppHealthApplicationAuthenticationCreatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationAuthenticationUpdatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationAuthenticationDeletedAt(null),
                ),
            );
        }
    }
}
