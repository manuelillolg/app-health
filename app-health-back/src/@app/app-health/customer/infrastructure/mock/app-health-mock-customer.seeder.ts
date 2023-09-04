import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    AppHealthCustomerId,
    AppHealthCustomerName,
    AppHealthCustomerCreatedAt,
    AppHealthCustomerUpdatedAt,
    AppHealthCustomerDeletedAt,
} from '../../domain/value-objects';
import { AppHealthCustomer } from '../../domain/app-health-customer.aggregate';
import { appHealthMockCustomerData } from './app-health-mock-customer.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockCustomerSeeder extends MockSeeder<AppHealthCustomer>
{
    public collectionSource: AppHealthCustomer[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const customer of _.orderBy(appHealthMockCustomerData, ['id']))
        {
            this.collectionSource.push(
                AppHealthCustomer.register(
                    new AppHealthCustomerId(customer.id),
                    new AppHealthCustomerName(customer.name),
                    new AppHealthCustomerCreatedAt({ currentTimestamp: true }),
                    new AppHealthCustomerUpdatedAt({ currentTimestamp: true }),
                    new AppHealthCustomerDeletedAt(null),
                ),
            );
        }
    }
}
