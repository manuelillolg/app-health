import { AppHealthUpdateApplicationInfrastructureServiceByIdHandler } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService, AppHealthUpdateApplicationInfrastructureServiceByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateApplicationInfrastructureServiceByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateApplicationInfrastructureServiceByIdHandler,
    ) {}

    @Mutation('appHealthUpdateApplicationInfrastructureServiceById')
    async main(
        @Args('payload') payload: AppHealthUpdateApplicationInfrastructureServiceByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
