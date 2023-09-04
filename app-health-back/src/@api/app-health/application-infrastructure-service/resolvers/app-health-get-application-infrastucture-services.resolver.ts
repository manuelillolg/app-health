import { AppHealthGetApplicationInfrastuctureServicesHandler } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthGetApplicationInfrastuctureServicesResolver
{
    constructor(
        private readonly handler: AppHealthGetApplicationInfrastuctureServicesHandler,
    ) {}

    @Query('appHealthGetApplicationInfrastuctureServices')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
