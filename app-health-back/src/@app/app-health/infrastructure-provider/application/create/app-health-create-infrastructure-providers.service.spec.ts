/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthCreateInfrastructureProvidersService } from './app-health-create-infrastructure-providers.service';
import { AppHealthIInfrastructureProviderRepository } from '../../domain/app-health-infrastructure-provider.repository';
import { AppHealthMockInfrastructureProviderRepository } from '../../infrastructure/mock/app-health-mock-infrastructure-provider.repository';

describe('AppHealthCreateInfrastructureProvidersService', () =>
{
    let service: AppHealthCreateInfrastructureProvidersService;
    let mockRepository: AppHealthMockInfrastructureProviderRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateInfrastructureProvidersService,
                AppHealthMockInfrastructureProviderRepository,
                {
                    provide : AppHealthIInfrastructureProviderRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateInfrastructureProvidersService);
        mockRepository = module.get(AppHealthMockInfrastructureProviderRepository);
    });

    describe('main', () =>
    {
        test('CreateInfrastructureProvidersService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create infrastructureProviders and emit event', async () =>
        {
            expect(
                await service.main(
                    mockRepository.collectionSource,
                ),
            )
                .toBe(undefined);
        });
    });
});
