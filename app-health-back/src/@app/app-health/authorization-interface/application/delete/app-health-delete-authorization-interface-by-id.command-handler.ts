import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteAuthorizationInterfaceByIdCommand } from './app-health-delete-authorization-interface-by-id.command';
import { AppHealthDeleteAuthorizationInterfaceByIdService } from './app-health-delete-authorization-interface-by-id.service';
import {
    AppHealthAuthorizationInterfaceId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteAuthorizationInterfaceByIdCommand)
export class AppHealthDeleteAuthorizationInterfaceByIdCommandHandler implements ICommandHandler<AppHealthDeleteAuthorizationInterfaceByIdCommand>
{
    constructor(
        private readonly deleteAuthorizationInterfaceByIdService: AppHealthDeleteAuthorizationInterfaceByIdService,
    ) {}

    async execute(command: AppHealthDeleteAuthorizationInterfaceByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteAuthorizationInterfaceByIdService.main(
            new AppHealthAuthorizationInterfaceId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
