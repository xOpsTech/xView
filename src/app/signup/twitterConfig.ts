export class TwitterConfig {

    constructor(
        public serviceId: string,
        public consumer_key: string,
        public consumer_secret: string,
        public access_token: string,
        public active: boolean
    ) { }

}