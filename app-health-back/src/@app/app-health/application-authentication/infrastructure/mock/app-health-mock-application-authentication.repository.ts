import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthIApplicationAuthenticationRepository } from '@app/app-health/application-authentication/domain/app-health-application-authentication.repository';
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
} from '@app/app-health/application-authentication/domain/value-objects';
import { AppHealthApplicationAuthentication } from '../../domain/app-health-application-authentication.aggregate';
import { appHealthMockApplicationAuthenticationData } from './app-health-mock-application-authentication.data';

@Injectable()
export class AppHealthMockApplicationAuthenticationRepository extends MockRepository<AppHealthApplicationAuthentication> implements AppHealthIApplicationAuthenticationRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthApplicationAuthentication';
    public collectionSource: AppHealthApplicationAuthentication[];
    public deletedAtInstance: AppHealthApplicationAuthenticationDeletedAt = new AppHealthApplicationAuthenticationDeletedAt(null);

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

        for (const itemCollection of <any[]>appHealthMockApplicationAuthenticationData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthApplicationAuthentication.register(
                new AppHealthApplicationAuthenticationId(itemCollection.id),
                new AppHealthApplicationAuthenticationApplicationId(itemCollection.applicationId),
                new AppHealthApplicationAuthenticationAuthenticationInterfaceId(itemCollection.authenticationInterfaceId),
                new AppHealthApplicationAuthenticationTotalUsers(itemCollection.totalUsers),
                new AppHealthApplicationAuthenticationScore(itemCollection.score),
                new AppHealthApplicationAuthenticationApplicationInfrastructureServiceId(itemCollection.applicationInfrastructureServiceId),
                new AppHealthApplicationAuthenticationCreatedAt(itemCollection.createdAt),
                new AppHealthApplicationAuthenticationUpdatedAt(itemCollection.updatedAt),
                new AppHealthApplicationAuthenticationDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
