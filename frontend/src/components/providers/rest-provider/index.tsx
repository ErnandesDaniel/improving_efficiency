'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { broadcastQueryClient } from '@tanstack/query-broadcast-client-experimental';
import {PropsWithChildren, useContext, useEffect, useMemo} from "react";
import { NotificationContext } from '@/components/providers/notification-provider';
import {isNil} from "lodash-es";
import {REQUEST_ERROR} from "@/components/providers/rest-provider/templates";
import type { ArgsProps } from 'antd/es/notification/interface';

//
// Пример использования
//
// const { mutateAsync: getProfileReport } = useGenProfileReport({
//     mutation: {
//         meta: {
//             errorTemplate: {
//                 description: '',
//                 duration: 30,
//                 placement: 'bottomRight',
//                 title:
//                     'Не удалось скачать отчет по сотруднику. Пожалуйста, попробуйте еще раз или свяжитесь с технической поддержкой'
//             }
//         }
//     }
// });
//
// return hook(
//     userId,
//     {
//         page: currentPage,
//         size: 10
//     },
//     {
//         query: {
//             meta: {
//                 errorTemplate: {
//                     description: '',
//                     duration: 30,
//                     placement: 'bottomRight',
//                     title: 'ошибка во время запроса списка встреч'
//                 }
//             }
//         }
//     }
// );
//

const RestProvider = ({children}:PropsWithChildren) => {

    const providedNotificationApi = useContext(NotificationContext);

    const queryClient = useMemo(() => {
        const client = new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: Infinity,
                    refetchOnWindowFocus: false,
                    retry: false
                },
            },
        });

        broadcastQueryClient({
            queryClient: client,
            broadcastChannel: 'ai-graph-chats',
        });

        return client;
    }, []);

    useEffect(
        () =>
            queryClient.getQueryCache().subscribe((event) => {
                if (event?.type === 'updated' && event.action.type === 'error') {
                    if (isNil(event.query.meta?.errorTemplate)) {
                        providedNotificationApi?.error(REQUEST_ERROR);
                    } else {
                        providedNotificationApi?.error(event.query.meta?.errorTemplate as ArgsProps);
                    }
                }
            }),
        [queryClient, providedNotificationApi]
    );

    useEffect(
        () =>
            queryClient.getMutationCache().subscribe((event) => {
                if (
                    event?.type === 'updated' &&
                    event.action.type === 'error' &&
                    event.mutation.meta?.isShowErrorNotification !== false
                ) {
                    if (isNil(event.mutation.meta?.errorTemplate)) {
                        providedNotificationApi?.error(REQUEST_ERROR);
                    } else {
                        providedNotificationApi?.error(event.mutation.meta?.errorTemplate as ArgsProps);
                    }
                }
            }),
        [queryClient, providedNotificationApi]
    );

    return (<QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>);
}

export default RestProvider;