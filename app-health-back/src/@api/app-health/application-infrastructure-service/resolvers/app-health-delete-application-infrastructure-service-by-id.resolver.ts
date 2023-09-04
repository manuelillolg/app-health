import { AppHealthDeleteApplicationInfrastructureServiceByIdHandler } from '@api/app-health/application-infrastructure-service';
import { AppHealthApplicationInfrastructureService } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteApplicationInfrastructureServiceByIdResolver
{
    constructor(
        private readonly handler: AppHealthDeleteApplicationInfrastructureServiceByIdHandler,
    ) {}

    @Mutation('appHealthDeleteApplicationInfrastructureServiceById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthApplicationInfrastructureService>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}
