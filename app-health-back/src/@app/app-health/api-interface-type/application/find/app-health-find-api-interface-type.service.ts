import { AppHealthApiInterfaceType, AppHealthIApiInterfaceTypeRepository } from '@app/app-health/api-interface-type';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppHealthFindApiInterfaceTypeService
{
    constructor(
        private readonly repository: AppHealthIApiInterfaceTypeRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApiInterfaceType>
    {
        return await this.repository.find(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
