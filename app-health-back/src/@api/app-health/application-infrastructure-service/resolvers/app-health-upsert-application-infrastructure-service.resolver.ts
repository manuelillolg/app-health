import { AppHealthUpsertApplicationInfrastructureServiceHandler } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService, AppHealthUpdateApplicationInfrastructureServiceByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertApplicationInfrastructureServiceResolver
{
    constructor(
        private readonly handler: AppHealthUpsertApplicationInfrastructureServiceHandler,
    ) {}

    @Mutation('appHealthUpsertApplicationInfrastructureService')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationInfrastructureServiceByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
