import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AppHealthIApplicationAuthenticationRepository } from '../../domain/app-health-application-authentication.repository';
import { AppHealthApplicationAuthentication } from '../../domain/app-health-application-authentication.aggregate';
import { AppHealthApplicationAuthenticationId } from '../../domain/value-objects';

@Injectable()
export class AppHealthFindApplicationAuthenticationByIdService
{
    constructor(
        private readonly repository: AppHealthIApplicationAuthenticationRepository,
    ) {}

    async main(
        id: AppHealthApplicationAuthenticationId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationAuthentication>
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
