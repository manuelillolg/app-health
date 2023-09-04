import { AppHealthDeletedAuthenticationInterfaceEvent } from './app-health-deleted-authentication-interface.event';

export class AppHealthDeletedAuthenticationInterfacesEvent
{
    constructor(
        public readonly authenticationInterfaces: AppHealthDeletedAuthenticationInterfaceEvent[],
    ) {}
}
