import { AppHealthCreatedApiInterfaceTypeEvent } from './app-health-created-api-interface-type.event';

export class AppHealthCreatedApiInterfaceTypesEvent
{
    constructor(
        public readonly apiInterfaceTypes: AppHealthCreatedApiInterfaceTypeEvent[],
    ) {}
}
