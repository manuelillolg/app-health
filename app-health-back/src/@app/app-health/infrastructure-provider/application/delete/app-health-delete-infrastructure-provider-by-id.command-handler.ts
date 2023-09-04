import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteInfrastructureProviderByIdCommand } from './app-health-delete-infrastructure-provider-by-id.command';
import { AppHealthDeleteInfrastructureProviderByIdService } from './app-health-delete-infrastructure-provider-by-id.service';
import {
    AppHealthInfrastructureProviderId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteInfrastructureProviderByIdCommand)
export class AppHealthDeleteInfrastructureProviderByIdCommandHandler implements ICommandHandler<AppHealthDeleteInfrastructureProviderByIdCommand>
{
    constructor(
        private readonly deleteInfrastructureProviderByIdService: AppHealthDeleteInfrastructureProviderByIdService,
    ) {}

    async execute(command: AppHealthDeleteInfrastructureProviderByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteInfrastructureProviderByIdService.main(
            new AppHealthInfrastructureProviderId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
