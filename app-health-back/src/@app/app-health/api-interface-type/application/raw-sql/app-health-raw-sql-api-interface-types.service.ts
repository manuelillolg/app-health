import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApiInterfaceTypeRepository } from '../../domain/app-health-api-interface-type.repository';
import { AppHealthApiInterfaceType } from '../../domain/app-health-api-interface-type.aggregate';

@Injectable()
export class AppHealthRawSQLApiInterfaceTypesService
{
    constructor(
        private readonly repository: AppHealthIApiInterfaceTypeRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApiInterfaceType[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
