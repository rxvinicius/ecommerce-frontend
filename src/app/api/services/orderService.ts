import api from "../apiConfig";
import { getAuthHeaders } from "../helpers";
import { OrderDTO } from "@/types/order";

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

  getByUserId(userId: string) {
    return api.get(`/orders/user/${userId}`, {
      headers: getAuthHeaders(),
    });
  }
}

const orderService = new OrderService();

export default orderService;
