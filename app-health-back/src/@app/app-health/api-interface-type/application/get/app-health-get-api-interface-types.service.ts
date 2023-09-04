import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApiInterfaceTypeRepository } from '../../domain/app-health-api-interface-type.repository';
import { AppHealthApiInterfaceType } from '../../domain/app-health-api-interface-type.aggregate';

@Injectable()
export class AppHealthGetApiInterfaceTypesService
{
    constructor(
        private readonly repository: AppHealthIApiInterfaceTypeRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApiInterfaceType[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
