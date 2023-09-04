import { AppHealthUpdateInfrastructureServiceByIdHandler } from '@api/app-health/infrastructure-service';
import { AppHealthInfrastructureService, AppHealthUpdateInfrastructureServiceByIdInput } from '@api/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthUpdateInfrastructureServiceByIdResolver
{
    constructor(
        private readonly handler: AppHealthUpdateInfrastructureServiceByIdHandler,
    ) {}

    @Mutation('appHealthUpdateInfrastructureServiceById')
    async main(
        @Args('payload') payload: AppHealthUpdateInfrastructureServiceByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthInfrastructureService>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}
