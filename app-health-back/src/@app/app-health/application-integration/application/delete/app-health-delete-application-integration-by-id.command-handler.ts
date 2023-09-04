import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationIntegrationByIdCommand } from './app-health-delete-application-integration-by-id.command';
import { AppHealthDeleteApplicationIntegrationByIdService } from './app-health-delete-application-integration-by-id.service';
import {
    AppHealthApplicationIntegrationId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteApplicationIntegrationByIdCommand)
export class AppHealthDeleteApplicationIntegrationByIdCommandHandler implements ICommandHandler<AppHealthDeleteApplicationIntegrationByIdCommand>
{
    constructor(
        private readonly deleteApplicationIntegrationByIdService: AppHealthDeleteApplicationIntegrationByIdService,
    ) {}

    async execute(command: AppHealthDeleteApplicationIntegrationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationIntegrationByIdService.main(
            new AppHealthApplicationIntegrationId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
