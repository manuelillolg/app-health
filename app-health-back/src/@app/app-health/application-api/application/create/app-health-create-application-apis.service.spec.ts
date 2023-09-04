/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthCreateApplicationApisService } from './app-health-create-application-apis.service';
import { AppHealthIApplicationApiRepository } from '../../domain/app-health-application-api.repository';
import { AppHealthMockApplicationApiRepository } from '../../infrastructure/mock/app-health-mock-application-api.repository';

describe('AppHealthCreateApplicationApisService', () =>
{
    let service: AppHealthCreateApplicationApisService;
    let mockRepository: AppHealthMockApplicationApiRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateApplicationApisService,
                AppHealthMockApplicationApiRepository,
                {
                    provide : AppHealthIApplicationApiRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateApplicationApisService);
        mockRepository = module.get(AppHealthMockApplicationApiRepository);
    });

    describe('main', () =>
    {
        test('CreateApplicationApisService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create applicationApis and emit event', async () =>
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
