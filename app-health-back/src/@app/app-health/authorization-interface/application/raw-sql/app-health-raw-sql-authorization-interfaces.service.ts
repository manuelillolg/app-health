import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIAuthorizationInterfaceRepository } from '../../domain/app-health-authorization-interface.repository';
import { AppHealthAuthorizationInterface } from '../../domain/app-health-authorization-interface.aggregate';

@Injectable()
export class AppHealthRawSQLAuthorizationInterfacesService
{
    constructor(
        private readonly repository: AppHealthIAuthorizationInterfaceRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthAuthorizationInterface[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
