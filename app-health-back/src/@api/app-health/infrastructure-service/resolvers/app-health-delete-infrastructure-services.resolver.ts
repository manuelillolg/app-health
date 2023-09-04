import { AppHealthDeleteInfrastructureServicesHandler } from '@api/app-health/infrastructure-service';
import { AppHealthInfrastructureService } from '@api/graphql';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppHealthDeleteInfrastructureServicesResolver
{
    constructor(
        private readonly handler: AppHealthDeleteInfrastructureServicesHandler,
    ) {}

    @Mutation('appHealthDeleteInfrastructureServices')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<AppHealthInfrastructureService[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}
