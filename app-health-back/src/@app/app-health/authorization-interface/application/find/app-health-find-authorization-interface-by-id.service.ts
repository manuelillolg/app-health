import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthIAuthorizationInterfaceRepository } from '../../domain/app-health-authorization-interface.repository';
import { AppHealthAuthorizationInterface } from '../../domain/app-health-authorization-interface.aggregate';
import { AppHealthAuthorizationInterfaceId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindAuthorizationInterfaceByIdService
{
    constructor(
        private readonly repository: AppHealthIAuthorizationInterfaceRepository,
    ) {}

    async main(
        id: AppHealthAuthorizationInterfaceId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthAuthorizationInterface>
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
