import { AppHealthUpdateInfrastructureServicesHandler } from '@api/app-health/infrastructure-service';
import { AppHealthInfrastructureService, AppHealthUpdateInfrastructureServicesInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateInfrastructureServicesResolver
{
    constructor(
        private readonly handler: AppHealthUpdateInfrastructureServicesHandler,
    ) {}

    @Mutation('appHealthUpdateInfrastructureServices')
    async main(
        @Args('payload') payload: AppHealthUpdateInfrastructureServicesInput,
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthInfrastructureService>
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}
