import api from "../apiConfig";
import { getAuthHeaders } from "../helpers";
import { OrderDTO } from "@/types/order";
import { PaginationParams } from "@/types/pagination";

class OrderService {
  create(data: OrderDTO) {
    return api.post<OrderDTO>("/orders", data, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });
  }

  getAll() {
    return api.get("/orders", {
      headers: getAuthHeaders(),
    });
  }

  getByUserId(userId: string, params?: PaginationParams) {
    return api.get(`/orders/user/${userId}`, {
      headers: getAuthHeaders(),
      params,
    });
  }
}

const orderService = new OrderService();

export default orderService;
