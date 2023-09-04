import { AppHealthUpdateApplicationInfrastuctureServicesHandler } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService, AppHealthUpdateApplicationInfrastuctureServicesInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationInfrastuctureServicesResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationInfrastuctureServicesHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationInfrastuctureServices')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationInfrastuctureServicesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
