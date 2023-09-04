import { AppHealthDeletedAuthorizationInterfaceEvent } from './app-health-deleted-authorization-interface.event';

export class AppHealthDeletedAuthorizationInterfacesEvent
{
    constructor(
        public readonly authorizationInterfaces: AppHealthDeletedAuthorizationInterfaceEvent[],
    ) {}
}
