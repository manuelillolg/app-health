import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationInfrastructureServiceByIdCommand } from './app-health-delete-application-infrastructure-service-by-id.command';
import { AppHealthDeleteApplicationInfrastructureServiceByIdService } from './app-health-delete-application-infrastructure-service-by-id.service';
import {
    AppHealthApplicationInfrastructureServiceId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteApplicationInfrastructureServiceByIdCommand)
export class AppHealthDeleteApplicationInfrastructureServiceByIdCommandHandler implements ICommandHandler<AppHealthDeleteApplicationInfrastructureServiceByIdCommand>
{
    constructor(
        private readonly deleteApplicationInfrastructureServiceByIdService: AppHealthDeleteApplicationInfrastructureServiceByIdService,
    ) {}

    async execute(command: AppHealthDeleteApplicationInfrastructureServiceByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationInfrastructureServiceByIdService.main(
            new AppHealthApplicationInfrastructureServiceId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
