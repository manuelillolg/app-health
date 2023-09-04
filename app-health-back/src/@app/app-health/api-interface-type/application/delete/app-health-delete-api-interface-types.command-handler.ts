import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApiInterfaceTypesCommand } from './app-health-delete-api-interface-types.command';
import { AppHealthDeleteApiInterfaceTypesService } from './app-health-delete-api-interface-types.service';

@CommandHandler(AppHealthDeleteApiInterfaceTypesCommand)
export class AppHealthDeleteApiInterfaceTypesCommandHandler implements ICommandHandler<AppHealthDeleteApiInterfaceTypesCommand>
{
    constructor(
        private readonly deleteApiInterfaceTypesService: AppHealthDeleteApiInterfaceTypesService,
    ) {}

    async execute(command: AppHealthDeleteApiInterfaceTypesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApiInterfaceTypesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
