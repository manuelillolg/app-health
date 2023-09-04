import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteAuthenticationInterfaceByIdCommand } from './app-health-delete-authentication-interface-by-id.command';
import { AppHealthDeleteAuthenticationInterfaceByIdService } from './app-health-delete-authentication-interface-by-id.service';
import {
    AppHealthAuthenticationInterfaceId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteAuthenticationInterfaceByIdCommand)
export class AppHealthDeleteAuthenticationInterfaceByIdCommandHandler implements ICommandHandler<AppHealthDeleteAuthenticationInterfaceByIdCommand>
{
    constructor(
        private readonly deleteAuthenticationInterfaceByIdService: AppHealthDeleteAuthenticationInterfaceByIdService,
    ) {}

    async execute(command: AppHealthDeleteAuthenticationInterfaceByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAuthenticationInterfaceByIdService.main(
            new AppHealthAuthenticationInterfaceId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
