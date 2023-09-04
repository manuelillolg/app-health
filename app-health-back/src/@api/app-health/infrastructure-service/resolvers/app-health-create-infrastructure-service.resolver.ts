import { AppHealthCreateInfrastructureServiceHandler } from '@api/app-health/infrastructure-service';
import { AppHealthCreateInfrastructureServiceInput, AppHealthInfrastructureService } from '@api/graphql';
import { Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateInfrastructureServiceResolver
{
    constructor(
        private readonly handler: AppHealthCreateInfrastructureServiceHandler,
    ) {}

    @Mutation('appHealthCreateInfrastructureService')
    async main(
        @Args('payload') payload: AppHealthCreateInfrastructureServiceInput,
        @Timezone() timezone?: string,
    ): Promise<AppHealthInfrastructureService>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
