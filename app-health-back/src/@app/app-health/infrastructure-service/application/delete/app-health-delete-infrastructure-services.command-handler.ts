import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteInfrastructureServicesCommand } from './app-health-delete-infrastructure-services.command';
import { AppHealthDeleteInfrastructureServicesService } from './app-health-delete-infrastructure-services.service';

@CommandHandler(AppHealthDeleteInfrastructureServicesCommand)
export class AppHealthDeleteInfrastructureServicesCommandHandler implements ICommandHandler<AppHealthDeleteInfrastructureServicesCommand>
{
    constructor(
        private readonly deleteInfrastructureServicesService: AppHealthDeleteInfrastructureServicesService,
    ) {}

    async execute(command: AppHealthDeleteInfrastructureServicesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteInfrastructureServicesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
