import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIAuthenticationInterfaceRepository } from '../../domain/app-health-authentication-interface.repository';
import { AppHealthAuthenticationInterface } from '../../domain/app-health-authentication-interface.aggregate';

@Injectable()
export class AppHealthRawSQLAuthenticationInterfacesService
{
    constructor(
        private readonly repository: AppHealthIAuthenticationInterfaceRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthAuthenticationInterface[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
