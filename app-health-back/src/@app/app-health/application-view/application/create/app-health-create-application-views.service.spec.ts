/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthCreateApplicationViewsService } from './app-health-create-application-views.service';
import { AppHealthIApplicationViewRepository } from '../../domain/app-health-application-view.repository';
import { AppHealthMockApplicationViewRepository } from '../../infrastructure/mock/app-health-mock-application-view.repository';

describe('AppHealthCreateApplicationViewsService', () =>
{
    let service: AppHealthCreateApplicationViewsService;
    let mockRepository: AppHealthMockApplicationViewRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthCreateApplicationViewsService,
                AppHealthMockApplicationViewRepository,
                {
                    provide : AppHealthIApplicationViewRepository,
                    useValue: {
                        insert: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthCreateApplicationViewsService);
        mockRepository = module.get(AppHealthMockApplicationViewRepository);
    });

    describe('main', () =>
    {
        test('CreateApplicationViewsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create applicationViews and emit event', async () =>
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
