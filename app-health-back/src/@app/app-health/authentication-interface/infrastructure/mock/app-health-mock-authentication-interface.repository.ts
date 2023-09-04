import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthIAuthenticationInterfaceRepository } from '@app/app-health/authentication-interface/domain/app-health-authentication-interface.repository';
import {
    AppHealthAuthenticationInterfaceId,
    AppHealthAuthenticationInterfaceName,
    AppHealthAuthenticationInterfaceScore,
    AppHealthAuthenticationInterfaceCreatedAt,
    AppHealthAuthenticationInterfaceUpdatedAt,
    AppHealthAuthenticationInterfaceDeletedAt,
} from '@app/app-health/authentication-interface/domain/value-objects';
import { AppHealthAuthenticationInterface } from '../../domain/app-health-authentication-interface.aggregate';
import { appHealthMockAuthenticationInterfaceData } from './app-health-mock-authentication-interface.data';

@Injectable()
export class AppHealthMockAuthenticationInterfaceRepository extends MockRepository<AppHealthAuthenticationInterface> implements AppHealthIAuthenticationInterfaceRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthAuthenticationInterface';
    public collectionSource: AppHealthAuthenticationInterface[];
    public deletedAtInstance: AppHealthAuthenticationInterfaceDeletedAt = new AppHealthAuthenticationInterfaceDeletedAt(null);

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

        for (const itemCollection of <any[]>appHealthMockAuthenticationInterfaceData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthAuthenticationInterface.register(
                new AppHealthAuthenticationInterfaceId(itemCollection.id),
                new AppHealthAuthenticationInterfaceName(itemCollection.name),
                new AppHealthAuthenticationInterfaceScore(itemCollection.score),
                new AppHealthAuthenticationInterfaceCreatedAt(itemCollection.createdAt),
                new AppHealthAuthenticationInterfaceUpdatedAt(itemCollection.updatedAt),
                new AppHealthAuthenticationInterfaceDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
