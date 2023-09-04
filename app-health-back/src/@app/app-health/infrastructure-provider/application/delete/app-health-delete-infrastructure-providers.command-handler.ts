import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteInfrastructureProvidersCommand } from './app-health-delete-infrastructure-providers.command';
import { AppHealthDeleteInfrastructureProvidersService } from './app-health-delete-infrastructure-providers.service';

@CommandHandler(AppHealthDeleteInfrastructureProvidersCommand)
export class AppHealthDeleteInfrastructureProvidersCommandHandler implements ICommandHandler<AppHealthDeleteInfrastructureProvidersCommand>
{
    constructor(
        private readonly deleteInfrastructureProvidersService: AppHealthDeleteInfrastructureProvidersService,
    ) {}

    async execute(command: AppHealthDeleteInfrastructureProvidersCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteInfrastructureProvidersService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
