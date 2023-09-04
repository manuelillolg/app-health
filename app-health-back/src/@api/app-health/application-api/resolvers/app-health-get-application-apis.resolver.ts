import { AppHealthGetApplicationApisHandler } from '@api/app-health/application-api';
import { AppHealthApplicationApi } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthGetApplicationApisResolver
{
    constructor(
        private readonly handler: AppHealthGetApplicationApisHandler,
    ) {}

    @Query('appHealthGetApplicationApis')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationApi[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
