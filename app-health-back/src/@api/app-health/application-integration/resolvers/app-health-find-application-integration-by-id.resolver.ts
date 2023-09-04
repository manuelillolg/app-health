import { AppHealthFindApplicationIntegrationByIdHandler } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApplicationIntegrationByIdResolver
{
    constructor(
        private readonly handler: AppHealthFindApplicationIntegrationByIdHandler,
    ) {}

    @Query('appHealthFindApplicationIntegrationById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationIntegration>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
