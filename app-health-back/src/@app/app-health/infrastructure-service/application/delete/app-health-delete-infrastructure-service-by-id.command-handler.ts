import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteInfrastructureServiceByIdCommand } from './app-health-delete-infrastructure-service-by-id.command';
import { AppHealthDeleteInfrastructureServiceByIdService } from './app-health-delete-infrastructure-service-by-id.service';
import {
    AppHealthInfrastructureServiceId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteInfrastructureServiceByIdCommand)
export class AppHealthDeleteInfrastructureServiceByIdCommandHandler implements ICommandHandler<AppHealthDeleteInfrastructureServiceByIdCommand>
{
    constructor(
        private readonly deleteInfrastructureServiceByIdService: AppHealthDeleteInfrastructureServiceByIdService,
    ) {}

    async execute(command: AppHealthDeleteInfrastructureServiceByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteInfrastructureServiceByIdService.main(
            new AppHealthInfrastructureServiceId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
