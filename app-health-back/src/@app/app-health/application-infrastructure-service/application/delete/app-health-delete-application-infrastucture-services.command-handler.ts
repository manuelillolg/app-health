import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationInfrastuctureServicesCommand } from './app-health-delete-application-infrastucture-services.command';
import { AppHealthDeleteApplicationInfrastuctureServicesService } from './app-health-delete-application-infrastucture-services.service';

@CommandHandler(AppHealthDeleteApplicationInfrastuctureServicesCommand)
export class AppHealthDeleteApplicationInfrastuctureServicesCommandHandler implements ICommandHandler<AppHealthDeleteApplicationInfrastuctureServicesCommand>
{
    constructor(
        private readonly deleteApplicationInfrastuctureServicesService: AppHealthDeleteApplicationInfrastuctureServicesService,
    ) {}

    async execute(command: AppHealthDeleteApplicationInfrastuctureServicesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationInfrastuctureServicesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
