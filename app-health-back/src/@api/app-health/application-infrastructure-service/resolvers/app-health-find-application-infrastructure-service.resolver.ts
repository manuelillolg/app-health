import { AppHealthFindApplicationInfrastructureServiceHandler } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthFindApplicationInfrastructureServiceResolver
{
    constructor(
        private readonly handler: AppHealthFindApplicationInfrastructureServiceHandler,
    ) {}

    @Query('appHealthFindApplicationInfrastructureService')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
