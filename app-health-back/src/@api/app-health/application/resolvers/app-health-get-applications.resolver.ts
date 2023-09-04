import { AppHealthGetApplicationsHandler } from '@api/app-health/application';
import { AppHealthApplication } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthGetApplicationsResolver
{
    constructor(
        private readonly handler: AppHealthGetApplicationsHandler,
    ) {}

    @Query('appHealthGetApplications')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplication[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
