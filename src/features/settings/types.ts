export interface MirthInstance {
    id: string;
    name: string;
    url: string;
    username: string;
    password: string;
}

export interface InstanceConfig {
    instances: MirthInstance[];
}
