import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    AppHealthAuthorizationInterfaceId,
    AppHealthAuthorizationInterfaceName,
    AppHealthAuthorizationInterfaceScore,
    AppHealthAuthorizationInterfaceCreatedAt,
    AppHealthAuthorizationInterfaceUpdatedAt,
    AppHealthAuthorizationInterfaceDeletedAt,
} from '../../domain/value-objects';
import { AppHealthAuthorizationInterface } from '../../domain/app-health-authorization-interface.aggregate';
import { appHealthMockAuthorizationInterfaceData } from './app-health-mock-authorization-interface.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockAuthorizationInterfaceSeeder extends MockSeeder<AppHealthAuthorizationInterface>
{
    public collectionSource: AppHealthAuthorizationInterface[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const authorizationInterface of _.orderBy(appHealthMockAuthorizationInterfaceData, ['id']))
        {
            this.collectionSource.push(
                AppHealthAuthorizationInterface.register(
                    new AppHealthAuthorizationInterfaceId(authorizationInterface.id),
                    new AppHealthAuthorizationInterfaceName(authorizationInterface.name),
                    new AppHealthAuthorizationInterfaceScore(authorizationInterface.score),
                    new AppHealthAuthorizationInterfaceCreatedAt({ currentTimestamp: true }),
                    new AppHealthAuthorizationInterfaceUpdatedAt({ currentTimestamp: true }),
                    new AppHealthAuthorizationInterfaceDeletedAt(null),
                ),
            );
        }
    }
}
