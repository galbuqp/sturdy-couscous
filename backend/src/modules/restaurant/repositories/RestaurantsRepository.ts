import { Restaurant } from "../infra/entities/Restaurant";
import { I_RestaurantsRepository } from "./interfaces/I_RestaurantsRepository";
import fs from 'fs'
import path from 'path'
import * as CSV from 'csv-string'
import { I_FetchOptions } from "../dtos/I_FetchOptions.js";
import { I_CreateOptions } from "../dtos/I_CreateOptions.js";



class RestaurantsRepository implements I_RestaurantsRepository {
    private file: string
    private repository: Restaurant[] | null
    constructor(){
        this.file = fs.readFileSync(`${ path.resolve(__dirname)}/../../../data/restaurants.csv`,  'utf8')
        this.repository = null
        this.loadFile()
    }

    async remove(uuid: string): Promise<void | null> {
        if(!this.repository){
            return null
        }

        let fileData: string | string[] | string[][] = await this.loadFile()
        const exists = this.repository.find(x => x.uuid === uuid)
        if(!exists){
            return null
        }
        
        fileData = CSV.parse(fileData);
        const index = fileData.find( x => x[5] === uuid)
        if(index === undefined){
            return null
        }


        fileData = [ ...fileData.filter( x => x !== index ).map((item, key) => {
            if(key < 1){
                return item
            }
            const body = [...item]
            body[2] = `\"${ body[2] }\"`
            return body
        }) ]

        fs.writeFileSync(`${ path.resolve(__dirname)}/../../../data/restaurants.csv`, fileData.join("\r\n"))
        this.loadFile()
    }
    
    async loadFile(): Promise<string> {
        const data = fs.readFileSync(`${ path.resolve(__dirname)}/../../../data/restaurants.csv`,  'utf8');
        this.file = data
        this.parser()
        return data
    }

    async parser(): Promise<Restaurant[]> {
        const results = []
        const parsed = CSV.parse(this.file)
        for(const restaurant of parsed.slice(1)){
            const structure = { uuid: restaurant[5], name: restaurant[0], description: restaurant[2], image: restaurant[3], rate: parseFloat(restaurant[6]).toFixed(2), location: restaurant[4], opened_at: restaurant[1].split("-") }
            results.push(structure)
        }
        this.repository = results as Restaurant[]
        return results as Restaurant[]
    }

    async create({ uuid, name, description, image, rate, location, opened_at  }: any): Promise<Restaurant | null> {
        this.file = await this.loadFile()
        const restaurant = new Restaurant()
        const data: any = { name, description, image, rate, location, opened_at }
        if(uuid){
            data.uuid = uuid
        }
        Object.assign(restaurant, data)
        if(!this.repository){
            return null
        }
        const exists = this.repository.find(x => x.uuid === restaurant.uuid)
        const structure = [`${ restaurant.name || exists?.name || " " }`, `${ restaurant?.opened_at?.join("-") || exists?.opened_at?.join("-") || " " }`, `\"${ restaurant.description || exists?.description || `Sem descrição` }\"`, `${ restaurant.image || exists?.image || `Sem imagem.` }`, `${ restaurant.location || exists?.location || `Sem localização.` }`, `${ uuid ? uuid : restaurant.uuid }`, `${ restaurant.rate || exists?.rate || "1.0" }`]
        let fileData: string | string[] = await this.loadFile()
        
        if(exists){
            const index = this.repository.indexOf(exists) + 2
            
            fileData = fileData.split("\r\n")
            const newStructure = [ ...structure ]
            newStructure[5] = exists.uuid
            fileData[index] = newStructure.join(",")
            fs.writeFileSync(`${ path.resolve(__dirname)}/../../../data/restaurants.csv`, fileData.join("\r\n"))
            return restaurant
        }
        
        fileData = fileData.split("\r\n")
        fileData.push(structure.join(","))
        fs.writeFileSync(`${ path.resolve(__dirname)}/../../../data/restaurants.csv`, fileData.join("\r\n"))
        return restaurant
    }

    async list(filters: I_FetchOptions): Promise<Restaurant[]> {
        await this.loadFile()
        return this.repository?.filter( x => {
            if(!filters){
                return true
            }
            
            const keys = Object.keys(filters)
            if(keys.length > 0){
                return keys.every(key => filters[key as keyof I_FetchOptions]?.normalize('NFD').replace(/[\u0300-\u036f]/g, "") === x[key as keyof I_FetchOptions]?.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
            }

            return true
        }) as Restaurant[]
    }

    async findOne(filters: I_FetchOptions): Promise<Restaurant | null> {
        this.loadFile()
        const search = this.repository?.find( x => {
            if(!filters){
                return true
            }
            
            const keys = Object.keys(filters)
            if(keys.length > 0){
                return keys.every(key => filters[key as keyof I_FetchOptions]?.normalize('NFD').replace(/[\u0300-\u036f]/g, "") === x[key as keyof I_FetchOptions]?.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
            }

            return true
        }) as Restaurant;

        return  search || null
    }

}

export { RestaurantsRepository }