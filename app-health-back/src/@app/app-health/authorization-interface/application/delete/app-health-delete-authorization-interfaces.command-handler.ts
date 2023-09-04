import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteAuthorizationInterfacesCommand } from './app-health-delete-authorization-interfaces.command';
import { AppHealthDeleteAuthorizationInterfacesService } from './app-health-delete-authorization-interfaces.service';

@CommandHandler(AppHealthDeleteAuthorizationInterfacesCommand)
export class AppHealthDeleteAuthorizationInterfacesCommandHandler implements ICommandHandler<AppHealthDeleteAuthorizationInterfacesCommand>
{
    constructor(
        private readonly deleteAuthorizationInterfacesService: AppHealthDeleteAuthorizationInterfacesService,
    ) {}

    async execute(command: AppHealthDeleteAuthorizationInterfacesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAuthorizationInterfacesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
