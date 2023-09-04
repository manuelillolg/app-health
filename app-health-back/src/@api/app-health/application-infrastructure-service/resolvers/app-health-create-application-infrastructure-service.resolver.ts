import { AppHealthCreateApplicationInfrastructureServiceHandler } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService, AppHealthCreateApplicationInfrastructureServiceInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateApplicationInfrastructureServiceResolver
{
    constructor(
        private readonly handler: AppHealthCreateApplicationInfrastructureServiceHandler,
    ) {}

    @Mutation('appHealthCreateApplicationInfrastructureService')
    async main(
        @Args('payload') payload: AppHealthCreateApplicationInfrastructureServiceInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
