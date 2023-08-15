import http from "../http-common";
import IProductData from "../types/product.type"

class ProductDataService {
  getAll() {
    return http.get<Array<IProductData>>("/product");
  }

  get(id: string) {
    return http.get<IProductData>(`/product/${id}`);
  }

  create(data: IProductData) {
    return http.post<IProductData>("/product", data);
  }

  update(data: IProductData, id: any) {
    return http.put<any>(`/product/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/product/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/product`);
  }

  findByCtryNCat(ctry: string, cat: number) {
    let strCat = cat == -1 || cat == 0 ? "" : String(cat);
    return http.get<Array<IProductData>>(`/product?country=${ctry}&category=${strCat}`);
  }

  stats(ctry: string, cat: number) {
    let strCat = cat == -1 || cat == 0 ? "" : String(cat);
    return http.get<Array<IProductData>>(`/dashboard?country=${ctry}&category=${strCat}`);
  }
}

export default new ProductDataService();