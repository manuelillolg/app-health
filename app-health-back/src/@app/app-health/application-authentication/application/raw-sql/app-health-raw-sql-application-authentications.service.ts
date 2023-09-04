import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AppHealthIApplicationAuthenticationRepository } from '../../domain/app-health-application-authentication.repository';
import { AppHealthApplicationAuthentication } from '../../domain/app-health-application-authentication.aggregate';

@Injectable()
export class AppHealthRawSQLApplicationAuthenticationsService
{
    constructor(
        private readonly repository: AppHealthIApplicationAuthenticationRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AppHealthApplicationAuthentication[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
