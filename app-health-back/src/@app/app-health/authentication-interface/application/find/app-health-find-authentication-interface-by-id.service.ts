import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthIAuthenticationInterfaceRepository } from '../../domain/app-health-authentication-interface.repository';
import { AppHealthAuthenticationInterface } from '../../domain/app-health-authentication-interface.aggregate';
import { AppHealthAuthenticationInterfaceId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindAuthenticationInterfaceByIdService
{
    constructor(
        private readonly repository: AppHealthIAuthenticationInterfaceRepository,
    ) {}

    async main(
        id: AppHealthAuthenticationInterfaceId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthAuthenticationInterface>
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
