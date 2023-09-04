/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthDeleteApplicationViewsService } from './app-health-delete-application-views.service';
import { AppHealthIApplicationViewRepository } from '../../domain/app-health-application-view.repository';
import { AppHealthMockApplicationViewRepository } from '../../infrastructure/mock/app-health-mock-application-view.repository';

describe('AppHealthDeleteApplicationViewsService', () =>
{
    let service: AppHealthDeleteApplicationViewsService;
    let repository: AppHealthIApplicationViewRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteApplicationViewsService,
                AppHealthMockApplicationViewRepository,
                {
                    provide : AppHealthIApplicationViewRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteApplicationViewsService);
        repository = module.get(AppHealthIApplicationViewRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationViewsService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete applicationView and emit event', async () =>
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
