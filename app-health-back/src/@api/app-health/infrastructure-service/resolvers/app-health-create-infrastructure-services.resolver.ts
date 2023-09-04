import { AppHealthCreateInfrastructureServicesHandler } from '@api/app-health/infrastructure-service';
import { AppHealthCreateInfrastructureServiceInput } from '@api/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthCreateInfrastructureServicesResolver
{
    constructor(
        private readonly handler: AppHealthCreateInfrastructureServicesHandler,
    ) {}

    @Mutation('appHealthCreateInfrastructureServices')
    async main(
        @Args('payload') payload: AppHealthCreateInfrastructureServiceInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}
