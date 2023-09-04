import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthDeleteCustomerByIdCommand } from './app-health-delete-customer-by-id.command';
import { AppHealthDeleteCustomerByIdService } from './app-health-delete-customer-by-id.service';
import {
    AppHealthCustomerId
} from '../../domain/value-objects';

@CommandHandler(AppHealthDeleteCustomerByIdCommand)
export class AppHealthDeleteCustomerByIdCommandHandler implements ICommandHandler<AppHealthDeleteCustomerByIdCommand>
{
    constructor(
        private readonly deleteCustomerByIdService: AppHealthDeleteCustomerByIdService,
    ) {}

    async execute(command: AppHealthDeleteCustomerByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteCustomerByIdService.main(
            new AppHealthCustomerId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
