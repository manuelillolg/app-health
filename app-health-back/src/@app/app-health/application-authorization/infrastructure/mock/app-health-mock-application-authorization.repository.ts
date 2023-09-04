import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthIApplicationAuthorizationRepository } from '@app/app-health/application-authorization/domain/app-health-application-authorization.repository';
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
} from '@app/app-health/application-authorization/domain/value-objects';
import { AppHealthApplicationAuthorization } from '../../domain/app-health-application-authorization.aggregate';
import { appHealthMockApplicationAuthorizationData } from './app-health-mock-application-authorization.data';

@Injectable()
export class AppHealthMockApplicationAuthorizationRepository extends MockRepository<AppHealthApplicationAuthorization> implements AppHealthIApplicationAuthorizationRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthApplicationAuthorization';
    public collectionSource: AppHealthApplicationAuthorization[];
    public deletedAtInstance: AppHealthApplicationAuthorizationDeletedAt = new AppHealthApplicationAuthorizationDeletedAt(null);

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

        for (const itemCollection of <any[]>appHealthMockApplicationAuthorizationData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthApplicationAuthorization.register(
                new AppHealthApplicationAuthorizationId(itemCollection.id),
                new AppHealthApplicationAuthorizationApplicationId(itemCollection.applicationId),
                new AppHealthApplicationAuthorizationAuthorizationInterfaceId(itemCollection.authorizationInterfaceId),
                new AppHealthApplicationAuthorizationTotalUsers(itemCollection.totalUsers),
                new AppHealthApplicationAuthorizationScore(itemCollection.score),
                new AppHealthApplicationAuthorizationApplicationInfrastructureServiceId(itemCollection.applicationInfrastructureServiceId),
                new AppHealthApplicationAuthorizationCreatedAt(itemCollection.createdAt),
                new AppHealthApplicationAuthorizationUpdatedAt(itemCollection.updatedAt),
                new AppHealthApplicationAuthorizationDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
