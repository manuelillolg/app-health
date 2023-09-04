/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus, UnhandledExceptionBus } from '@nestjs/cqrs';

// custom items
import { AppHealthDeleteApplicationApisService } from './app-health-delete-application-apis.service';
import { AppHealthIApplicationApiRepository } from '../../domain/app-health-application-api.repository';
import { AppHealthMockApplicationApiRepository } from '../../infrastructure/mock/app-health-mock-application-api.repository';

describe('AppHealthDeleteApplicationApisService', () =>
{
    let service: AppHealthDeleteApplicationApisService;
    let repository: AppHealthIApplicationApiRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                UnhandledExceptionBus,
                AppHealthDeleteApplicationApisService,
                AppHealthMockApplicationApiRepository,
                {
                    provide : AppHealthIApplicationApiRepository,
                    useValue: {
                        get   : () => { /**/ },
                        delete: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        service = module.get(AppHealthDeleteApplicationApisService);
        repository = module.get(AppHealthIApplicationApiRepository);
    });

    describe('main', () =>
    {
        test('AppHealthDeleteApplicationApisService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should delete applicationApi and emit event', async () =>
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
