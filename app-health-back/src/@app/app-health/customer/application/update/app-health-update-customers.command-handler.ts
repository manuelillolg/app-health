/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AppHealthUpdateCustomersCommand } from './app-health-update-customers.command';
import { AppHealthUpdateCustomersService } from './app-health-update-customers.service';
import {
    AppHealthCustomerId,
    AppHealthCustomerName,
    AppHealthCustomerCreatedAt,
    AppHealthCustomerUpdatedAt,
    AppHealthCustomerDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(AppHealthUpdateCustomersCommand)
export class AppHealthUpdateCustomersCommandHandler implements ICommandHandler<AppHealthUpdateCustomersCommand>
{
    constructor(
        private readonly updateCustomersService: AppHealthUpdateCustomersService,
    ) {}

    async execute(command: AppHealthUpdateCustomersCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateCustomersService.main(
            {
                id: new AppHealthCustomerId(command.payload.id, { undefinable: true }),
                name: new AppHealthCustomerName(command.payload.name, { undefinable: true }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
