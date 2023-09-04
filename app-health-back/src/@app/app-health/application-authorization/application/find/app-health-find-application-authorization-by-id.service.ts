import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthIApplicationAuthorizationRepository } from '../../domain/app-health-application-authorization.repository';
import { AppHealthApplicationAuthorization } from '../../domain/app-health-application-authorization.aggregate';
import { AppHealthApplicationAuthorizationId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindApplicationAuthorizationByIdService
{
    constructor(
        private readonly repository: AppHealthIApplicationAuthorizationRepository,
    ) {}

    async main(
        id: AppHealthApplicationAuthorizationId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationAuthorization>
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
