import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApplicationAuthorizationByIdCommand } from './app-health-delete-application-authorization-by-id.command';
import { AppHealthDeleteApplicationAuthorizationByIdService } from './app-health-delete-application-authorization-by-id.service';
import {
    AppHealthApplicationAuthorizationId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteApplicationAuthorizationByIdCommand)
export class AppHealthDeleteApplicationAuthorizationByIdCommandHandler implements ICommandHandler<AppHealthDeleteApplicationAuthorizationByIdCommand>
{
    constructor(
        private readonly deleteApplicationAuthorizationByIdService: AppHealthDeleteApplicationAuthorizationByIdService,
    ) {}

    async execute(command: AppHealthDeleteApplicationAuthorizationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApplicationAuthorizationByIdService.main(
            new AppHealthApplicationAuthorizationId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
