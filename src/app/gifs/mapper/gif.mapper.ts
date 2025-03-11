// La idea de este "mapper" es que recibamos el objeto
// que viene de "giphy.com"
// o la API de Giphy
// y regresemos un objeto basado en nuestra interfaz.

import { Gif } from "../interfaces/gif.intefaces";
import { Datum } from "../interfaces/giphy.interfaces";

export class GifMapper {

    static mapGiphyItemToGif( item: Datum):Gif{
        return {
            id: item.id,
            title: item.title,
            url: item.images.original.url
        }
    };


    static mapGiphyItemsToGifArray( item:Datum[]):Gif[]{
        return item.map( this.mapGiphyItemToGif)
    }

}