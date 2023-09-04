import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    AppHealthApplicationAuthorizationId,
    AppHealthApplicationAuthorizationApplicationId,
    AppHealthApplicationAuthorizationAuthorizationInterfaceId,
    AppHealthApplicationAuthorizationTotalUsers,
    AppHealthApplicationAuthorizationScore,
    AppHealthApplicationAuthorizationApplicationInfrastructureServiceId,
    AppHealthApplicationAuthorizationCreatedAt,
    AppHealthApplicationAuthorizationUpdatedAt,
    AppHealthApplicationAuthorizationDeletedAt,
} from '../../domain/value-objects';
import { AppHealthApplicationAuthorization } from '../../domain/app-health-application-authorization.aggregate';
import { appHealthMockApplicationAuthorizationData } from './app-health-mock-application-authorization.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockApplicationAuthorizationSeeder extends MockSeeder<AppHealthApplicationAuthorization>
{
    public collectionSource: AppHealthApplicationAuthorization[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const applicationAuthorization of _.orderBy(appHealthMockApplicationAuthorizationData, ['id']))
        {
            this.collectionSource.push(
                AppHealthApplicationAuthorization.register(
                    new AppHealthApplicationAuthorizationId(applicationAuthorization.id),
                    new AppHealthApplicationAuthorizationApplicationId(applicationAuthorization.applicationId),
                    new AppHealthApplicationAuthorizationAuthorizationInterfaceId(applicationAuthorization.authorizationInterfaceId),
                    new AppHealthApplicationAuthorizationTotalUsers(applicationAuthorization.totalUsers),
                    new AppHealthApplicationAuthorizationScore(applicationAuthorization.score),
                    new AppHealthApplicationAuthorizationApplicationInfrastructureServiceId(applicationAuthorization.applicationInfrastructureServiceId),
                    new AppHealthApplicationAuthorizationCreatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationAuthorizationUpdatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationAuthorizationDeletedAt(null),
                ),
            );
        }
    }
}
