import { IconType } from "react-icons";

export type Professional = {
    employee_id: string;
    firstname: string;
    lastname: string;
    email: string;
    imageSrc: string;
    phonenumber: string;
    created_time: string;
    updated_time: string;
}

export type Service = {
    service_id: string;
    title: string;
    description: string;
    service_duration: number;
    price: number;
    created_time: string;
    updated_time: string;
    
}

export type Schedule = {
    updated_time: string;
    employee_id: string;
    scheduled_date: string;
    start_time: string;
    end_time: string;
    schedule_id: string;
    created_time: string;
}

export type Customer = {
    customer_name: string;
    customer_email: string;
    customer_phone: string;

}

export type OrderDetails = {
    appointment_id: string;
    appointment_date: string;
    cancelled: boolean;
    cancellation_reason: string;
    payment_confirmed: boolean;
    services: string[];
    start_time: string;
    service_total: number;
    tax_amount: number;
    tip_amount: number;
    total_amount: number;
    total_duration: number;
    customer_email: string;
    customer_name: string;
    customer_phone: string;
    employee_firstname: string;
    employee_lastname: string;
    employee_image: string;
}

export type TimeBlock = {
    time: string;
    is_available: boolean;
    icon: IconType;
}