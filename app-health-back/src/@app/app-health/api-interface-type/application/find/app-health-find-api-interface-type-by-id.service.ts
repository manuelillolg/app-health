import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthIApiInterfaceTypeRepository } from '../../domain/app-health-api-interface-type.repository';
import { AppHealthApiInterfaceType } from '../../domain/app-health-api-interface-type.aggregate';
import { AppHealthApiInterfaceTypeId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindApiInterfaceTypeByIdService
{
    constructor(
        private readonly repository: AppHealthIApiInterfaceTypeRepository,
    ) {}

    async main(
        id: AppHealthApiInterfaceTypeId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApiInterfaceType>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
