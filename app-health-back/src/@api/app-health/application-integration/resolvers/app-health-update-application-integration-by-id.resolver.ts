import { AppHealthUpdateApplicationIntegrationByIdHandler } from '@api/app-health/application-integration';
import { AppHealthApplicationIntegration, AppHealthUpdateApplicationIntegrationByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationIntegrationByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationIntegrationByIdHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationIntegrationById')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationIntegrationByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationIntegration>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
