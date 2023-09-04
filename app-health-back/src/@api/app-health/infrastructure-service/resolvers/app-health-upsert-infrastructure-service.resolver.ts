import { AppHealthUpsertInfrastructureServiceHandler } from '@api/app-health/infrastructure-service';
import { AppHealthInfrastructureService, AppHealthUpdateInfrastructureServiceByIdInput } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpsertInfrastructureServiceResolver
{
    constructor(
        private readonly handler: AppHealthUpsertInfrastructureServiceHandler,
    ) {}

    @Mutation('appHealthUpsertInfrastructureService')
    async main(
        @Args('payload') payload: AppHealthUpdateInfrastructureServiceByIdInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthInfrastructureService>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
