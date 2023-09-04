import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    AppHealthAuthenticationInterfaceId,
    AppHealthAuthenticationInterfaceName,
    AppHealthAuthenticationInterfaceScore,
    AppHealthAuthenticationInterfaceCreatedAt,
    AppHealthAuthenticationInterfaceUpdatedAt,
    AppHealthAuthenticationInterfaceDeletedAt,
} from '../../domain/value-objects';
import { AppHealthAuthenticationInterface } from '../../domain/app-health-authentication-interface.aggregate';
import { appHealthMockAuthenticationInterfaceData } from './app-health-mock-authentication-interface.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockAuthenticationInterfaceSeeder extends MockSeeder<AppHealthAuthenticationInterface>
{
    public collectionSource: AppHealthAuthenticationInterface[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const authenticationInterface of _.orderBy(appHealthMockAuthenticationInterfaceData, ['id']))
        {
            this.collectionSource.push(
                AppHealthAuthenticationInterface.register(
                    new AppHealthAuthenticationInterfaceId(authenticationInterface.id),
                    new AppHealthAuthenticationInterfaceName(authenticationInterface.name),
                    new AppHealthAuthenticationInterfaceScore(authenticationInterface.score),
                    new AppHealthAuthenticationInterfaceCreatedAt({ currentTimestamp: true }),
                    new AppHealthAuthenticationInterfaceUpdatedAt({ currentTimestamp: true }),
                    new AppHealthAuthenticationInterfaceDeletedAt(null),
                ),
            );
        }
    }
}
