import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteApiInterfaceTypeByIdCommand } from './app-health-delete-api-interface-type-by-id.command';
import { AppHealthDeleteApiInterfaceTypeByIdService } from './app-health-delete-api-interface-type-by-id.service';
import {
    AppHealthApiInterfaceTypeId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteApiInterfaceTypeByIdCommand)
export class AppHealthDeleteApiInterfaceTypeByIdCommandHandler implements ICommandHandler<AppHealthDeleteApiInterfaceTypeByIdCommand>
{
    constructor(
        private readonly deleteApiInterfaceTypeByIdService: AppHealthDeleteApiInterfaceTypeByIdService,
    ) {}

    async execute(command: AppHealthDeleteApiInterfaceTypeByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteApiInterfaceTypeByIdService.main(
            new AppHealthApiInterfaceTypeId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
