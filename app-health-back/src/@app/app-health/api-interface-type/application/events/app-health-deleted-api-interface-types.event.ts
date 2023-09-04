import { AppHealthDeletedApiInterfaceTypeEvent } from './app-health-deleted-api-interface-type.event';

export class AppHealthDeletedApiInterfaceTypesEvent
{
    constructor(
        public readonly apiInterfaceTypes: AppHealthDeletedApiInterfaceTypeEvent[],
    ) {}
}
