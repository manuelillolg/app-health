import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteCustomersCommand } from './app-health-delete-customers.command';
import { AppHealthDeleteCustomersService } from './app-health-delete-customers.service';

@CommandHandler(AppHealthDeleteCustomersCommand)
export class AppHealthDeleteCustomersCommandHandler implements ICommandHandler<AppHealthDeleteCustomersCommand>
{
    constructor(
        private readonly deleteCustomersService: AppHealthDeleteCustomersService,
    ) {}

    async execute(command: AppHealthDeleteCustomersCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteCustomersService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
