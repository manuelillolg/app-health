/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthDeleteInfrastructureProvidersService } from './app-health-delete-infrastructure-providers.service';
import { AppHealthIInfrastructureProviderRepository } from '../../domain/app-health-infrastructure-provider.repository';
import { AppHealthMockInfrastructureProviderRepository } from '../../infrastructure/mock/app-health-mock-infrastructure-provider.repository';

describe('AppHealthDeleteInfrastructureProvidersService', () =>
{
    let service: AppHealthDeleteInfrastructureProvidersService;
    let repository: AppHealthIInfrastructureProviderRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteInfrastructureProvidersService,
                AppHealthMockInfrastructureProviderRepository,
                {
                    provide : AppHealthIInfrastructureProviderRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteInfrastructureProvidersService);
        repository = module.get(AppHealthIInfrastructureProviderRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteInfrastructureProvidersService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete infrastructureProvider and emit event', async () =>
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(
                await service.main(
                    {},
                    {},
                ),
            )
                .toBe(undefined);
        });
    });
});
