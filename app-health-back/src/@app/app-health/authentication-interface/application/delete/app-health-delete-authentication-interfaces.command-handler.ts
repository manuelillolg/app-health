import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteAuthenticationInterfacesCommand } from './app-health-delete-authentication-interfaces.command';
import { AppHealthDeleteAuthenticationInterfacesService } from './app-health-delete-authentication-interfaces.service';

@CommandHandler(AppHealthDeleteAuthenticationInterfacesCommand)
export class AppHealthDeleteAuthenticationInterfacesCommandHandler implements ICommandHandler<AppHealthDeleteAuthenticationInterfacesCommand>
{
    constructor(
        private readonly deleteAuthenticationInterfacesService: AppHealthDeleteAuthenticationInterfacesService,
    ) {}

    async execute(command: AppHealthDeleteAuthenticationInterfacesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAuthenticationInterfacesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
