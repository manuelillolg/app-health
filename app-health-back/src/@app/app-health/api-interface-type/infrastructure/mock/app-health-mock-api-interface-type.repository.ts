import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthIApiInterfaceTypeRepository } from '@app/app-health/api-interface-type/domain/app-health-api-interface-type.repository';
import {
    AppHealthApiInterfaceTypeId,
    AppHealthApiInterfaceTypeName,
    AppHealthApiInterfaceTypeScore,
    AppHealthApiInterfaceTypeCreatedAt,
    AppHealthApiInterfaceTypeUpdatedAt,
    AppHealthApiInterfaceTypeDeletedAt,
} from '@app/app-health/api-interface-type/domain/value-objects';
import { AppHealthApiInterfaceType } from '../../domain/app-health-api-interface-type.aggregate';
import { appHealthMockApiInterfaceTypeData } from './app-health-mock-api-interface-type.data';

@Injectable()
export class AppHealthMockApiInterfaceTypeRepository extends MockRepository<AppHealthApiInterfaceType> implements AppHealthIApiInterfaceTypeRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthApiInterfaceType';
    public collectionSource: AppHealthApiInterfaceType[];
    public deletedAtInstance: AppHealthApiInterfaceTypeDeletedAt = new AppHealthApiInterfaceTypeDeletedAt(null);

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

        for (const itemCollection of <any[]>appHealthMockApiInterfaceTypeData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthApiInterfaceType.register(
                new AppHealthApiInterfaceTypeId(itemCollection.id),
                new AppHealthApiInterfaceTypeName(itemCollection.name),
                new AppHealthApiInterfaceTypeScore(itemCollection.score),
                new AppHealthApiInterfaceTypeCreatedAt(itemCollection.createdAt),
                new AppHealthApiInterfaceTypeUpdatedAt(itemCollection.updatedAt),
                new AppHealthApiInterfaceTypeDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
