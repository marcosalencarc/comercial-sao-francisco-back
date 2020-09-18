import DomainRequestDTO from "./DomainRequestDTO";

interface ProductRequestDTO{
    name: string
    description: string
    reference: string
    min_inventory: number
	  max_inventory: number
	  current_inventory : number
	  weight: number
	  markup: number
	  cost: number
	  wholesale: number
	  retail: number
	  commission: number
	  note:string
	  category:DomainRequestDTO
	  brand: DomainRequestDTO
	  provider_id: string
	  product_img: string
}

export default ProductRequestDTO;
