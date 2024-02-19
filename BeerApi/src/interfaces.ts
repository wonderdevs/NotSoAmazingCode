
export interface urlParams {
    page?: number;
    per_page?: number;
    abv_gt?: number;
    abv_lt?: number;
    ibu_gt?: number;
    ibu_lt?: number;
    ebc_gt?: number;
    ebc_lt?: number;
    beer_name?: string;
    yeast?: string;
    brewed_before?: string; //mm-yyyy
    brewed_after?: string; //mm-yyyy
    hops?: string;
    malt?: string;
    food?: string;
    ids?: string;
}

export interface BeerType {
    id: number;
    name: string;
    tagline: string;
    first_brewed: string;
    description: string;
    image_url: string;
    abv: number;
    ibu: number;
    target_fg: number;
    target_og: number;
    ebc: number;
    srm: number;
    ph: number;
    attenuation_level: number;
    volume: {
      value: number;
      unit: string;
    },
    boil_volume: {
      value: number;
      unit: string;
    },
    method: {
      mash_temp: [
        {
          temp: {
            value: number;
            unit: string;
          },
          duration: number;
        }
      ],
      fermentation: {
        temp: {
          value: number;
          unit: string;
        }
      },
      twist: null
    },
    ingredients: {
      malt: [
        {
          name: string;
          amount: {
            value: number;
            unit: string;
          }
        }
      ],
      hops: [
        {
          name: string;
          amount: {
            value: number;
            unit: string;
           },
           add: string;
           attribute: string;
         }
      ],
      yeast: string;
    },
    food_pairing: string[];
    brewers_tips: string;
    contributed_by: string;
  }