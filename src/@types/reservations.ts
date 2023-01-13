export type ReservationsProps = {
    id: string;
    date: string;
    hour: string;
    draft: boolean;
    status: boolean;
    user_id: string;
    service_id: string;
    users: {
        id: string;
        name: string;
        email: string;
        admin: boolean;
    },
    services: {
        id: string;
        name: string;
        price: string;
        category_id: string;
    }
}