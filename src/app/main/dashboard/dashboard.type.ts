export interface Node {
    ip_address: string,
    base_url?: string,
    hostname?: string,
    operating_system?: string,
    cpu_usage: number,
    cpu_count: number,
    ram_usage: number,
    ram_total: number,
    ram_used: number,
    ram_free: number,
    disk_usage: number,
    disk_total: number,
    disk_used: number,
    disk_free: number,
    net_packets_sent: number,
    net_packets_received: number,
    created: string
}

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}