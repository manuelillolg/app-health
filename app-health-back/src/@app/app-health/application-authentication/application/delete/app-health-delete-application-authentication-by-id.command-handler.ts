import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationAuthenticationByIdCommand } from './app-health-delete-application-authentication-by-id.command';
import { AppHealthDeleteApplicationAuthenticationByIdService } from './app-health-delete-application-authentication-by-id.service';
import {
    AppHealthApplicationAuthenticationId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteApplicationAuthenticationByIdCommand)
export class AppHealthDeleteApplicationAuthenticationByIdCommandHandler implements ICommandHandler<AppHealthDeleteApplicationAuthenticationByIdCommand>
{
    constructor(
        private readonly deleteApplicationAuthenticationByIdService: AppHealthDeleteApplicationAuthenticationByIdService,
    ) {}

    async execute(command: AppHealthDeleteApplicationAuthenticationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationAuthenticationByIdService.main(
            new AppHealthApplicationAuthenticationId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
