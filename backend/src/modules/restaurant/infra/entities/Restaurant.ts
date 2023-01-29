import { nanoid } from "nanoid";




class Restaurant {
    uuid!: string;
    name!: string;
    opened_at!: Array<string>;
    image!: string;
    rate!: string;
    location!: string;
    description!: string;

    constructor(){
        this.uuid = !!!this.uuid && nanoid(32) || this.uuid
    }
}

export { Restaurant }