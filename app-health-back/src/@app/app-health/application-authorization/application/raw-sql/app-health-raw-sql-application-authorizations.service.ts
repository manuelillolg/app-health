import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApplicationAuthorizationRepository } from '../../domain/app-health-application-authorization.repository';
import { AppHealthApplicationAuthorization } from '../../domain/app-health-application-authorization.aggregate';

@Injectable()
export class AppHealthRawSQLApplicationAuthorizationsService
{
    constructor(
        private readonly repository: AppHealthIApplicationAuthorizationRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationAuthorization[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
