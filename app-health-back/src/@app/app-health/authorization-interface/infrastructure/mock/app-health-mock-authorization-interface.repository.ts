import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthIAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface/domain/app-health-authorization-interface.repository';
import {
    AppHealthAuthorizationInterfaceId,
    AppHealthAuthorizationInterfaceName,
    AppHealthAuthorizationInterfaceScore,
    AppHealthAuthorizationInterfaceCreatedAt,
    AppHealthAuthorizationInterfaceUpdatedAt,
    AppHealthAuthorizationInterfaceDeletedAt,
} from '@app/app-health/authorization-interface/domain/value-objects';
import { AppHealthAuthorizationInterface } from '../../domain/app-health-authorization-interface.aggregate';
import { appHealthMockAuthorizationInterfaceData } from './app-health-mock-authorization-interface.data';

@Injectable()
export class AppHealthMockAuthorizationInterfaceRepository extends MockRepository<AppHealthAuthorizationInterface> implements AppHealthIAuthorizationInterfaceRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthAuthorizationInterface';
    public collectionSource: AppHealthAuthorizationInterface[];
    public deletedAtInstance: AppHealthAuthorizationInterfaceDeletedAt = new AppHealthAuthorizationInterfaceDeletedAt(null);

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

        for (const itemCollection of <any[]>appHealthMockAuthorizationInterfaceData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthAuthorizationInterface.register(
                new AppHealthAuthorizationInterfaceId(itemCollection.id),
                new AppHealthAuthorizationInterfaceName(itemCollection.name),
                new AppHealthAuthorizationInterfaceScore(itemCollection.score),
                new AppHealthAuthorizationInterfaceCreatedAt(itemCollection.createdAt),
                new AppHealthAuthorizationInterfaceUpdatedAt(itemCollection.updatedAt),
                new AppHealthAuthorizationInterfaceDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
