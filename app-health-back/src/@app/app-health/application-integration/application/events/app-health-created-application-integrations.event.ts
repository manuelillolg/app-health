import { AppHealthCreatedApplicationIntegrationEvent } from './app-health-created-application-integration.event';

export class AppHealthCreatedApplicationIntegrationsEvent
{
    constructor(
        public readonly applicationIntegrations: AppHealthCreatedApplicationIntegrationEvent[],
    ) {}
}
