import { SaleDetail } from "./sale-detail";

export interface Sale {
  saleId?: number,
  documentNumeber?: string,
  paymentType: string,
  creationDate?: string,
  total: string,
  saleDetails: SaleDetail[]
}
