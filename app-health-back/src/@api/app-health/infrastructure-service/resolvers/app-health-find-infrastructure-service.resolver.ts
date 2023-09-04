import { AppHealthFindInfrastructureServiceHandler } from '@api/app-health/infrastructure-service';
import { AppHealthInfrastructureService } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindInfrastructureServiceResolver
{
    constructor(
        private readonly handler: AppHealthFindInfrastructureServiceHandler,
    ) {}

    @Query('appHealthFindInfrastructureService')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthInfrastructureService>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
