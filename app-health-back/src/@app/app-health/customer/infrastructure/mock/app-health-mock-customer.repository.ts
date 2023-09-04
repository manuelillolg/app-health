import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthICustomerRepository } from '@app/app-health/customer/domain/app-health-customer.repository';
import {
    AppHealthCustomerId,
    AppHealthCustomerName,
    AppHealthCustomerCreatedAt,
    AppHealthCustomerUpdatedAt,
    AppHealthCustomerDeletedAt,
} from '@app/app-health/customer/domain/value-objects';
import { AppHealthCustomer } from '../../domain/app-health-customer.aggregate';
import { appHealthMockCustomerData } from './app-health-mock-customer.data';

@Injectable()
export class AppHealthMockCustomerRepository extends MockRepository<AppHealthCustomer> implements AppHealthICustomerRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthCustomer';
    public collectionSource: AppHealthCustomer[];
    public deletedAtInstance: AppHealthCustomerDeletedAt = new AppHealthCustomerDeletedAt(null);

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

        for (const itemCollection of <any[]>appHealthMockCustomerData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthCustomer.register(
                new AppHealthCustomerId(itemCollection.id),
                new AppHealthCustomerName(itemCollection.name),
                new AppHealthCustomerCreatedAt(itemCollection.createdAt),
                new AppHealthCustomerUpdatedAt(itemCollection.updatedAt),
                new AppHealthCustomerDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
